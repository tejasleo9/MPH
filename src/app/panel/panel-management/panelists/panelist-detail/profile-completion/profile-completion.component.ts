import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalstoreService } from 'app/shared/localstore.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../../store/requrl';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})
export class ProfileCompletionComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  summaryData = false;
  popupMess: string = '';
  catgList = [];
  catgActive = 0;
  panelDetail;
  panelistDetail;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
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
    this.getProfileSummaryFn();
  }

  getProfileSummaryFn() {
    this.spinnerService.show();
    this.summaryData = false;
    this.payload['panelist_id'] = this.panelistDetail;
    this.httpservice.postData(this.payload, requrls.profilesummary).subscribe(res => {
      if (res.success) {
        let response = res.data.categories;
        this.catgList = response;
        this.catgList.map(res => {
          res['filterqes'] = res.questions
        });
      } else {
      }
      this.spinnerService.hide();
      this.summaryData = true;
    });
  }

  callFrom = "all";

  fliterCategory(call, obj) {
    let clone;
    clone = { ...obj };
    let index = this.catgList.indexOf(obj);
    let temparray;
    if (call == 'all') {
      obj['filterqes'] = obj.questions;
      this.catgList[index] = obj;
      this.callFrom = call;
      return;
    } else if (call === 'a') {
      this.callFrom = call;
      temparray = clone.questions.filter(element => {
        if (element.is_answered === true) {
          return element;
        }
      }).map(res => {
        return res;
      });
    } else {
      this.callFrom = call;
      temparray = clone.questions.filter(element => {
        if (element.is_answered === false) {
          return element;
        }
      }).map(res => {
        return res;
      });
    }
    obj['filterqes'] = temparray;
    this.catgList[index] = obj;
  }

  catgChange(x) {
    this.catgActive = x;
  }


}
