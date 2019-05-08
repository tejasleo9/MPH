import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import * as moment from 'moment';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../../store/requrl';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  payload = {};
  panelistName;
  created_at;
  sms = 'No';
  desktop = 'No';
  op = {};
  panelDetail;
  panelistDetail;
  panelistDetails = { 'health_meter_survey': '' };
  editbasic:any = {};
  panelId;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService
  ) { }

  ngOnInit() {
    var self = this;
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let pandetail = this.localStoreService.getLocal('panelist', 'id');
    if (pdetail != undefined || pdetail != null) {
      this.panelId = pdetail.id;
    }
    if (pandetail != undefined || pandetail != null) {
      this.panelistDetail = this.localStoreService.getLocal('panelist', 'id');
    }
    setTimeout(() => {
      this.editbasic['year_of_birth'] = this.cs.formatDate(new Date());
      $('#datetimepicker2').datetimepicker({
        format: 'DD-MM-YYYY',
        useCurrent: true,
        defaultDate: new Date(),
        maxDate: moment(),
        icons: {
          time: "fa fa-clock",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down",
          next: "fa fa-arrow-right",
          previous: "fa fa-arrow-left"
        },
      });
      $("#datetimepicker2").on("dp.change", function (e) {
        self.payload['to_date'] = e.date;
      });
    })
    this.getPanelistDetailFn();
  }

  getPanelistDetailFn() {
    this.spinnerService.show();
    this.payload['id'] = this.panelistDetail;
    this.httpservice.postData(this.payload, requrls.getpanelist).subscribe(res => {
      if (res.success) {
        let op = res.data;
        this.panelistDetails = op;
        this.created_at = op.created_at;
        if (op.survey_sms_enabled == 0) {
          this.sms = 'No';
        } else {
          this.sms = 'Yes';
        }
        if (op.desktop_notification == 0) {
          this.desktop = 'No';
        } else {
          this.desktop = 'Yes';
        }
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  editBasicInfo() {
    $("#basicInfoUpdate").modal("show");
    this.editbasic = {...this.panelistDetails};
  }

  validateFuncation(formVal, imgid, lodimgid){
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (formVal.form.valid) {
      this.onSubmit(formVal, imgid, lodimgid);
    } else {
      return;
    }
  }

  errors = [];

  onSubmit(formVal, imgid, lodimgid) {
    this.editbasic['panel_id'] = this.panelId;
    this.editbasic['id'] = this.panelistDetail;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(this.editbasic, requrls.updatepanelist).subscribe(res => {
      let response = res;
      if(response.success) {
        this.toastr.success(res.message);
        $("#basicInfoUpdate").modal("hide");
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    })
  }

}
