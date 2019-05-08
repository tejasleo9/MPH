import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../../shared/common.service";
import { LocalstoreService } from "../../../shared/localstore.service";
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";
@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  proname;
  schList;
  target_grp_id;
  project_id;
  selectedDatas = [];
  invities = [];
  reminder1 = [];
  reminder2 = [];
  supplier: any = {};
  quotas = [];
  schAt;
  is_authorized;

  isnow = [];
  action;
  ttypes;
  tmethods;
  project_status;
  lastAction = this.localStoreService.getLastAction("last-action");

  constructor(
    private httpservice: HttpService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private cs: CommonService,
    private router: Router,
    private localStoreService: LocalstoreService
  ) { }

  ngOnInit() {
    var self = this;
    this.future = true;
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    this.project_id = +localStoreDetail.id;
    this.project_status = localStoreDetail.status;
    this.proname = localStoreDetail.name;
    this.schAt = this.cs.formatDateWithTime(new Date());
    let localStoreTgDetail = this.localStoreService.getLocal(
      "target-group",
      "detail"
    );
    this.is_authorized = this.localStoreService.getLocal(
      "target-group",
      "schedule-isauthorized"
    );
    if (localStoreTgDetail == undefined) {
      setTimeout(() => {
        this.toastr.error("Please create Target group");
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    let scheduleInvitation = this.localStoreService.getLocal(
      "target-group",
      "schedule-invitation"
    );
    if (scheduleInvitation != undefined) {
      this.invities = scheduleInvitation;
    } else {
      this.getInvititaion();
    }
    let action = this.route.snapshot.queryParamMap.get("action");
    this.action = action;
    this.getSources();
    setTimeout(() => {
      $(function () {
        $("#datetimepicker4").datetimepicker(self.datetime);
        $("#datetimepicker5").datetimepicker(self.datetime);
      });
      $("#datetimepicker4").on("dp.change", function (e) {
        self.schAt = self.cs.formatDateWithTime(e.date._d);
      });
      $("#datetimepicker5").on("dp.change", function (e) {
        self.schAt = self.cs.formatDateWithTime(e.date._d);
      });
    }, 500);
    this.tptCheck("n");
    let payload = {
      target_group_id: this.target_grp_id
    };
    this.getSource(payload);
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
    this.isnow = [
      {
        value: 0,
        label: "Future"
      },
      {
        value: 1,
        label: "Now"
      }
    ];
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
  }

  getScheduleList() {
    const payload = {
      target_group_id: this.target_grp_id,
      no_of_schedule: 1
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.interlockquota).subscribe(res => {
      let response = res;
      if (response.success) {
        this.schList = response.data[0].quotas;
        this.is_authorized = response.data.is_authorozied;
        this.localStoreService.setLocal(
          "target-group",
          "schedule-isauthorized",
          this.is_authorized
        );
      } else {
        setTimeout(() => {
          this.toastr.error(response.message);
        }, 500);
      }
      this.spinnerService.hide();
      this.is_authorized = response.data.is_authorozied;
    });
  }

  getSource(payload) {
    this.httpservice.postData(payload, requrls.schsource).subscribe(res => {
      this.sources = res.data;
    });
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

  addSupplier() {
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0) {
      this.toastr.error("Please Select Quota");
      return;
    }
    $("#addSupplier").modal("show");
  }

  schduleQuota() {
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0) {
      this.toastr.error("Please Select Quota");
      return;
    }
    $("#scheduleModel").modal("show");
  }

  count = 1;

  setReminder1() {
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0) {
      this.toastr.error("Please Select Quota");
      return;
    } else {
      this.supplier["no_of_schedule"] = 2;
    }
    this.count = 1;
    $("#reminder1Model").modal("show");
  }

  setReminder2() {
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0) {
      this.toastr.error("Please Select Quota");
      return;
    } else {
      this.supplier["no_of_schedule"] = 3;
    }
    this.count = 2;
    $("#reminder1Model").modal("show");
  }

  getInvititaion() {
    this.quotas = [];
    const payload = {
      target_group_id: +this.target_grp_id,
      no_of_schedule: 1
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listschinvities).subscribe(res => {
      let response = res;
      if (response.success) {
        this.invities = response.data;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  getReminder1() {
    const payload = {
      target_group_id: +this.target_grp_id,
      no_of_schedule: 2
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listschinvities).subscribe(res => {
      let response = res;
      if (response.success) {
        this.reminder1 = response.data;
      } else {
        this.reminder1 = [];
      }
      this.spinnerService.hide();
    });
  }

  getReminder2() {
    const payload = {
      target_group_id: +this.target_grp_id,
      no_of_schedule: 3
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listschinvities).subscribe(res => {
      let response = res;
      if (response.success) {
        this.reminder2 = response.data;
      } else {
        this.reminder2 = [];
      }
      this.spinnerService.hide();
    });
  }

  changeReq(data, value, call) {
    if (value != null) {
      data["req"] = value;
    }
  }

  dateTime = false;

  onSubmitReminder1(imgid, lodimgid) {
    let target_group_batch_scheduler_id = [];
    if (this.quotas.length == 0) {
      this.toastr.error("Please select quotas");
      return;
    }
    this.supplier["target_group_id"] = this.target_grp_id;
    this.supplier["scheduled_at"] = this.schAt;
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
        if (this.count == 1) {
          document.getElementById('rem1').click();
        } else if (this.count == 2) {
          document.getElementById('rem2').click();
        }
        this.getReminder1();
        this.getReminder2();
        $("#reminder1Model").modal("hide");
      } else {
        this.toastr.error(responce.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  sources = [];

  getSources() {
    const payload = {
      target_group_id: this.target_grp_id
    };
    this.httpservice.postData(payload, requrls.schsource).subscribe(res => {
      if (res.data != undefined) {
        this.sources = res.data.map(option => ({
          value: option.source_id,
          label: option.source_name
        }));
      }
    });
  }

  future;
  datetime = {};
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
      };
      this.future = true;
    }
  }

  payload;
  popupMess;

  deleteSch(obj, call) {
    this.payload = {};
    this.payload["target_group_id"] = this.target_grp_id;
    if (call == "i") {
      this.payload["target_group_batch_scheduler_id"] = [obj.id];
      $("#confirmBox").modal("show");
    } else {
      if (this.selectedDatas.length != 0) {
        $("#confirmBox").modal("show");
        this.payload["target_group_batch_scheduler_id"] = this.selectedDatas;
      } else {
      }
    }
    this.popupMess = "Are you sure want to delete.?";
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
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
        this.toastr.error(response.message);
      }
      $("#confirmBox").modal("hide");
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  schStats = {};
  schId;

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
        this.toastr.error(response.message);
      }
    });
  }

  schSource;

  next() {
    this.router.navigate(["/project/target-groups/external"], {
      queryParams: { action: this.action }
    });
  }

  previous() {
    this.router.navigate(["/project/target-groups/survey"], {
      queryParams: { action: this.action }
    });
  }

  remove(i) {
    this.quotas.splice(i, i);
  }

  downloadReport() {
    let payload = {
      'scheduler_id': this.schId
    }
    this.httpservice.postData(payload, requrls.getschreport).subscribe(res => {
      let response = res;
      if (response.success) {

      } else {
        this.toastr.error(response.message);
      }
    })
  }
}
