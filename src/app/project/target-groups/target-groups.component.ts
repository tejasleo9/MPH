import { ProService } from "./../store/service";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import * as fromStore from "../store";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import { LocalstoreService } from "../../shared/localstore.service";
declare var $: any;
import { OrderPipe } from "ngx-order-pipe";
import { CommonService } from "../../shared/common.service";
import * as requrls from '../store/requrl';
import { HttpService } from "app/store/http/http.service"

@Component({
  selector: "app-target-groups",
  templateUrl: "./target-groups.component.html",
  styleUrls: ["./target-groups.component.css"]
})
export class TargetGroupsComponent implements OnInit {

  proname: any;
  tgroups: any = [];
  project_id: any;
  selectedDatas = [];
  order = "";
  trgFilter: any = {};
  errorMessage: string = "";
  successMessage: string = "";
  ifError: boolean = false;
  ifSucc: boolean = false;
  payload = {};
  popupMess: string = "";
  name = "";
  country_name = "";
  disablelink = true;
  project_status;
  lastAction = this.localStoreService.getLastAction("last-action");
  isShow = false;

  constructor(
    private httpservice: HttpService,
    private router: Router,
    public route: ActivatedRoute,
    private orderPipe: OrderPipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService
  ) { }

  ngOnInit() {
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    this.project_status = localStoreDetail.status;
    let project_id = localStoreDetail.id;
    let project_name = localStoreDetail.name;

    this.project_id = project_id;
    this.proname = project_name;
    this.getTargetGrp(this.project_id);
    setTimeout(() => {
      this.isShow = true;
    }, 2000);
  }

  getTargetGrp(id) {
    const payload = { project_id: id };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listtrggrp).subscribe(res => {
      let response = res;
      if (response.status_code == 2316) {
        this.tgroups = response.data;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  selectAll(status) {
    this.selectedDatas = this.tgroups.map(res => res.id);
    if (status) {
      this.selectedDatas.forEach(element =>
        $("#chk" + element).prop("checked", true)
      );
    } else {
      this.selectedDatas.forEach(element =>
        $("#chk" + element).prop("checked", false)
      );
      this.selectedDatas = [];
    }
    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj.id) != -1) {
      } else {
        this.selectedDatas.push(obj.id);
        this.ifError = false;
      }
    } else {
      let index = this.selectedDatas.indexOf(obj.id);
      this.selectedDatas.splice(index, 1);
    }
    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  editGroup(id, name) {
    let obj = {
      id: id,
      name: name
    };
    this.localStoreService.removeLocal("target-group");
    this.localStoreService.removeLocal("regions");
    this.localStoreService.removeLocal("project-exclusion");
    this.localStoreService.removeLocal("changed");
    this.localStoreService.setLocal("target-group", "detail", obj);
    this.router.navigate(["/project/target-groups/overview"], {
      queryParams: { action: "edit" }
    });
  }

  addNew() {
    let action = this.route.snapshot.queryParamMap.get("action");
    this.localStoreService.setLocal("new-target-group", "target-grp-count", this.tgroups.length);
    this.localStoreService.removeLocal("target-group");
    this.localStoreService.removeLocal("regions");
    this.localStoreService.removeLocal("project-exclusion");
    this.localStoreService.removeLocal("changed");
    this.localStoreService.lastAction("last-action", action);
    this.router.navigate(["/project/target-groups/overview"], {
      queryParams: { action: "new" }
    });
  }

  changeStatus(pObj, stat, call, imgid, lodimgid) {
    const payload = { status: stat };
    if (call == "i") {
      payload["id"] = [pObj.id];
    } else {
      if (this.selectedDatas.length != 0) {
        payload["id"] = this.selectedDatas;
        this.disablelink = false;
      } else {
        this.disablelink = true;
        return;
      }
    }
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.changetargetgrpstatus).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        this.tgroups.map(ele1 => {
          payload["id"].forEach(ele2 => {
            if (ele1.id == ele2) {
              ele1.status = +stat;
            }
          });
        });
        this.localStoreService.setLocal("target-group", "list", this.tgroups);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
      document.getElementById('headname').click();
    });
  }

  delete(obj, call) {
    this.payload = {};
    if (call == "i") {
      this.payload["id"] = [obj.id];
      $("#confirmBox").modal("show");
    } else {
      if (this.selectedDatas.length != 0) {
        $("#confirmBox").modal("show");
        this.payload["id"] = this.selectedDatas;
        this.disablelink = false;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = "Are you sure want to delete.?";
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.payload, requrls.deletetargetgrp).subscribe(res => {
      let response = res;
      if (response.status_code == 2084) {
        this.payload["id"].forEach(ele2 => {
          this.tgroups.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.tgroups.indexOf(ele1);
              this.tgroups.splice(index, 1);
            }
          });
        });
        if (this.selectedDatas.length > 0) {
          this.selectedDatas = [];
        }
        this.disablelink = true;
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $("#confirmBox").modal("hide");
      document.getElementById('headname').click();
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  redirect(call) {
    if (call == "ov") {
      this.router.navigate(["project/overview"], {
        queryParams: { action: this.lastAction }
      });
    } else if (call == "sch" && this.project_id != null) {
      this.router.navigate(["project/scheduling"], {
        queryParams: { action: this.lastAction }
      });
    } else {
      return;
    }
  }

  sortData(sort) {
    if (this.order == sort) {
      this.order = sort + ": reverse";
    } else {
      this.order = sort;
    }
    this.orderPipe.transform(this.tgroups, this.order);
  }

  addnew() {
    this.router.navigateByUrl("/project/target-groups/overview");
  }

  search(f, txtId, lodimgid) {
    let payload = {
      name: f.value.name == "" ? undefined : f.value.name,
      country: f.value.country == "" ? undefined : f.value.country,
      project_id: this.project_id
    };
    this.name = f.value.name;
    this.country_name = f.value.country;
    if (f.value.name == "" && f.value.country == "") {
      this.getTargetGrp(this.project_id);
    } else {
      this.cs.hideshowImge(txtId, lodimgid, "a");
      this.httpservice.postData(payload, requrls.listtrggrp).subscribe(res => {
        this.cs.hideshowImge(txtId, lodimgid, "i");
        if (res.success) {
          this.tgroups = res.data;
        } else {
          this.tgroups = [];
        }
        document.getElementById("headname").click();
      });
    }
  }

  reset() {
    this.name = null;
    this.country_name = null;
    this.getTargetGrp(this.project_id);
    document.getElementById("headname").click();
    this.selectedDatas = [];
  }
}
