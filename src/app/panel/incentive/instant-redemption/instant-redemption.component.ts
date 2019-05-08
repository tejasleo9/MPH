import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-instant-redemption',
  templateUrl: './instant-redemption.component.html',
  styleUrls: ['./instant-redemption.component.css']
})
export class InstantRedemptionComponent implements OnInit {

  panelDetail;
  redeemlist = [];
  redeemFilter: any = {};

  order
  reverse: boolean = false;

  cPage;
  perpage;
  pageSize;
  total;
  path;


  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private orderPipe: OrderPipe,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.getInstantRedeemList();
  }

  getInstantRedeemList() {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    this.httpservice.postData(payload, requrls.instantrewardmethod).subscribe(res => {
      if (res.success == true) {
        let response = res.data.data;
        this.pageSize = res.data.per_page;
        this.cPage = res.data.current_page;
        this.total = res.data.total;
        this.path = res.data.path;
        this.perpage = res.data.per_page;
        this.redeemlist = response;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

  pageChanged(e) {
    const payload = {
      "page": +e,
      'per_page': +this.perpage,
      'panel_id': this.panelDetail['id']
    }
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.instantrewardmethod).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.redeemlist = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    const payload = {
      "per_page": +this.perpage,
      "page": this.cPage,
      'panel_id': this.panelDetail['id']
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.instantrewardmethod).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.redeemlist = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
  }


}
