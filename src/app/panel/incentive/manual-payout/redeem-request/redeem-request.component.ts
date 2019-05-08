import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/common.service';
import { LocalstoreService } from '../../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-redeem-request',
  templateUrl: './redeem-request.component.html',
  styleUrls: ['./redeem-request.component.css']
})
export class RedeemRequestComponent implements OnInit {

  panelDetail;
  redeemlist;
  ifError: boolean = false;
  redeemFilter: any = {};
  cancelPayload = {};
  popupMess = "Please let us know the reason to cancel.";

  order: string = '';
  reverse: boolean = false;

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
    this.getRedeemRequestList();
  }

  getRedeemRequestList() {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    payload['payout_type'] = 0;
    this.httpservice.postData(payload, requrls.pendingredeemedreq).subscribe(res => {
      this.redeemlist = [];
      if (res.success == true) {
        let response = res.data;
        this.redeemlist = response;
        this.ifError = false;
      } else {
        this.ifError = true;
      }
      this.spinnerService.hide();
    });
  }

  createbatch(id) {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    payload['payment_method_id'] = id;
    this.httpservice.postData(payload, requrls.createredeemedbatch).subscribe(res => {
      if (res.success == true) {
        this.getRedeemRequestList();
        this.ifError = false;
        this.toastr.success(res.message);
      } else {
        this.ifError = true;
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  cancelbatch(id) {
    this.cancelPayload['panel_id'] = this.panelDetail['id'];
    this.cancelPayload['payment_method_id'] = id;
    $('#confirmBox').modal('show');
  }

  cancelBatchConfirm(reason, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.cancelPayload['message'] = reason;
    this.httpservice.postData(this.cancelPayload, requrls.cancelredmeedpoints).subscribe(res => {
      if (res.success == true) {
        this.getRedeemRequestList();
        this.ifError = false;
        this.toastr.success(res.message);
        $('#confirmBox').modal('hide');
      } else {
        this.ifError = true;
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
    this.orderPipe.transform(this.redeemlist, this.order);
  }

}
