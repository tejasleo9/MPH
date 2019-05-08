import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalstoreService } from "app/shared/localstore.service";
import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { CommonService } from "app/shared/common.service";
import { HttpService } from "app/store/http/http.service";
import * as requrls from "./../../../store/requrl";

@Component({
  selector: "app-add-new-compaign",
  templateUrl: "./add-new-compaign.component.html",
  styleUrls: ["./add-new-compaign.component.css"]
})
export class AddNewCompaignComponent implements OnInit {
  trcType = [];
  trcMethod = [];
  isShow: boolean;
  affiliateLists = [];
  comStatus = [];
  panelId;
  comObj: any = {};
  tracking_type;
  textMeg = "";
  errors = [];

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    public cs: CommonService,
    private route: ActivatedRoute
  ) {}

  affiliateListFn() {
    let payload = {
      panel_id: this.panelId
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.affiliatelist).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.affiliateLists = response;
        this.affiliateLists = response.map(option => ({
          value: option.id,
          label: option.name
        }));
        let comdetails = this.localStoreService.getLocal(
          "panel",
          "compaign-details"
        );
        if (comdetails != undefined) {
          this.viewAffiliateFn(comdetails.id);
        }
      } else {
      }
      this.spinnerService.hide();
    });
  }

  validateFun(formVal, imgid, lodimgid) {
    let dropChkArray = [];
    dropChkArray = [
      {
        value: formVal.value.affiliate_id,
        key: "affiliate_idd"
      },
      {
        value: formVal.value.status,
        key: "statuss"
      }
    ];
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      if (formVal.form.valid == true) {
        this.onSubmit(formVal, imgid, lodimgid);
      }
    }
  }

  onSubmit(f, imgid, lodimgid) {
    f.value["panel_id"] = this.panelId;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    let action = this.route.snapshot.queryParamMap.get("action");
    let comdetails = this.localStoreService.getLocal(
      "panel",
      "compaign-details"
    );
    let callTo;
    if (action == "edit") {
      if (comdetails != undefined) {
        f.value["id"] = comdetails.id;
        f.value["tracking_code"] = this.comObj.tracking_code;
        if (this.comObj.tracking_type == null) {
          delete f.value.tracking_type;
        }
        callTo = this.httpservice.postData(f.value, requrls.editcompaign);
      }
    } else {
      f.value.tracking_type == "0"
        ? delete f.value.tracking_type
        : f.value.tracking_type;
      callTo = this.httpservice.postData(f.value, requrls.createcompaign);
    }
    callTo.subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.toastr.success(res.message);
        setTimeout(() => {
          this.router.navigate(["/panel/recruitment/compaingn"]);
        }, 500);
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, "a");
        } else {
          this.toastr.error(res.message);
        }
        this.cs.hideshowImge(imgid, lodimgid, "i");
      }
    });
  }

  viewAffiliateFn(id) {
    this.spinnerService.show();
    let payload = {
      id: id
    };
    this.httpservice.postData(payload, requrls.viewcompaign).subscribe(res => {
      if (res.success) {
        let response = res.data;
        response.tracking_type = "" + response.tracking_type;
        response.status = "" + response.status;
        response.affiliate_id = [response.affiliate_id];
        if (response.params == "") {
          response["tracking_method"] = "1";
        } else {
          response["tracking_method"] = "2";
        }
        this.comObj = response;
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  ngOnInit() {
    this.trcType = [
      {
        value: null,
        label: "Select Type"
      },
      {
        value: "1",
        label: "Pixel"
      },
      {
        value: "2",
        label: "Postback-GET"
      },
      {
        value: "3",
        label: "Postback-Post"
      },
      {
        value: "4",
        label: "Redirect"
      }
    ];
    this.comObj.tracking_type = null;
    this.trcMethod = [
      {
        value: "1",
        label: "GET"
      },
      {
        value: "2",
        label: "POST"
      }
    ];

    this.comStatus = [
      {
        value: "0",
        label: "Draft"
      },
      {
        value: "1",
        label: "Active"
      },
      {
        value: "2",
        label: "Paused"
      },
      {
        value: "3",
        label: "Closed"
      }
    ];
    let paneldetails = this.localStoreService.getLocal("panel", "detail");
    let comdetails = this.localStoreService.getLocal(
      "panel",
      "compaign-details"
    );
    if (comdetails != undefined) {
      this.isShow = true;
      this.textMeg = "Edit";
      // this.viewAffiliateFn(comdetails.id);
    } else {
      this.textMeg = "New";
      this.isShow = false;
    }
    if (paneldetails != undefined) {
      this.panelId = paneldetails.id;
    }
    this.affiliateListFn();
  }
}
