import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as panelStore from '../../../panel/store';
import { LocalstoreService } from '../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-info-report',
  templateUrl: './info-report.component.html',
  styleUrls: ['./info-report.component.css']
})
export class InfoReportComponent implements OnInit {

  fieldOptions = [
    { value: 'code', label: 'Code' },
    { value: 'id', label: 'ID' },
    { value: 'status', label: 'Status' },
    { value: 'created_at', label: 'Created at' },
    { value: 'first_name', label: 'First name' },
    { value: 'last_name', label: 'Last name' },
    { value: 'gender', label: 'Gender' },
    { value: 'year_of_birth', label: 'Birth Year' },
    { value: 'postalcode', label: 'Postal code' },
    { value: 'city', label: 'City' },
    { value: 'registered_from_ip', label: 'Registered from IP' },
    { value: 'reg_source', label: 'Reg source' },
    { value: 'reg_medium', label: 'Reg medium' },
    { value: 'camp_name', label: 'Camp name' },
    { value: 'ranking', label: 'Ranking' },
    { value: 'profile_depth', label: 'Profile depth' },
    { value: 'app_usage', label: 'App usage' },
    { value: 'total_points_earned', label: 'Total points earned' },
    { value: 'available_points', label: 'Available points' },
    { value: 'successful_referrals', label: 'Successful referrals' },
    { value: 'updated_at', label: 'Updated at' },
    { value: 'survey_invite_index', label: 'Survey invite index' },
    { value: 'survey_response_index', label: 'Survey response index' },
    { value: 'routed_surveys', label: 'Routed surveys' },
    { value: 'last_survey_responded_at', label: 'Last survey responded at' },
    { value: 'reason_unsubscribe', label: 'Reason unsubscribe' },
  ];
  statusOptions = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Bad Email' },
    { value: '3', label: 'Deleted' },
    { value: '4', label: 'Not Validated' },
    { value: '5', label: 'Sleeping' },
    { value: '6', label: 'Banned' },
    { value: '7', label: 'Unsubscribed' },
    { value: '8', label: 'Spam' },
  ]
  panelList;
  panelDetail;
  downloadList = [];
  ifError: boolean = false;
  bsValue: number = Date.now();
  dateValue;
  bsConfig;
  newVar = new Date();
  recordText: string = '';
  recordFound: boolean = false;
  downloadLink;
  reportfields = [];
  paneliststatus = [];

  constructor(
    private panelstore: Store<panelStore.PanelsState>,
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService, ) {
  }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.panelstore.select(panelStore.getAllPanels).subscribe(state => {
      this.panelList = state.map(option => ({
        value: option['id'],
        label: option['name']
      }));
    });
    let payload = { 'panel_id': this.panelDetail['id'] };
    this.httpservice.postData(payload, requrls.panelinforeportlist).subscribe(res => {
      if (res.success) {
        let response = res.data[0];
        // this.downloadList = response;
        this.downloadList = response.map(option => ({
          value: option,
          label: option.substring(option.lastIndexOf('/') + 1)
        }));
      } else {
      }
      this.spinnerService.hide();
    });

  }
  // Init End

  selectFields(e) {
    if (e) {
      this.reportfields = this.fieldOptions.map(option => (
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

  onSubmitClik(formVal, imgid, lodimgid, call) {
    let dropChkArray = [];
    dropChkArray = [{
      value: formVal.value.panel_id,
      key: 'panel_idd'
    }, {
      value: formVal.value.report_fields,
      key: 'report_fieldss'
    }, {
      value: formVal.value.start_date,
      key: 'start_datee'
    }, {
      value: formVal.value.status,
      key: 'status'
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
        this.onFetchClick(formVal, imgid, lodimgid, call);
      }
    }
  }
  errors = [];
  onFetchClick(f, imgid, lodimgid, call) {
    let payload = {
      "panel_id": f.value.panel_id,
      "report_fields": f.value.report_fields,
      "start_date": this.cs.formatDate(f.value.start_date[0]),
      "end_date": this.cs.formatDate(f.value.start_date[1]),
      "status": f.value.status
    };
    if (call === 'f') {
      this.cs.showError(this.errors, 'i');
      this.cs.hideshowImge(imgid, lodimgid, "a");
      this.httpservice.postData(payload, requrls.panelinforeportcount).subscribe(res => {
        if (res.success) {
          this.recordText = res.data[0];
          if (res.data.length > 0) {
            this.recordFound = true;
            this.toastr.success(res.message);
          } else {
            this.recordFound = false;
            this.toastr.error(res.message);
          }
        } else {
          this.recordFound = false;
          if (res.data !== {} && Object.values(res.data).length > 0) {
            this.errors = res.data;
            this.cs.showError(this.errors, 'a');
          } else {
            this.toastr.error(res.message);
          }
        }
        this.cs.hideshowImge(imgid, lodimgid, "i");
      });
    } else {
      this.downloadReport(imgid, lodimgid, payload);
    }
  }

  panelsList;

  reset() {
    this.paneliststatus = [];
    this.recordFound = false;
    this.panelsList = [];
    this.reportfields = [];
    this.dateValue = null;
  }

  downloadReport(imgid, lodimgid, payload) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.downloadpanelinfo).subscribe(res => {
      console.log(res);
      if (res.success) {
        // if (res.is_downloadable) {
          window.location.href = res.data[0];
          // this.downloadLink = res.data[0];
          // this.downloadList.push(this.downloadLink.substring(this.downloadLink.lastIndexOf('/') + 1));
        // }
      } else {
        Object.keys(res.data).map(key => {
          this.toastr.error(res.data[key]);
        });
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }


}
