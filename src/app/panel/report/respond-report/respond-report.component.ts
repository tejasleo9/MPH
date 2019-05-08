import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../project/store';
import { LocalstoreService } from '../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-respond-report',
  templateUrl: './respond-report.component.html',
  styleUrls: ['./respond-report.component.css']
})
export class RespondReportComponent implements OnInit {

  proStatusOptions = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Paused' },
    { value: '4', label: 'Closed' }
  ];
  statusOptions = []
  projects;
  panelDetail;
  downloadList = [];
  bsValue: number = Date.now();
  dateValue;
  bsConfig;
  newVar = new Date();
  recordText = 0;
  recordFound: boolean = false;
  downloadLink;
  reportfields = [];
  paneliststatus = [];
  errors = [];

  constructor(
    private store: Store<fromStore.ProjectsState>,
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.store.select(fromStore.getAllProjects).subscribe(state => {
      if (state.length != 0) {
        this.projects = state['data']['data'].map(option => ({
          value: option['id'],
          label: option['name']
        }));
      }
    });

    let payload = { 'panel_id': this.panelDetail['id'] };

    this.httpservice.getData(requrls.respondentreport).subscribe(res => {
      if (res.success == true) {
        let response = res.data;
        this.downloadList = response;
        this.downloadList = response.map(option => ({
          value: option,
          label: option.substring(option.lastIndexOf('/') + 1)
        }));
      } else {
      }
      this.spinnerService.hide();
    });
    this.httpservice.getData(requrls.respondentstatus).subscribe(res => {
      if (res.success == true) {
        let response = res.data;
        this.statusOptions = response.map(option => ({
          value: option['id'],
          label: option['status']
        }));;
      } else {
      }
      this.spinnerService.hide();
    });

  }

  selectFields(e) {
    if (e) {
      this.reportfields = this.proStatusOptions.map(option => (
        option['value']
      ));
    } else {
      this.reportfields = [];
    }
  }

  selectStatus(e) {
    if (e) {
      this.paneliststatus = this.statusOptions.map(option => (
        option['value']
      ));
    } else {
      this.paneliststatus = [];
    }
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    let dropChkArray = [];
    dropChkArray = [{
      value: formVal.value.projects,
      key: 'projectss'
    }, {
      value: formVal.value.respondent_status,
      key: 'respondent_statuss'
    }
    ];
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
      return false;
    } else {
      if (formVal.form.valid == true) {
        this.onFetchClick(formVal, imgid, lodimgid);
      }
    }
  }

  payload: any = {};

  onFetchClick(f, imgid, lodimgid) {
    this.payload = {
      "project_id": f.value.projects,
      "respondent_status": f.value.respondent_status
    }
    this.cs.showError(this.errors, 'i');
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.payload, requrls.responsecount).subscribe(res => {
      if (res.success) {
        this.recordText = res.data;
        this.recordFound = true;
        this.toastr.success(res.message);
      } else {
        this.recordFound = false;
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });

  }

  panelsList = [];

  reset() {
    this.paneliststatus = [];
    this.panelsList = [];
    this.recordFound = false;
    this.recordText = 0;
  }

  downloadReport(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.payload, requrls.getrespondentreport).subscribe(res => {
      console.log(res);
      if (res.success) {
        window.location.href = res.data;
        // this.downloadLink = res.data;
        // this.downloadList.push(
        //   {
        //     'value': this.downloadLink.substring(this.downloadLink.lastIndexOf('/') + 1),
        //     'label': this.downloadLink.substring(this.downloadLink.lastIndexOf('/') + 1)
        //   }
        // );
      } else {
        Object.keys(res.data).map(key => {
          this.toastr.error(res.data[key]);
        });
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

}
