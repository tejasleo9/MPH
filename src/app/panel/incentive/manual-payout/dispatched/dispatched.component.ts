import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-dispatched',
  templateUrl: './dispatched.component.html',
  styleUrls: ['./dispatched.component.css']
})
export class DispatchedComponent implements OnInit {

  panelDetail;
  redeemlist = [];
  ifError: boolean = false;
  redeemFilter: any = {};

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
    private router: Router,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.getRedeemProcessList(1, 20);
  }

  getRedeemProcessList(pno, per) {
    this.spinnerService.show();
    let payload = {};
    payload['panel_id'] = this.panelDetail['id'];
    payload['status'] = 1;
    payload['page'] = pno;
    payload['per_page'] = per;
    this.httpservice.postData(payload, requrls.listpaymentbatches).subscribe(res => {
      if (res.success == true) {
        let response = res.data.data;
        this.redeemlist = response;
        this.pageSize = res.data['per_page'];
        this.cPage = res.data['current_page'];
        this.total = res.data['total'];
        this.path = res.data['path'];
        this.perpage = res.data['per_page'];
        this.ifError = false;
      } else {
        this.ifError = true;
      }
      this.spinnerService.hide();
    });
  }

  downloadbatch(id) {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    payload['batch_id'] = id;
    this.httpservice.postData(payload, requrls.downloaddispatchbatch).subscribe(res => {
      if (res.success == true) {
        let response: string = res.data[0];
        window.location.href = response;
        this.ifError = false;
        this.toastr.success(res.message);
      } else {
        this.ifError = true;
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  pageChanged(e) {
    const payload = {
      "page": +e,
      'per_page': +this.perpage
    }
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listpaymentbatches).subscribe(res => {
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
      "page": this.cPage
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listpaymentbatches).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.redeemlist = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
  }


}


