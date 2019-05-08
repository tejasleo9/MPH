import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../../store/requrl';

@Component({
  selector: 'app-redemption-history',
  templateUrl: './redemption-history.component.html',
  styleUrls: ['./redemption-history.component.css']
})
export class RedemptionHistoryComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  getProjectHistoryLists = [];
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  panelDetail;
  panelistDetail;
  is_show = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let pandetail = this.localStoreService.getLocal('panelist', 'id');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    if (pandetail != undefined || pandetail != null) {
      this.panelistDetail = this.localStoreService.getLocal('panelist', 'id');
    }
    this.getRedemptionRequestsListfn();
    setTimeout(() => {
      this.is_show = true;
    });
  }

  getRedemptionRequestsListfn() {
    this.spinnerService.show();
    this.payload['panel_id'] = this.panelDetail['id'];
    this.payload['panelist_id'] = this.panelistDetail;
    this.httpservice.postData(this.payload, requrls.redemptionhistory).subscribe(res => {
      if (res.success) {
        let response = res.data.data;
        if (response != undefined) {
          this.pageSize = res.data.per_page;
          this.cPage = res.data.current_page;
          this.total = res.data.total;
          this.perpage = res.data.per_page;
          this.getProjectHistoryLists = response;
        } else {
          this.getProjectHistoryLists = [];
        }
      } else {
        this.getProjectHistoryLists = [];
      }
      this.spinnerService.hide();
    });
  }

  pageChanged(e) {
    this.payload["page"] = +e;
    this.payload["per_page"] = this.perpage
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.redemptionhistory).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getProjectHistoryLists = responce.data.data;
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
    this.httpservice.postData(this.payload, requrls.redemptionhistory).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getProjectHistoryLists = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    })
  }


}
