import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromStore from '../../store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProService } from "@Project/store/service";
import { CommonService } from "../../../shared/common.service";
import { LocalstoreService } from "../../../shared/localstore.service";
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: "app-secure-set",
  templateUrl: "./secure-set.component.html",
  styleUrls: ["./secure-set.component.css"]
})
export class SecureSetComponent implements OnInit {

  proname;
  mobile;
  tablet;
  desktop;
  geoip;
  ipdup;
  multi;
  target_grp_id;
  global;
  project_id;
  action;
  flag = 0;
  project_status;
  lastAction = this.localStoreService.getLastAction('last-action');

  constructor(
    private httpservice: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cs: CommonService,
    private localStoreService: LocalstoreService
  ) { }

  ngOnInit() {
    this.desktop = true;
    this.tablet = true;
    this.mobile = true;
    let localStoreDetail = this.localStoreService.getLocal('project', 'detail');
    this.project_id = +localStoreDetail.id;
    this.project_status = localStoreDetail.status;
    this.proname = localStoreDetail.name;
    let localStoreTgDetail = this.localStoreService.getLocal('target-group', 'detail');
    if (localStoreTgDetail == undefined) {
      setTimeout(() => {
        this.toastr.error('Please create Target group');
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    let action = this.route.snapshot.queryParamMap.get('action');
    this.action = action;
    let localStoreTgSecSetting = this.localStoreService.getLocal('target-group', 'sec-setting');
    if (action == 'edit') {
      if (localStoreTgSecSetting != undefined) {
        this.tablet = localStoreTgSecSetting.is_tablet_accessible == 1 ? true : false;
        this.mobile = localStoreTgSecSetting.is_mobile_accessible == 1 ? true : false;
        this.desktop = localStoreTgSecSetting.is_desktop_accessible == 1 ? true : false;
        this.multi = localStoreTgSecSetting.is_multi_attempt_enabled == 1 ? true : false;
        this.geoip = localStoreTgSecSetting.is_geo_ip_enabled == 1 ? true : false;
        this.ipdup = localStoreTgSecSetting.is_ip_duplication_enabled == 1 ? true : false;
        this.global = localStoreTgSecSetting.is_global_supplier_allowed == 1 ? true : false;
      } else {
        this.getSecuritySetting();
      }
    } else {
      if (localStoreTgSecSetting != undefined) {
        this.tablet = localStoreTgSecSetting.is_tablet_accessible == 1 ? true : false;
        this.mobile = localStoreTgSecSetting.is_mobile_accessible == 1 ? true : false;
        this.desktop = localStoreTgSecSetting.is_desktop_accessible == 1 ? true : false;
        this.multi = localStoreTgSecSetting.is_multi_attempt_enabled == 1 ? true : false;
        this.geoip = localStoreTgSecSetting.is_geo_ip_enabled == 1 ? true : false;
        this.ipdup = localStoreTgSecSetting.is_ip_duplication_enabled == 1 ? true : false;
        this.global = localStoreTgSecSetting.is_global_supplier_allowed == 1 ? true : false;
      }
    }
  }

  getSecuritySetting() {
    const payload = {
      'target_group_id': this.target_grp_id
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.gettgsetting).subscribe(res => {
      let response = res;
      if (response.success) {
        this.tablet = response.data.is_tablet_accessible == 1 ? true : false;
        this.mobile = response.data.is_mobile_accessible == 1 ? true : false;
        this.desktop = response.data.is_desktop_accessible == 1 ? true : false;
        this.multi = response.data.is_multi_attempt_enabled == 1 ? true : false;
        this.geoip = response.data.is_geo_ip_enabled == 1 ? true : false;
        this.ipdup = response.data.is_ip_duplication_enabled == 1 ? true : false;
        this.global = response.data.is_global_supplier_allowed == 1 ? true : false;
        this.localStoreService.setLocal('target-group', 'sec-setting', response.data);
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    })
  }

  onSubmit(f, txtId, imgId) {
    if (f.value.geoip) {
      this.geoip = 1
    } else {
      this.geoip = 0
    }
    if (f.value.ipdup) {
      this.ipdup = 1
    } else {
      this.ipdup = 0
    }
    if (f.value.multi) {
      this.multi = 1
    } else {
      this.multi = 0
    }
    if (f.value.desktop) {
      this.desktop = 1
    } else {
      this.desktop = 0
    }
    if (f.value.tablet) {
      this.tablet = 1
    } else {
      this.tablet = 0
    }
    if (f.value.mobile) {
      this.mobile = 1
    } else {
      this.mobile = 0
    }
    if (f.value.global) {
      this.global = 1
    } else {
      this.global = 0
    }
    const payload = {
      "target_group_id": this.target_grp_id,
      "is_tablet_accessible": this.tablet,
      "is_mobile_accessible": this.mobile,
      "is_desktop_accessible": this.desktop,
      "is_multi_attempt_enabled": this.multi,
      "is_geo_ip_enabled": this.geoip,
      "is_ip_duplication_enabled": this.ipdup,
      "is_global_supplier_allowed": this.global
    }
    this.cs.hideshowImge(txtId, imgId, 'a');
    this.httpservice.postData(payload, requrls.updatetargetgrpsetting).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.router.navigate(['/project/target-groups/survey'], { queryParams: { action: this.action } });
        }, 1000);
        this.localStoreService.setLocal('target-group', 'sec-setting', payload);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(txtId, imgId, 'i');
    })
  }

  previous() {
    this.router.navigate(['/project/target-groups/quota'], { queryParams: { action: this.action } });
  }

}
