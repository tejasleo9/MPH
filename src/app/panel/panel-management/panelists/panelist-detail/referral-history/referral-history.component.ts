import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../../store/requrl';

@Component({
  selector: 'app-referral-history',
  templateUrl: './referral-history.component.html',
  styleUrls: ['./referral-history.component.css']
})
export class ReferralHistoryComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  referralHistoryList = [];
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  panelDetail;
  panelistDetail;
  ifError:boolean = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let pandetail = this.localStoreService.getLocal('panelist', 'id');
    if(pdetail != undefined || pdetail != null){
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    } 
    if(pandetail != undefined || pandetail != null){
      this.panelistDetail = this.localStoreService.getLocal('panelist', 'id');
    } 
    this.getReferralHistoryListFn();
  }

  getReferralHistoryListFn() {
    this.spinnerService.show();
    this.payload['panel_id'] = this.panelDetail['id'];
    this.payload['panelist_id'] = this.panelistDetail;
    this.httpservice.postData(this.payload, requrls.panelistrefrrel).subscribe(res => {
      if (res.success) {
        let response = res.data;
        if(response.length === 0){
          this.referralHistoryList = response;
        }else{
          this.referralHistoryList = response.data;
        }
      } else {
      }
      setTimeout(() => {
        this.ifError = true;
      }, 2000)
      this.spinnerService.hide();
    });
  }

  pageChanged(e) {
    this.payload["page"] = +e;
    this.payload["per_page"] = this.perpage
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.panelistrefrrel).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.referralHistoryList = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    })
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.panelistrefrrel).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.referralHistoryList = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    })
  }
}
