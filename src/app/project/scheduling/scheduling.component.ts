import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import * as fromStore from "../store";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { OrderPipe } from "ngx-order-pipe";
import { CommonService } from "../../shared/common.service";
import { ToastrService } from "ngx-toastr";
import { ProService } from "../store/service";
import { LocalstoreService } from "../../shared/localstore.service";
import { listtextsupply } from "@Project/store/actions/listexpsup.actions";
import * as requrls from '../store/requrl';
import { HttpService } from "app/store/http/http.service";
declare var $: any;

@Component({
  selector: "app-scheduling",
  templateUrl: "./scheduling.component.html",
  styleUrls: ["./scheduling.component.css"]
})
export class SchedulingComponent implements OnInit {
  proname;
  project_id;
  tgroups;
  interlockquotas;
  loader: boolean;
  targetGrpId;
  selectedDatas = [];
  errorMessage: string = "";
  successMessage: string = "";
  ifError: boolean = false;
  ifSucc: boolean = false;
  sources;
  invities;
  reminder1;
  reminder2;
  srcId = null;
  ttypes = [];
  tmethods = [];
  supplier: any = {};
  quotas = [];
  action;
  schAt;
  schSource = [];

  schStats = {};
  schId;

  quota = true;
  rem2 = false;
  rem1 = false;

  is_authorized;

  is_disabled = false;

  future = true;
  datetime = {};

  count = 1;
  payload = {};
  popupMess = '';

  rtyp = false;

  constructor(
    private httpservice: HttpService,
    private store: Store<fromStore.ProjectsState>,
    public route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private cs: CommonService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService
  ) { }

  ngOnInit() {
    var self = this;
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    let action = this.route.snapshot.queryParamMap.get("action");
    this.action = action;
    this.project_id = +localStoreDetail.id;
    this.proname = localStoreDetail.name;
    this.getTargetGrp(this.project_id);
    setTimeout(() => {
      let dateNow = new Date();
      $(function () {
        $("#datetimepicker4").datetimepicker({
          icons: {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            next: "fa fa-arrow-right",
            previous: "fa fa-arrow-left"
          },
          defaultDate: dateNow
        });
        $("#datetimepicker5").datetimepicker({
          icons: {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            next: "fa fa-arrow-right",
            previous: "fa fa-arrow-left"
          },
          defaultDate: dateNow
        });
      });
      $("#datetimepicker4").on("dp.change", function (e) {
        if (!e.date) {
          self.schAt = false;
        } else {
          self.schAt = self.cs.formatDateWithTime(e.date._d);
        }
        // $('#myDate2').data("DateTimePicker").minDate(e.date);
      });
      $("#datetimepicker5").on("dp.change", function (e) {
        if (!e.date) {
          self.schAt = false;
        } else {
          self.schAt = self.cs.formatDateWithTime(e.date._d);
        }
        // $('#myDate2').data("DateTimePicker").minDate(e.date);
      });
    }, 500);

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
    this.schSource = [
      {
        value: 0,
        label: "Own Panel"
      },
      {
        value: 1,
        label: "MPH Panels"
      },
      {
        value: 2,
        label: "Both"
      }
    ];
  }

  getSources(payload) {
    this.httpservice.postData(payload, requrls.schsource).subscribe(res => {
      this.sources = res.data;
      this.sources = res.data.map(option => ({
        value: option.source_id,
        label: option.source_name
      }));
    });
  }

  clickFun(call) {
    this.selectedDatas = [];
    if (call == "in") {
      this.quota = false;
      this.rem2 = false;
      this.rem1 = true;
    } else if (call == "r1") {
      this.quota = false;
      this.rem1 = false;
      this.rem2 = true;
    } else if (call == "r2") {
      this.quota = false;
      this.rem1 = false;
      this.rem2 = false;
    } else {
      this.quota = true;
      this.rem1 = false;
      this.rem2 = false;
    }
  }

  getTargetGrp(id) {
    const payload = { project_id: id };
    this.loader = true;
    this.httpservice.postData(payload, requrls.listtrggrp).subscribe(res => {
      let response = res;
      if (response.success) {
        this.tgroups = response.data.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
      }
      this.loader = false;
    });
  }

  getInterlockQuota(obj) {
    const payload = { target_group_id: +obj.value };
    this.getSources(payload);
    this.targetGrpId = obj.value;
    this.loader = true;
    this.httpservice.postData(payload, requrls.interlockquota).subscribe(res => {
      let responce = res;
      if (responce.success) {
        this.interlockquotas = res["data"][0].quotas;
        this.interlockquotas.forEach(element => {
          element["req"] = element.completes_required;
        });
        this.is_authorized = responce.data.is_authorozied;
      } else {
        this.interlockquotas = res["data"][0].quotas;
        this.is_authorized = responce.data.is_authorozied;
      }
      this.loader = false;
    });
    this.getInvititaion();
    this.getReminder1();
    this.getReminder2();
  }

  changeReq(data, value, call) {
    if (value != null) {
      data.req = value;
      if (+value > data.completes_required) {
        this.toastr.error("Please Enter Valid Data");
        this.is_disabled = true;
      } else {
        this.is_disabled = false;
      }
    }
  }

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj) != -1) {
      } else {
        this.selectedDatas.push(obj);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj);
      this.selectedDatas.splice(index, 1);
    }
    this.quotas = [...this.selectedDatas];
  }

  getInvititaion() {
    const payload = {
      target_group_id: +this.targetGrpId,
      no_of_schedule: 1
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listschinvities).subscribe(res => {
      let response = res;
      if (response.success) {
        this.invities = response.data;
      } else {
        this.invities = [];
      }
      this.spinnerService.hide();
    });
  }

  getReminder1() {
    const payload = {
      target_group_id: +this.targetGrpId,
      no_of_schedule: 2
    };
    // this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listschinvities).subscribe(res => {
      let response = res;
      if (response.success) {
        this.reminder1 = response.data;
      } else {
        this.reminder1 = [];
      }
    });
  }

  getReminder2() {
    const payload = {
      target_group_id: +this.targetGrpId,
      no_of_schedule: 3
    };
    // this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listschinvities).subscribe(res => {
      let response = res;
      if (response.success) {
        this.reminder2 = response.data;
      } else {
        this.reminder2 = [];
      }
    });
  }

  onSubmit() {
    if (this.quotas.length == 0) {
      this.toastr.error("Please select quotas");
      return;
    }
    this.supplier["target_group_id"] = this.targetGrpId;
    this.supplier["quotas"] = this.quotas.map(option => ({
      id: option.quota_id,
      required_completes: option.required_completes
    }));
    let payload = this.supplier;
    this.httpservice.postData(payload, requrls.addexternalsupplier).subscribe(res => {
      let responce = res;
      if (responce.success) {
        this.toastr.error(responce.message);
      } else {
        this.toastr.error("Something is wrong..!");
      }
    });
  }

  tptCheck(c) {
    if (c == "f") {
      this.future = false;
      let dateNow = new Date();
      this.schAt = this.cs.formatDateWithTime(new Date());
      this.datetime = {
        icons: {
          time: "fa fa-clock",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down",
          next: "fa fa-arrow-right",
          previous: "fa fa-arrow-left"
        },
        defaultDate: dateNow
        // viewDate: new Date()
      };
    } else {
      let dateNow = new Date();
      this.schAt = this.cs.formatDateWithTime(new Date());
      this.datetime = {
        icons: {
          time: "fa fa-clock",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down",
          next: "fa fa-arrow-right",
          previous: "fa fa-arrow-left"
        },
        defaultDate: dateNow
        // viewDate: new Date()
      };
      this.future = true;
    }
  }

  enableRouting() {
    if (this.is_authorized == 0 && this.selectedDatas.length === 0) return;
    if (this.quotas.length === 0) {
      this.toastr.error("Please Select Quota");
      return;
    }
    $("#enableRoutings").modal("show");
  }

  addSupplier() {
    if (this.is_authorized == 0 && this.selectedDatas.length === 0) return;
    if (this.quotas.length === 0) {
      this.toastr.error("Please Select Quota");
      return;
    }
    $("#addSupplier").modal("show");
  }

  tptSwitch;

  schduleQuota() {
    if (this.is_authorized == 0 && this.selectedDatas.length === 0) return;
    if (this.quotas.length === 0) {
      this.toastr.error("Please Select Quota");
    } else if (this.srcId == null) {
      this.toastr.error("Please Select Source");
    } else {
      let dateNow = new Date();
      setTimeout(() => {
        this.tptSwitch = 'n';
      }, 1);
      $('#datetimepicker4').data("DateTimePicker").minDate(dateNow);
      $("#scheduleModel").modal("show");
    }
  }

  setReminder1() {
    if (this.is_authorized == 0 && this.selectedDatas.length === 0) return;
    if (this.quotas.length === 0) {
      this.toastr.error("Please Select Quota");
      return;
    } else {
      this.supplier["no_of_schedule"] = 2;
    }
    this.count = 1;
    $("#reminder1Model").modal("show");
  }

  setReminder2() {
    if (this.is_authorized == 0 && this.selectedDatas.length === 0) return;
    if (this.quotas.length === 0) {
      this.toastr.error("Please Select Quota");
      return;
    } else {
      this.supplier["no_of_schedule"] = 3;
    }
    this.count = 2;
    $("#reminder1Model").modal("show");
  }

  onSubmitReminder1(imgid, lodimgid) {
    let target_group_batch_scheduler_id = [];
    if (this.quotas.length === 0) {
      this.toastr.error("Please select quotas");
      return;
    }
    this.supplier["target_group_id"] = this.targetGrpId;
    // this.supplier["scheduled_at"] = this.schAt;
    if (this.future) {
      if (this.schAt != false) {
        this.supplier["scheduled_at"] = this.schAt;
      } else {
        this.toastr.error("Please Enter Valid Date");
        return;
      }
    } else {
      this.supplier["scheduled_at"] = this.cs.formatDateWithTime(new Date());
    }
    this.supplier["is_now"] = this.future == true ? 1 : 0;
    this.quotas.map(option => {
      target_group_batch_scheduler_id.push(option.id);
      this.supplier[
        "target_group_batch_scheduler_id"
      ] = target_group_batch_scheduler_id;
    });

    let payload = this.supplier;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.reminderschbatches).subscribe(res => {
      let responce = res;
      if (responce.success) {
        this.toastr.success(responce.message);
        $("#reminder1Model").modal("hide");
        this.getReminder1();
        this.getReminder2();
      } else {
        this.toastr.error(responce.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  onSubmitSchedule(imgid, lodimgid) {
    if (this.quotas.length == 0) {
      this.toastr.error("Please select quotas");
      return;
    }
    if (this.srcId == null) {
      this.toastr.error("Please Select Source");
      return;
    }
    this.supplier["target_group_id"] = this.targetGrpId;
    // this.supplier["scheduled_at"] = this.schAt;
    if (this.future) {
      if (this.schAt != false) {
        this.supplier["scheduled_at"] = this.schAt;
      } else {
        this.toastr.error("Please Enter Valid Date");
        return;
      }
    } else {
      this.supplier["scheduled_at"] = this.cs.formatDateWithTime(new Date());
    }
    this.supplier["is_now"] = this.future == true ? 1 : 0;
    this.supplier["no_of_schedule"] = 1;
    this.supplier["source_id"] = this.srcId;
    this.supplier["quotas"] = this.quotas.map(option => ({
      target_group_quota_id: option.quota_id,
      required_sample: option.req
    }));
    let payload = this.supplier;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.schbatchesbyquota).subscribe(res => {
      let responce = res;
      if (responce.success) {
        this.toastr.success(responce.message);
        this.localStoreService.removeLocalStorageObj(
          "target-group",
          "schedule-reminder1"
        );
        this.localStoreService.removeLocalStorageObj(
          "target-group",
          "schedule-invitation"
        );
        this.getInvititaion();
        this.supplier = {};
        $("#scheduleModel").modal("hide");
      } else {
        this.toastr.error(responce.message);
      }
      this.is_disabled = false;
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  enRouting(value, imgid, lodimgid) {
    // debugger
    if (
      this.supplier.routing_type == undefined ||
      this.supplier.routing_type == "" ||
      this.supplier.routing_type == null
    ) {
      this.rtyp = true;
      return;
    }
    this.rtyp = false;

    let quota = this.selectedDatas.map(option => ({
      target_group_quota_id: +option.quota_id,
      routing_required_completes: option.req
    }));
    const payload = {
      target_group_id: this.targetGrpId,
      routing_type:
        typeof this.supplier.routing_type == "object"
          ? this.supplier.routing_type[0]
          : this.supplier.routing_type,
      quotas: quota
    };
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.enablerouting).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        this.selectedDatas.forEach(ele2 => {
          this.interlockquotas.forEach(ele1 => {
            if (ele1.quota_id === ele2.quota_id) {
              ele1.routing_enabled = 1;
            }
          });
        });
        this.selectedDatas = [];
        $("#enableRoutings").modal("hide");
      } else {
      }
      this.is_disabled = false;
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  is_req = false;

  onSubmitAddSupplier(formVal, imgid, lodimgid) {
    if (this.supplier.name == null || this.supplier.name == "") {
      this.is_req = true;
      return;
    } else {
      this.is_req = false;
      this.addExternalSupplier(formVal.value, imgid, lodimgid);
    }
  }

  addExternalSupplier(value, imgid, lodimgid) {
    this.supplier["target_group_id"] = this.targetGrpId;
    this.supplier["quotas"] = this.quotas.map(option => ({
      id: option.quota_id,
      required_completes: option.req
    }));
    let payload = this.supplier;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.addexternalsupplier).subscribe(res => {
      let responce = res;
      if (responce.success) {
        $("#addSupplier").modal("hide");
        this.supplier = {};
        this.selectedDatas = [];
        const supplierPayload = { target_group_id: this.targetGrpId };
        this.store.dispatch(new listtextsupply(supplierPayload));
        this.toastr.success(responce.message);
      } else {
        this.toastr.error(responce.message);
      }
      this.is_disabled = false;
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  deleteSch(obj, call) {
    this.payload = {};
    this.payload["target_group_id"] = this.targetGrpId
    if (call == 'i') {
      this.payload["target_group_batch_scheduler_id"] = [obj.id];
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        $('#confirmBox').modal('show');
        this.payload["target_group_batch_scheduler_id"] = this.selectedDatas;
      } else {
        //this.toastr.error('Please Select Project..!');
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletetrggrpsch).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload["target_group_batch_scheduler_id"].forEach(ele2 => {
          this.invities.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.invities.indexOf(ele1);
              this.invities.splice(index, 1);
            }
          });
        });
        this.payload = {};
        this.toastr.success(response.message);
      } else {
      }
      $('#confirmBox').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  getStats(obj) {
    let payload = {
      scheduler_id: obj.id
    };
    this.schId = obj.id;
    this.httpservice.postData(payload, requrls.schdetails).subscribe(res => {
      let response = res;
      if (response.success) {
        this.schStats = response.data;
        $("#stats").modal("show");
      } else {
      }
    });
  }

  downloadReport() {
    let payload = {
      'scheduler_id': this.schId
    }
    this.httpservice.postData(payload, requrls.getschreport).subscribe(res => {
      let response = res;
      if (response.success) {

      } else {
      }
    })
  }


  closeMd() {
    // this.getScheduleList();
    this.future = true;
    this.tptCheck('n');
    this.selectedDatas = [];
  }

  remove(obj, i) {
    this.quotas.splice(i, i);
    $('#chk1' + obj.quota_id).prop('checked', false);
  }
}
