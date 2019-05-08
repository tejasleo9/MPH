import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/shared/common.service';
declare var $: any;
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-redemption-processing',
  templateUrl: './redemption-processing.component.html',
  styleUrls: ['./redemption-processing.component.css']
})
export class RedemptionProcessingComponent implements OnInit {

  panelDetail;
  redeemlist = [];
  redeemFilter: any = {};
  cancelPayload = {};
  popupMess = "Please let us know the reason to cancel."
  downloadredeemfile;
  input_file = new FormData();
  fileName = 'No file choosen';
  errmessage;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    public cs: CommonService,
    private orderPipe: OrderPipe,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.getRedeemProcessList();
  }

  getRedeemProcessList() {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    this.redeemlist = [];
    this.httpservice.postData(payload, requrls.listpaymentbatches).subscribe(res => {
      if (res.success == true) {
        let response = res.data;
        this.redeemlist = response;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  downloadbatch(id) {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    payload['batch_id'] = id;
    this.httpservice.postData(payload, requrls.downloadredeempointsbatch).subscribe(res => {
      if (res.success == true) {
        let response: string = res.data[0];
        window.location.href = response;
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  cancelbatch(id) {
    let payload = { 'panel_id': '' };
    this.cancelPayload['panel_id'] = this.panelDetail['id'];
    this.cancelPayload['redeem_points_batch_id'] = id;
    $('#confirmBox').modal('show');
  }

  cancelBatchConfirm(reason, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.cancelPayload['message'] = reason;
    this.httpservice.postData(this.cancelPayload, requrls.cancelredeemprecess).subscribe(res => {
      if (res.success == true) {
        this.getRedeemProcessList();
        this.toastr.success(res.message);
        $('#confirmBox').modal('hide');
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  dispatchbatch(id) {
    let payload = {
      'panel_id': this.panelDetail['id'],
      'batch_id': id
    }
    this.input_file.set('batch_id', id);
    this.httpservice.postData(payload, requrls.redeembatchfile).subscribe(res => {
      if (res.success == true) {
        let response: string = res.data[0];
        this.downloadredeemfile = response;
        $('#downloadBox').modal('show');
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  getCsvFile(event) {
    this.input_file.set('file', event.target.files[0], event.target.files[0].name);
    this.fileName = event.target.files[0].name;
  }

  uploadBatchConfirm(imgid, lodimgid) {
    let payload = new FormData();
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.input_file, requrls.uploadrewardcodes).subscribe(res => {
      if (res.success == true) {
        this.getRedeemProcessList();
        this.toastr.success(res.message);
        $('#downloadBox').modal('hide');
      } else {
        this.errmessage = res.message;
        // this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  order: string = '';
  reverse: boolean = false;

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
    this.orderPipe.transform(this.redeemlist, this.order);
  }

}
