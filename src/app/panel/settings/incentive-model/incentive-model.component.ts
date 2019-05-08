import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from 'app/shared/common.service';
import { Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-incentive-model',
  templateUrl: './incentive-model.component.html',
  styleUrls: ['./incentive-model.component.css']
})
export class IncentiveModelComponent implements OnInit {

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private httpservice: HttpService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    public cs: CommonService,
    private fb: FormBuilder
  ) { }

  panelId;
  incetives = [];
  is_disabled = false;

  getPanelIncetives(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.viewpanelincetive).subscribe(res => {
      let response = res;
      if (response.success) {
        this.incetives = response.data;
        this.incetives.forEach(res => {
          res['is_disabled'] = true;
        })
      }
    })
  }

  addIncentives() {
    let obj = {}
    obj = {
      'from': this.incetives.length == 0 ? 1 : +this.incetives[this.incetives.length - 1].to + 1,
      'to': '',
      'points': ''
    }
    if (this.incetives.length > 0) {
      let lastObj = this.incetives[this.incetives.length - 1];
      if (lastObj.to == "" || lastObj.to == null) {
        this.toastr.error("Please enter data");
        return;
      }
      if(lastObj.points == "" || lastObj.points == null) {
        this.toastr.error("Please enter points");
        return;
      }
      lastObj['is_disabled'] = true;
    }
    this.incetives.push(obj);
  }

  changeVal(obj, val) {
    if (+val >= obj.from) {
      obj.to = +val;
      this.is_disabled = false;
    } else {
      this.toastr.error('value should grater than or equal to ' + obj.from);
      this.is_disabled = true;
    }
  }

  pointsValidatin(obj, val) {
    if (+val > 0) {
      obj.points = +val
      this.is_disabled = false;
    } else {
      this.toastr.error('Points should grater than 0');
      this.is_disabled = true;
    }
  }

  remove(index) {
    this.incetives.splice(index, 1);
    this.is_disabled = false;
  }

  onSubmitClik(f, imgid, lodimgid) {
    let lastObj = this.incetives[this.incetives.length - 1];
    if (lastObj.to == "" || lastObj.to == null) {
      this.toastr.error("Please enter data");
      return;
    }
    if(lastObj.points == "" || lastObj.points == null) {
      this.toastr.error("Please enter points");
      return;
    }
    let payload = {
      'panel_id': this.panelId,
      'incentives': this.incetives.map(option => ({
        from: option.from,
        to: option.to,
        points: option.points
      }))
    }
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.editpanelincentives).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    })
  }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined) {
      this.panelId = pdetail.id
      this.getPanelIncetives(pdetail.id);
    }
  }

}
