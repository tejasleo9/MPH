import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { CommonService } from '../../../../shared/common.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  ImportBatchDetails: any = [];
  panelId: any;
  impSearch: any = {};
  order: string = 'id';
  reverse: boolean = false;
  panelDetail;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined) {
      this.panelId = pdetail.id;
    }
    this.getImportBatchDetailsFn();
  }

  getImportBatchDetailsFn() {
    this.spinnerService.show();
    this.payload['panel_id'] = this.panelId;
    this.httpservice.postData(this.payload, requrls.getpanelistimportbatches).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.ImportBatchDetails = response;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  delete(obj, call) {
    this.payload = {};
    this.payload['panel_id'] = this.panelId;
    if (call == 'i') {
      this.payload['batch_id'] = obj.id;
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#confirmBox').modal('show');
        this.payload['batch_id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletecurrentbatch).subscribe(res => {
      let response = res;
      if (response.success) {
        this.ImportBatchDetails.forEach(ele1 => {
          if (ele1.id === this.payload['batch_id']) {
            let index = this.ImportBatchDetails.indexOf(ele1);
            this.ImportBatchDetails.splice(index, 1);
          }
        });
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  hideshowImge(stimg, imgid, call) {
    if (call == 'a') {
      document.getElementById(stimg).style.display = 'none';
      document.getElementById(imgid).style.display = 'inline-block';
    } else {
      document.getElementById(stimg).style.display = 'inline-block';
      document.getElementById(imgid).style.display = 'none';
    }
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

  refresh(id) {
    this.spinnerService.show();
    let payload = {};
    payload['panel_id'] = this.panelId
    payload['batch_id'] = id;
    this.httpservice.postData(payload, requrls.refreshbatch).subscribe(res => {
      if (res.success) {
        this.getImportBatchDetailsFn();
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  importDataFile(obj) {
    let payload = {
      'panel_id': this.panelId,
      'batch_id': obj.id,
      'upload_type': 2
    }
    this.httpservice.postData(payload, requrls.importbatches).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        this.refresh(obj.id);
      } else {
        this.toastr.error(response.message);
      }
    })
  }

  action(obj, call) {
    if (call == 'im') {
      this.importDataFile(obj);
      return;
    }
    let payload = {
      'panel_id': this.panelId,
      'batch_id': obj.id,
      'type': call == 'd' ? 0 : 1
    }
    this.httpservice.postData(payload, requrls.downloadbatch).subscribe(res => {
      if (res.success) {
        let response = res.data;
        if (response.length > 0 && res.is_downloadable) {
          var options = {
            headers: ["Panelist ID", "Code", "Email", "Phone", "Fax", "Fist Name", "Middle Name", "Last Name", "Email Secondary", "Phone Secondary", "Gender", "Postal Code", "DOB", "File Data Error", "Email Verification Status", "Email Error Panelist ID", "Phone Error Panelist ID"],
            nullToEmptyString: true,
          };
          new Angular5Csv(response, obj.panel_name + '_' + "report", options);
        }
        this.getImportBatchDetailsFn();
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }
}