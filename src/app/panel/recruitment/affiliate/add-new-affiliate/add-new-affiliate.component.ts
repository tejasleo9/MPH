import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/shared/common.service';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-add-new-affiliate',
  templateUrl: './add-new-affiliate.component.html',
  styleUrls: ['./add-new-affiliate.component.css']
})
export class AddNewAffiliateComponent implements OnInit {

  panelId;
  affiliateId;
  affiliateEdit;
  name;
  tracking_code;
  tracking_type;
  trackingMethod;
  params;
  pixelCode;
  payload = {};
  affObj: any = {};
  isShow;
  textMeg = '';

  trackingTypeOptions = [
    { label: 'Pixel', value: '1' },
    { label: 'Postback - GET', value: '2' },
    { label: 'Postback - Post', value: '3' },
    { label: 'Redirect', value: '4' },
  ];
  trackingMethodOptions = [
    { label: 'GET', value: '1' },
    { label: 'POST', value: '2' },
  ];

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private cs: CommonService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    let affdetails = this.localStoreService.getLocal('panel', 'affi-detail');
    let paneldetails = this.localStoreService.getLocal('panel', 'detail');
    if (affdetails != undefined) {
      this.isShow = true;
      this.textMeg = 'Edit';
      this.viewAffiliateFn(affdetails.id);
    } else {
      this.isShow = false;
      this.textMeg = 'New';
    }
    if (paneldetails != undefined) {
      this.panelId = paneldetails.id;
    }
  }

  validateFun(formVal, imgid, lodimgid) {
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (formVal.form.valid == true) {
      this.onSubmit(formVal, imgid, lodimgid);
    }
  }

  errors = [];

  onSubmit(f, imgid, lodimgid) {
    f.value['panel_id'] = this.panelId;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    let action = this.route.snapshot.queryParamMap.get("action");
    let affdetails = this.localStoreService.getLocal('panel', 'affi-detail');
    let callTo;
    let status_code;
    f.value.tracking_type = +f.value.tracking_type;
    if (action == 'edit') {
      if (affdetails != undefined) {
        f.value['id'] = affdetails.id;
        callTo = this.httpservice.postData(f.value, requrls.editaffiliate);
        status_code = 200;
      }
    } else {
      callTo = this.httpservice.postData(f.value, requrls.addaffiliate);
      status_code = 1296;
    }
    this.cs.showError(this.errors, 'i');
    this.cs.hideshowImge(imgid, lodimgid, "a");
    callTo.subscribe(res => {
      if (res.status_code == status_code) {
        this.toastr.success(res.message);
        this.router.navigate(['/panel/recruitment/affiliate']);
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  viewAffiliateFn(id) {
    this.spinnerService.show();
    let payload = {
      'id': id
    }
    this.httpservice.postData(payload, requrls.viewaffiliate).subscribe(res => {
      if (res.success) {
        let response = res.data;
        response.tracking_type = '' + response.tracking_type;
        this.affObj = response;
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }
}