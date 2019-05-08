import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { OrderPipe } from "ngx-order-pipe";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { CommonService } from "../../../shared/common.service";
import { ToastrService } from "ngx-toastr";
import { LocalstoreService } from "../../../shared/localstore.service";
declare var $: any;
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: "app-extsupply",
  templateUrl: "./extsupply.component.html",
  styleUrls: ["./extsupply.component.css"]
})
export class ExtsupplyComponent implements OnInit {
  proname;
  externalSuppliers = [];
  target_grp_id;
  project_id;
  selectedDatas = [];
  errorMessage: string = "";
  successMessage: string = "";
  ifError: boolean = false;
  ifSucc: boolean = false;
  payload = {};
  popupMess: string = "";
  supplier: any = {};
  ttypes = [];
  tmethods = [];
  quotas;
  action;
  lastAction = this.localStoreService.getLastAction("last-action");
  projectState$;
  project_status;

  constructor(
    private httpservice: HttpService,
    private router: Router,
    private store: Store<fromStore.ProjectsState>,
    private orderPipe: OrderPipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    private cs: CommonService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
  ) {
  }

  getExternalSupplier() {
    const payload = { target_group_id: this.target_grp_id };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listexternallist).subscribe(res => {
      let response = res;
      if (response.success) {
        this.externalSuppliers = response.data;
      }
      this.spinnerService.hide();
    })
  }

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj.id) != -1) {
      } else {
        this.ifError = false;
        this.selectedDatas.push(obj.id);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj.id);
      this.selectedDatas.splice(index, 1);
    }
  }

  id;

  editProject(obj) {
    let payload = {
      id: obj.id
    };
    this.httpservice.postData(payload, requrls.viewexternalsupplier).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.quotas = response.data.quotas;
        response.data.tracking_method = '' + response.data.tracking_method;
        response.data.tracking_type = '' + response.data.tracking_type;
        this.id = response.data.id;
        this.supplier = response.data;
        $("#exampleModal").modal("show");
      } else {
        this.toastr.error(response.message);
      }
    });
    this.cs.showError(this.errors, 'i');
  }

  changeStatus(obj, stat, call, imgid, lodimgid) {
    if (obj != null) {
      if (obj.status == 1 && stat == 1) {
        this.toastr.error("External supplier is already Active");
        return;
      } else if (obj.status == 2 && stat == 2) {
        this.toastr.error("External supplier is already Pause");
        return;
      } else if (obj.status == 4 && stat == 4) {
        this.toastr.error("External supplier is already Close");
        return;
      }
    }
    const payload = { status: stat };
    if (call == "i") {
      payload["id"] = [obj.id];
    } else {
      if (this.selectedDatas.length != 0) {
        payload["id"] = this.selectedDatas;
      } else {
        this.toastr.error("Please Select Data..!");
        return;
      }
    }
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.changeexternalsupplierstatus).subscribe(res => {
        let response = res;
        if (response.status_code == 200) {
          this.externalSuppliers.map(ele1 => {
            payload["id"].forEach(ele2 => {
              if (ele1.id == ele2) {
                ele1.status = +stat;
              }
            });
          });
        } else {
          this.toastr.error(response.message);
        }
        this.cs.hideshowImge(imgid, lodimgid, "i");
      });
  }

  delete(id, call) {
    this.payload = {};
    if (call == "i") {
      this.payload["id"] = [id];
      $("#confirmBox").modal("show");
    } else {
      if (this.selectedDatas.length != 0) {
        $("#confirmBox").modal("show");
        this.payload["id"] = this.selectedDatas;
      } else {
        this.toastr.error("Please Select Project..!");
      }
    }
    this.popupMess = "Are you sure want to delete.?";
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.store.select(fromStore.DeletePro).subscribe(state => {
      if (typeof state == "string") {
      } else {
        if (state["success"] == false) {
          this.toastr.error(state["message"]);
        } else if (state["success"] == true) {
          this.toastr.success(state["message"]);
        }
      }
    });
    this.store.select(fromStore.DeleteProLoaded).subscribe(state => {
      if (state) {
        this.cs.hideshowImge(imgid, lodimgid, "i");
        $("#confirmBox").modal("hide");
      }
    });
  }

  previous() {
    this.router.navigate(["/project/target-groups/schedule"], {
      queryParams: { action: this.action }
    });
  }

  next() {
    this.router.navigate(["/project/target-groups"]);
  }

  is_disabled = false;

  changeReq(data, value, call) {
    if (value != null) {
      data.req = value;
      if (+value > (data.required_completes - data.current_completes)) {
        this.toastr.error("Please Enter Valid Data");
        this.is_disabled = true;
      } else {
        data["req"] = value;
        this.is_disabled = false;
      }
    }
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    if (this.supplier.name == null || this.supplier.name == "") {
      return;
    } else {
      this.onSubmitEditSupplier(formVal.value, imgid, lodimgid);
    }
  }

  errors = [];

  onSubmitEditSupplier(value, imgid, lodimgid) {
    let payload = {
      id: "" + this.id,
      name: this.supplier.name,
      quotas: this.quotas.map(option => ({
        id: option.target_group_quota_id,
        required_completes:
          option.req == undefined ? option.required_completes : option.req
      })),
      complete_url: this.supplier.complete_url,
      quotafull_url: this.supplier.quotafull_url,
      screenout_url: this.supplier.screenout_url,
      tracking_type: this.supplier.tracking_type[0],
      parameters: this.supplier.url_params
    };
    if (this.supplier.tracking_method == 'null') {
      delete this.supplier.tracking_method;
    } else {
      if (this.supplier.tracking_method != undefined) {
        payload["tracking_method"] = this.supplier.tracking_method[0];
      }
    }
    console.log(this.supplier);
    if (
      this.supplier.tracking_url != null ||
      this.supplier.tracking_url != undefined
    ) {
      payload["tracking_url"] = this.supplier.tracking_url;
    }
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(payload, requrls.editexternalsupplier).subscribe(res => {
      let responce = res;
      if (responce.success) {
        $("#exampleModal").modal("hide");
        this.supplier = {};
        this.getExternalSupplier();
        this.toastr.success(responce.message);
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

  remove(obj, i) {
    this.quotas.splice(i, i);
  }

  ngOnInit() {
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    this.project_id = +localStoreDetail.id;
    this.project_status = localStoreDetail.status;
    this.proname = localStoreDetail.name;
    let action = this.route.snapshot.queryParamMap.get("action");
    this.action = action;
    let localStoreTgDetail = this.localStoreService.getLocal(
      "target-group",
      "detail"
    );
    if (localStoreTgDetail == undefined) {
      setTimeout(() => {
        this.toastr.error("Please create Target group");
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    this.ttypes = [
      {
        value: "0",
        label: "Redirect"
      },
      {
        value: "1",
        label: "Pixel"
      },
      {
        value: "2",
        label: "Curl"
      }
    ];
    this.tmethods = [
      {
        value: "0",
        label: "Get"
      },
      {
        value: "1",
        label: "Post"
      }
    ];
    this.getExternalSupplier();
  }
}
