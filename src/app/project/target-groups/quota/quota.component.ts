import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { ActivatedRoute, Router } from "@angular/router";
import { nonlocksrc } from "../../store/actions/nonlocksrc.actions";
import { agenonlocksrc } from "../../store/actions/agenonlock.actions";
import { ProService } from "./../../store/service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import { LocalstoreService } from "../../../shared/localstore.service";
import { CommonService } from "../../../shared/common.service";
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";
declare var $: any;

@Component({
  selector: "app-quota",
  templateUrl: "./quota.component.html",
  styleUrls: ["./quota.component.css"]
})
export class QuotaComponent implements OnInit {
  lastAction = this.localStoreService.getLastAction("last-action");
  gender: number;
  age;
  proname;
  reqcom;
  tgid;
  regions;
  sources;
  questions;
  nongender: any;
  nonregion: any = [];
  nonques: any = [];
  data: any = [];
  ageArray: any = [];
  minage: any;
  maxvalue: string;
  nonage: any = [];
  prevmin;
  showagesrc = null;
  gloaded = null;
  aloaded;
  grtotal;
  gftotal: number;
  artotal;
  aftotal: number;
  qrtotal;
  qftotal: number;
  droppedItems = [];
  nonlock = false;
  nonlockdrag = true;
  galoaded = false;
  loloaded;
  queloaded;
  genderdata;
  agedata;
  regiondata;
  intotal;
  inftotal;
  getinchange;
  message;
  droppedData;
  gnonlock = null;
  agenonlock = null;
  citynonlock = null;
  gnonlockdrag = true;
  anonlockdrag = true;
  rnonlockdrag = true;
  prononlockdrag = true;
  quesnonlock = null;
  project_id;
  ctotal;
  cftotal;
  getregion;
  target_group_id;
  schList;
  target_grp_id;
  projectid;
  qtype;
  failed = false;
  quotastatus;
  action;
  selectedDatas = [];
  supplier: any = {};
  quotas = [];
  schAt;
  ttypes = [];
  tmethods = [];
  isnow = [];
  sendsources;
  nonintergender = {};
  noninterage = {};
  noninterregion = {};
  noninterques = {};
  quedata;
  rloaded;
  gloader;
  qloaded;
  proerrormessage;
  selectedque;
  prononlock = false;
  prototal;
  proftotal;
  propayload;
  questlock = null;
  autointer = [];
  noninterItems;
  noninterdata;
  schSource = [];
  project_status;

  disable = [];

  tptSwitch;
  textValue;

  constructor(
    private httpservice: HttpService,
    private router: Router,
    private store: Store<fromStore.ProjectsState>,
    public route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private cs: CommonService,
    private localStoreService: LocalstoreService
  ) { }

  previous() {
    this.router.navigate(["/project/target-groups/exclusion"], {
      queryParams: { action: this.action }
    });
  }

  ngOnInit() {
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    this.project_status = localStoreDetail.status;
    // this.is_authorized = this.localStoreService.getLocal(
    //   "target-group",
    //   "schedule-isauthorized"
    // );
    let localStoreTgDetail = this.localStoreService.getLocal(
      "target-group",
      "detail"
    );
    let localStoreTgOverview = this.localStoreService.getLocal(
      "target-group",
      "overview"
    );
    let localStoreTgCountry = this.localStoreService.getLocal(
      "target-group",
      "country"
    );
    let localStoreTgSource = this.localStoreService.getLocal(
      "target-group",
      "source"
    );
    let localStoreQstatus = this.localStoreService.getLocal(
      "target-group",
      "quota-status"
    );
    let localStoreRegions = this.localStoreService.getLocal(
      "regions",
      "selected"
    );
    let localStoreQues = this.localStoreService.getLocal(
      "target-group",
      "profile"
    );

    this.localStoreService.setLocal("quota", "locks", "");
    var self = this;

    let action = this.route.snapshot.queryParamMap.get("action");
    this.action = action;

    let project_id = localStoreDetail.id;
    let target_grp_id = localStoreTgDetail.id;
    let project_name = localStoreDetail.name;
    this.schAt = this.cs.formatDateWithTime(new Date());
    this.gender = localStoreTgOverview.gender;
    this.age =
      localStoreTgOverview.min_age + "," + localStoreTgOverview.max_age;
    this.reqcom = localStoreTgOverview.completes_required;
    this.regions = localStoreRegions;
    this.sendsources = localStoreTgOverview.sources;
    this.questions = localStoreQues;
    this.quotastatus = localStoreQstatus;

    this.project_id = project_id;
    if (localStoreTgDetail == undefined) {
      setTimeout(() => {
        this.toastr.error("Please create Target group");
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    this.tgid = target_grp_id;
    this.proname = project_name;

    this.age = this.age.split(",");
    this.minage = this.age.shift();
    this.maxvalue = this.age.pop();

    this.getSources();
    this.getScheduleList();
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
      });
      $("#datetimepicker4").on("dp.change", function (e) {
        if (!e.date) {
          self.schAt = false;
        } else {
          self.schAt = self.cs.formatDateWithTime(e.date._d);
        }

        // $('#myDate2').data("DateTimePicker").minDate(e.date);
      });
    }, 500);

    if (this.quotastatus) {
      let quotalist = this.localStoreService.getLocal(
        "target-group",
        "quota-list"
      );
      if (quotalist == null) {
        this.qtype = 0;
        this.getSources();
        this.getScheduleList();
      } else {
        this.qtype = 0;
        this.schList = this.localStoreService.getLocal(
          "target-group",
          "quota-list"
        );
      }
    } else {
      this.qtype = 1;
    }

    this.ageArray = [{ minval: this.minage, maxval: "0" }];
    //this.regions = JSON.parse(this.regions);

    setTimeout(() => {
      $(document).ready(function () {
        $(".age-show").show();
        $("#chk01").change(function () {
          if ($(this).is(":checked")) {
            $(".gender-show").show();
          } else {
            $(".gender-show").hide();
          }
        });
        // $('#chk02').change(function(){
        //    if($(this).is(":checked"))
        //      $('.age-show').show();
        //  else
        //      $('.age-show').hide();
        // });
        $("#chk03").change(function () {
          if ($(this).is(":checked")) {
            $(".city-show").show();
          } else {
            $(".city-show").hide();
          }
        });
        $("#chk04").change(function () {
          if ($(this).is(":checked")) {
            $(".profile-show").show();
          } else {
            $(".profile-show").hide();
          }
        });
        $("#age-city").change(function () {
          if ($(this).is(":checked")) {
            $(".agecity-show").show();
          } else {
            $(".agecity-show").hide();
          }
        });
      });

      // function tptCheck(x) {
      //   if (x === "tptOn") {
      //     $(".tptCheckingBox").show();
      //     $(".tptCheckingBox2").hide();
      //     $(".selected-listname").addClass("project-list");
      //   } else {
      //     $(".tptCheckingBox").hide();
      //     $(".tptCheckingBox2").show();
      //     $(".selected-listname").removeClass("project-list");
      //   }
      // }
    }, 1);
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
  

  onagecheck(v) {
    if (v) {
      this.showagesrc = false;
    } else {
      this.showagesrc = null;
      this.ageArray = [{ minval: this.minage, maxval: "0" }];
      this.nonage = [];
      this.agedata = "";
      this.textValue = 0;
      let removeLocal = this.localStoreService.getLocal("quota", "locks");

      removeLocal.forEach((element, i) => {
        if (element.quota.id == "A") {
          removeLocal.splice(i, 1);
        }
      });
      this.localStoreService.setLocal("quota", "locks", removeLocal);
      console.log(this.ageArray);
    }
  }

  getVal(v){
    this.textValue = v;
  }

  addAge(v: string) {
    this.agenonlock = false;
    let total;
    if (v <= this.maxvalue) {
      if (this.ageArray.length === 1) {
        const index = this.ageArray.findIndex(
          item => item.minval === this.minage
        );
        this.ageArray[index].maxval = v;
        // tslint:disable-next-line:radix
        this.prevmin = parseInt(v) + 1;
        const obj = { minval: this.prevmin, maxval: "0" };
        if (v !== this.maxvalue && v > this.minage) {
          let lastObj = this.ageArray[this.ageArray.length - 1];
          lastObj['is_disabled'] = true;
          this.ageArray.push(obj);

          document.getElementById('maxval' + (this.ageArray.length - 1));
        }else {
          if(v !== this.maxvalue){
            this.toastr.error('Invalid Age Range ' + this.ageArray[index].minval + '-' + this.maxvalue);
          }
        }
      } else {
        console.log(1);
        const ind = this.ageArray.findIndex(
          item => item.minval === this.prevmin
        );
        if(parseInt(v) > +this.maxvalue){
          console.log('max');
          this.toastr.error('Invalid Age Range ' + this.ageArray[ind].minval + '-' + this.maxvalue);
          return false;
        }
        // tslint:disable-next-line:radix
        this.ageArray[ind].maxval = v;
        this.prevmin = parseInt(v) + 1;
        const obj = { minval: this.prevmin, maxval: v };

        if (v > this.ageArray[ind].minval && v !== this.maxvalue) {
          let lastObj = this.ageArray[this.ageArray.length - 1];
          lastObj['is_disabled'] = true;
          this.ageArray.push(obj);
          console.log(2);
        } else {
          console.log(3);
          if (v === this.maxvalue) {

          } else {
            this.toastr.error('Invalid Age Range ' + this.ageArray[ind].minval + '-' + this.maxvalue);
          }
        }
      }

      if (v === this.maxvalue) {
        this.showagesrc = true;
        this.aloaded = true;
        for (let i = 0; i < this.ageArray.length; i++) {
          const ageobj = {
            quota_name: this.ageArray[i].minval + "-" + this.ageArray[i].maxval,
            required_completes: Math.round(this.reqcom / this.ageArray.length),
            quota_conditions: {
              min_age: this.ageArray[i].minval,
              max_age: this.ageArray[i].maxval
            },
            link: { Age: 1 }
          };
          this.nonage.push(ageobj);

          if (i == this.ageArray.length - 1) {
            total = this.nonage.reduce(
              (prev, cur) => +prev + +cur.required_completes,
              0
            );
            if (total < this.reqcom || total > this.reqcom) {
              this.nonage[this.nonage.length - 1]["required_completes"] =
                this.nonage[this.nonage.length - 1]["required_completes"] +
                (+this.reqcom - +total);
            }
          }
        }

        // Call API
        const payload = {
          target_group_id: this.tgid,
          // source_id: this.sendsources[0],
          quota: {
            id: "A",
            data: this.nonage
          }
        };
        this.agedata = payload;
        this.noninterage = { id: "A", data: this.nonage };

        this.autointer.push(payload);
        this.localStoreService.setLocal("quota", "locks", this.autointer);

        this.store.dispatch(new agenonlocksrc(payload));
        this.store.select(fromStore.getagenonlocksrcLoaded).subscribe(state => {
          this.showagesrc = true;
          if (state) {
            this.aloaded = false;
            this.store.select(fromStore.getagenonlocksrc).subscribe(states => {
              this.nonage = states;
              this.agenonlock = true;

              this.artotal = this.nonage.reduce(
                (prev, cur) => +prev + +cur.required_completes,
                0
              );
              this.aftotal = this.nonage.reduce(
                (prev, cur) => +prev + +cur.feasible_completes,
                0
              );
              // if(this.artotal != this.aftotal){
              //   this.failed = true;
              // }
            });
          }
        });
      }
    } else {
      this.toastr.error('Invalid Age Range ' + this.minage + '-' + this.maxvalue);
    }
  }

  getFBbyRegion(e) {
    if (e.target.checked) {
      this.loloaded = true;
      this.rloaded = true;
      this.citynonlock = false;
      let total;
      for (let i = 0; i < this.regions.length; i++) {
        const regobj = {
          quota_name: this.regions[i]["value"],
          required_completes: Math.round(this.reqcom / this.regions.length),
          quota_conditions: { location: this.regions[i]["id"] },
          link: { Location: i }
        };
        this.nonregion.push(regobj);
        total = this.nonregion.reduce(
          (prev, cur) => +prev + +cur.required_completes,
          0
        );
        if (total > this.reqcom) {
          console.log(total);
          this.nonregion[i]["required_completes"] =
            this.nonregion[i]["required_completes"] +
            (+this.reqcom - +total);
            console.log(this.nonregion[i]["required_completes"]);
        }
        if (i == this.regions.length - 1) {
          console.log(total);
          total = this.nonregion.reduce(
            (prev, cur) => +prev + +cur.required_completes,
            0
          );
          console.log(total);
          if (total < this.reqcom || total > this.reqcom) {
            console.log(total);
            this.nonregion[this.regions.length - 1]["required_completes"] =
              this.nonregion[this.regions.length - 1]["required_completes"] +
              (+this.reqcom - +total);
              console.log(this.nonregion[this.regions.length - 1]["required_completes"]);
          }
        }
      }

      const payload = {
        target_group_id: this.tgid,
        // source_id: this.sendsources[0],
        quota: {
          id: "L",
          data: this.nonregion
        }
      };
      this.regiondata = payload;
      this.noninterregion = { id: "L", data: this.nonregion };

      this.autointer.push(payload);
      this.localStoreService.setLocal("quota", "locks", this.autointer);
      this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
        if (res.success) {
          this.nonregion = res.data.data;
          // this.loloaded = false;
          this.citynonlock = true;
          this.ctotal = this.nonregion.reduce(
            (prev, cur) => +prev + +cur.required_completes,
            0
          );
          this.cftotal = this.nonregion.reduce(
            (prev, cur) => +prev + +cur.feasible_completes,
            0
          );
          this.rloaded = false;
        } else {
          this.toastr.error(res.message);
        }
      });
    } else {
      this.nonregion = [];
      let removeLocal = this.localStoreService.getLocal("quota", "locks");

      removeLocal.forEach((element, i) => {
        if (element.quota.id == "L") {
          removeLocal.splice(i, 1);
        }
      });

      this.localStoreService.setLocal("quota", "locks", removeLocal);

      this.autointer.forEach((element, i) => {
        if (element.quota.id == "L") {
          this.autointer.splice(i, 1);
        }
      });

    }
  }

  showProfile() {
    this.queloaded = false;

    let queids;
    this.nonques = [];

    let localStoreQues = this.localStoreService.getLocal(
      "target-group",
      "profile"
    );
    this.questions = localStoreQues;

    this.questions.forEach(element => {
      let queidsObj;
      let sendques = [];
      // Add Required completes to answers array
      element["value"].forEach((e, i) => {
        e["required_completes"] = Math.round(
          this.reqcom / element["value"].length
        );

        e["quota_name"] = e.variable_text;
        e["ftotal"] = 0;

        if (i === element["value"].length - 1) {
          let total = element["value"].reduce(
            (prev, cur) => +prev + +cur.required_completes,
            0
          );
          if (total < this.reqcom || total > this.reqcom) {
            element["value"][element["value"].length - 1]["required_completes"] = element["value"][element["value"].length - 1]["required_completes"] + (+this.reqcom - +total);
          }
        }

        const queobj = {
          quota_name: e.variable_text,
          required_completes: e["required_completes"],
          quota_conditions: {
            questions: [
              { question_id: element.question_id, variable_id: e["variable_id"] }
            ]
          },
          link: { questions: i },
          ftotal: 0
        };

        sendques.push(queobj);
        // Creating nonques array for loop
        queidsObj = {
          target_group_id: this.tgid,
          quota: {
            id: "Q",
            data: sendques
          },
          question_text: element["question_text"],
          question_id: element["question_id"],
          answers: element["value"],
          inerlocked: false
        };


      });

      this.nonques.push(queidsObj);

    });
  }

  sendQues = [];
  getFBbyQues(e, s, status) {
    this.selectedque = s;
    let sendques = [];
    this.quesnonlock = false;
    if (status) {
      e["is_checked"] = true;
      e["qloaded"] = false;
      e["quesnonlock"] = false;
      this.proerrormessage = "";
      this.qloaded = false;
      let queidsObj;
      let queids = [];
      let total: number = 0;

      e.answers.forEach((element, i) => {
        if (element['quota_conditions']) {
          let varid;
          if (element["quota_conditions"]["questions"][0]["variable_id"] != undefined) {
            varid = element["quota_conditions"]["questions"][0]["variable_id"];
          } else {
            varid = element["quota_conditions"]["questions"][0]["questions"][0]["variable_id"];
          }


          // varid = element["quota_conditions"]["questions"][0]["variable_id"];


          const queobj = {
            quota_name: element["quota_name"],
            required_completes: element["required_completes"],
            quota_conditions: {
              questions: [
                { question_id: e.question_id, variable_id: varid }
              ]
            },
            link: { questions: i }
          };
          sendques.push(queobj);
        } else {
          const queobj = {
            quota_name: element["quota_name"],
            required_completes: element["required_completes"],
            quota_conditions: {
              questions: [
                { question_id: e.question_id, variable_id: element["variable_id"] }
              ]
            },
            link: { questions: i }
          };
          sendques.push(queobj);
        }



        if (i == e.answers.length - 1) {
          total = sendques.reduce(
            (prev, cur) => +prev + +cur.required_completes,
            0
          );
          if (total < this.reqcom || total > this.reqcom) {
            sendques[sendques.length - 1]["required_completes"] = sendques[sendques.length - 1]["required_completes"] + (+this.reqcom - +total);
          }
        }

      });

      this.sendQues.push(sendques);

      const payload = {
        target_group_id: this.tgid,
        quota: {
          id: "Q",
          data: sendques
        }
      };

      this.propayload = payload;

      this.sendQues.push(payload);

      this.quedata = payload;
      this.noninterques = { id: "Q", data: this.noninterques };

      this.autointer.push(payload);
      this.localStoreService.setLocal("quota", "locks", this.autointer);
      this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
        if (res.success) {
          let resdata = res.data.data;
          let total;
          resdata.forEach((element, i) => {
            this.nonques.forEach((e, ind) => {
              e["ftotal"] = 0;
              let obj = e["answers"].find(
                o => o.quota_name === element.quota_name
              );
              let index = e["answers"].indexOf(obj);
              if (index >= 0) {
                e["answers"][index] = element;
              }

              // Set FC total
              e["ftotal"] = e["answers"].reduce(
                (prev, cur) => +prev + +cur.feasible_completes,
                0
              );

              // Set Required total
              e["total"] = e["answers"].reduce(
                (prev, cur) => +prev + +cur.required_completes,
                0
              );

              if (i == this.nonques.length - 1) {
                total = this.nonques[ind]["answers"].reduce(
                  (prev, cur) => +prev + +cur.required_completes,
                  0
                );
                if (total < this.reqcom || total > this.reqcom) {
                  this.nonques[this.nonques.length - 1]["answers"][
                    "required_completes"
                  ] =
                    this.nonques[this.nonques.length - 1]["answers"][
                    "required_completes"
                    ] +
                    (+this.reqcom - +total);
                }
              }
            });
          });

          this.prononlock = true;
          this.qloaded = true;
          this.quesnonlock = true;
          e["qloaded"] = true;
          e["quesnonlock"] = true;
        }

        if (res.success) {
          this.qloaded = true;
        }
      });
      let lock = this.localStoreService.getLocal("quota", "locks");
    } else {
      e["is_checked"] = false;
      sendques = [];
      // e['total'] = '';
      // e['ftotal'] = '';
      e["qloaded"] = true;
      e["quesnonlock"] = false;
      let removeLocal = this.localStoreService.getLocal("quota", "locks");

      removeLocal.forEach((element, i) => {
        let qid = element.quota.data[0]['quota_conditions']['questions'][0]['question_id'];
        if (element.quota.id == "Q") {
          if (e['question_id'] === qid) {
            removeLocal.splice(i, 1);
          }
        }
      });

      this.autointer.forEach((element, i) => {
        let qid = element.quota.data[0]['quota_conditions']['questions'][0]['question_id'];
        if (element.quota.id == "Q") {
          if (e['question_id'] === qid) {
            this.autointer.splice(i, 1);
          }

        }
      });


      this.localStoreService.setLocal("quota", "locks", removeLocal);
      this.quesnonlock = false;
      let lock = this.localStoreService.getLocal("quota", "locks");
    }
  }

  getFeabyQues(qname, v, e) {



    if (v === '' || v < 0) {
      this.toastr.error('Invalid Required Completes!');
      this.qloaded = true;
      let total;
      let queidsObj;
      let queids = [];
      let sendques = [];
      let obj = this.propayload.quota.data.find(o => o.quota_name === qname);
      let index = this.propayload.quota.data.indexOf(obj);
      this.propayload.quota.data[index]["required_completes"] = v;
      total = this.propayload.quota.data.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      if (total > this.reqcom || total < this.reqcom) {
        e["total"] = total;
        // this.toastr.error('Invalid Required Completes');
        return false;
      } else {
        e["total"] = total;
      }
      e["qloaded"] = false;
      return false;
    }

    let total;

    let queidsObj;
    let queids = [];
    let sendques = [];

    let obj = this.propayload.quota.data.find(o => o.quota_name === qname);
    let index = this.propayload.quota.data.indexOf(obj);
    this.propayload.quota.data[index]["required_completes"] = v;

    total = this.propayload.quota.data.reduce(
      (prev, cur) => +prev + +cur.required_completes,
      0
    );

    if (total > this.reqcom || total < this.reqcom) {
      e["total"] = total;
      // this.toastr.error('Invalid Required Completes');
      return false;
    } else {
      e["total"] = total;
    }

    e["qloaded"] = false;




    this.autointer.forEach((element, i) => {
      if (this.propayload.quota.id === element["quota"]["id"]) {
        this.autointer[i] = this.propayload;
        this.localStoreService.setLocal("quota", "locks", this.autointer);
      }
    });
    this.httpservice.postData(this.propayload, requrls.quotafeasibility).subscribe(res => {
      this.qloaded = false;
      if (res.success) {
        let resdata = res.data.data;
        let total;
        resdata.forEach((element, i) => {
          this.nonques.forEach((e, ind) => {
            let obj = e["answers"].find(
              o => o.quota_name === element.quota_name
            );

            let index = e["answers"].indexOf(obj);

            if (index >= 0) {
              e["answers"][index] = element;
            }

            // Set FC total
            e["ftotal"] = e["answers"].reduce(
              (prev, cur) => +prev + +cur.feasible_completes,
              0
            );

            // Set Required total
            e["total"] = e["answers"].reduce(
              (prev, cur) => +prev + +cur.required_completes,
              0
            );

            if (i == this.nonques.length - 1) {
              total = this.nonques[ind]["answers"].reduce(
                (prev, cur) => +prev + +cur.required_completes,
                0
              );
              if (total < this.reqcom || total > this.reqcom) {
                this.nonques[this.nonques.length - 1]["answers"][
                  "required_completes"
                ] =
                  this.nonques[this.nonques.length - 1]["answers"][
                  "required_completes"
                  ] +
                  (+this.reqcom - +total);
              }
            }
          });
        });

        this.prononlock = true;
        this.qloaded = true;

        e["qloaded"] = true;
        e["quesnonlock"] = true;
      }

      if (res.success) {
        this.qloaded = true;
        // this.toastr.error(res.message);
      }
    });
  }

  feaByRegion(name, e) {

    if (this.getregion) {
      this.getregion.unsubscribe();
    }
    const index = this.nonregion.findIndex(item => item.quota_name === name);
    this.nonregion[index]["required_completes"] = e;

    this.ctotal = this.nonregion.reduce(
      (prev, cur) => +prev + +cur.required_completes,
      0
    );

    if (e === '' || e < 0) {
      this.toastr.error('Invalid Required Completes!');

      this.ctotal = this.nonregion.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.cftotal = this.nonregion.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
      this.rloaded = false;
      return false;
    }

    const payload = {
      target_group_id: this.tgid,
      // source_id: this.sendsources[0],
      quota: {
        id: "L",
        data: this.nonregion
      }
    };
    this.regiondata = payload;
    this.noninterregion = { id: "L", data: this.nonregion };

    this.autointer.forEach((element, i) => {
      if (payload.quota.id === element["quota"]["id"]) {
        this.autointer[i] = payload;
        this.localStoreService.setLocal("quota", "locks", this.autointer);
      }
    });

    if (this.ctotal === this.reqcom) {
      this.rloaded = true;
      this.httpservice.postData(this.propayload, requrls.quotafeasibility)
      this.getregion = this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
        this.nonregion = res.data.data;
        this.rloaded = false;
        this.ctotal = this.nonregion.reduce(
          (prev, cur) => +prev + +cur.required_completes,
          0
        );
        this.cftotal = this.nonregion.reduce(
          (prev, cur) => +prev + +cur.feasible_completes,
          0
        );
      });
    }
  }

  getFbyGender(e) {
    if (e) {
      this.gloaded = false;
      this.gloader = false;
      this.gnonlock = false;
      let total;
      if (this.gender === 0) {


        this.data = [
          {
            quota_name: "Male",
            required_completes: Math.round(this.reqcom / 2),
            quota_conditions: { gender: 1 },
            link: { gender: 0 }
          },
          {
            quota_name: "Female",
            required_completes: Math.round(this.reqcom / 2),
            quota_conditions: { gender: 2 },
            link: { gender: 1 }
          }
        ];

        total = this.data.reduce(
          (prev, cur) => +prev + +cur.required_completes,
          0
        );
        if (total < this.reqcom || total > this.reqcom) {
          this.data[1]["required_completes"] =
            this.data[1]["required_completes"] + (+this.reqcom - +total);
        }
      }
      if (this.gender === 1) {
        this.data = [
          {
            quota_name: "Male",
            required_completes: this.reqcom,
            quota_conditions: { gender: 1 },
            link: { gender: 0 }
          }
        ];
      }
      if (this.gender === 2) {
        this.data = [
          {
            quota_name: "Female",
            required_completes: this.reqcom,
            quota_conditions: { gender: 1 },
            link: { gender: 0 }
          }
        ];
      }

      const payload = {
        target_group_id: this.tgid,
        // source_id: this.sendsources[0],
        quota: {
          id: "G",
          data: this.data
        }
      };
      this.genderdata = payload;
      this.autointer.push(payload);
      this.localStoreService.setLocal("quota", "locks", this.autointer);

      this.nonintergender = { id: "G", data: this.data };
      this.nongender = this.data;
      this.store.dispatch(new nonlocksrc(payload));
      this.store.select(fromStore.getnonlocksrcLoaded).subscribe(state => {
        this.gloader = state;
        if (state) {
          this.store.select(fromStore.getnonlocksrc).subscribe(states => {
            if (states != null || states != undefined) {
              this.nongender = states;
              this.gnonlock = true;
              this.grtotal = this.nongender.reduce(
                (prev, cur) => +prev + +cur.required_completes,
                0
              );
              this.gftotal = this.nongender.reduce(
                (prev, cur) => +prev + +cur.feasible_completes,
                0
              );
              // if(this.grtotal != this.gftotal){
              //   this.failed = true;
              // }
            } else {
              this.toastr.error("Something went wrong!");
            }
          });
        }
      });
    } else {
      this.gloaded = true;
      this.gloader = true;
      this.nongender = [];
      let removeLocal = this.localStoreService.getLocal("quota", "locks");
      removeLocal.forEach((element, i) => {
        if (element.quota.id == "G") {
          removeLocal.splice(i, 1);
        }
      });
      this.localStoreService.setLocal("quota", "locks", removeLocal);
      // this.localStoreService.removeLocalStorageObj("quota", "locks");
    }
  }

  feaByGender(name, e) {
    this.grtotal;
    this.gftotal;

    if (this.gender === 0) {
      if (name === "Male") {
        const index = this.nongender.findIndex(
          item => item.quota_name === "Male"
        );
        this.nongender[index]["required_completes"] = e;
        this.grtotal = this.nongender.reduce(
          (prev, cur) => +prev + +cur.required_completes,
          0
        );
      } else {
        const index = this.nongender.findIndex(
          item => item.quota_name === "Female"
        );
        this.nongender[index]["required_completes"] = e;
        this.grtotal = this.nongender.reduce(
          (prev, cur) => +prev + +cur.required_completes,
          0
        );
      }
    }
    if (this.gender === 1) {
      const index = this.nongender.findIndex(
        item => item.quota_name === "Male"
      );
      this.nongender[index]["required_completes"] = e;
      this.grtotal = this.nongender.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
    }
    if (this.gender === 2) {
      const index = this.nongender.findIndex(
        item => item.quota_name === "Female"
      );
      this.nongender[index]["required_completes"] = e;
      this.grtotal = this.nongender.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
    }

    if (e === '' || e < 0) {
      this.toastr.error('Invalid Required Completes!');

      this.grtotal = this.nongender.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.gftotal = this.nongender.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
      this.gloader = true;

      return false;
    }

    const payload = {
      target_group_id: this.tgid,
      // source_id: this.sendsources[0],
      quota: {
        id: "G",
        data: this.nongender
      }
    };
    this.genderdata = payload;
    this.nonintergender = { id: "G", data: this.nongender };

    this.autointer.forEach((element, i) => {
      if (payload.quota.id === element["quota"]["id"]) {
        this.autointer[i] = payload;
        this.localStoreService.setLocal("quota", "locks", this.autointer);
      }
    });

    if (this.grtotal === this.reqcom) {
      this.gloader = false;
      this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
        this.nongender = res.data.data;
        this.grtotal = this.nongender.reduce(
          (prev, cur) => +prev + +cur.required_completes,
          0
        );
        this.gftotal = this.nongender.reduce(
          (prev, cur) => +prev + +cur.feasible_completes,
          0
        );
        this.gloader = true;
      });
    } else {
      return false;
    }
  }

  feaByAge(name, e) {
    this.artotal = 0;
    this.aftotal = 0;
    this.showagesrc = true;

    const index = this.nonage.findIndex(item => item.quota_name === name);
    this.nonage[index]["required_completes"] = e;

    this.artotal = this.nonage.reduce(
      (prev, cur) => +prev + +cur.required_completes,
      0
    );

    if (e === '' || e < 0) {
      this.toastr.error('Invalid Required Completes!');

      this.artotal = this.nonage.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.aftotal = this.nonage.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
      this.aloaded = false;
      return false;
    }

    const payload = {
      target_group_id: this.tgid,
      // source_id: this.sendsources[0],
      quota: {
        id: "A",
        data: this.nonage
      }
    };
    this.agedata = payload;
    this.noninterage = { id: "A", data: this.nonage };

    this.autointer.forEach((element, i) => {
      if (payload.quota.id === element["quota"]["id"]) {
        this.autointer[i] = payload;
        this.localStoreService.setLocal("quota", "locks", this.autointer);
      }
    });

    if (this.artotal === this.reqcom) {
      this.aloaded = true;
      this.store.dispatch(new agenonlocksrc(payload));
    } else {
      return false;
    }

    this.store.select(fromStore.getagenonlocksrcLoading).subscribe(state => {
      this.showagesrc = true;
      this.artotal = this.nonage.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.aftotal = this.nonage.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
    });

    this.store.select(fromStore.getagenonlocksrcLoaded).subscribe(state => {
      this.showagesrc = true;
      if (state) {
        this.aloaded = false;
        this.store.select(fromStore.getagenonlocksrc).subscribe(states => {
          this.nonage = states;
          this.artotal = this.nonage.reduce(
            (prev, cur) => +prev + +cur.required_completes,
            0
          );
          this.aftotal = this.nonage.reduce(
            (prev, cur) => +prev + +cur.feasible_completes,
            0
          );
        });
      }
    });
  }

  onAutoLock(qdata: any, other: any) {
    this.localStoreService.setLocal("target-group", "interlocked", true);
    this.galoaded = true;
    // Get the dropped data here
    this.noninterItems = [];
    let dragData = qdata.quota.data;
    let total = 0;
    // Loop Starts
    dragData.map((e, i) => {
      other.quota.data.map((ele, j) => {
        let otherData = other.quota.data;

        let req1 = (dragData[i].required_completes / +this.reqcom) * 100;
        let req2 = (+otherData[j].required_completes / +this.reqcom) * 100;
        let prereq = 0;
        prereq = (this.reqcom * req1) / 100;
        prereq = (prereq * req2) / 100;
        let x: any;
        let y: any;
        let gname;
        let obj = {
          quota_name: "",
          required_completes: 0,
          quota_conditions: {},
          link: { interlock_0: "" }
        };

        // calculating with required completes
        if (total > this.reqcom) {
          // if total greater than required completes
          let subtotal = total + Math.round(prereq);
          y =
            this.noninterItems[this.noninterItems.length - 1][
            "required_completes"
            ] -
            (+total - +this.reqcom);
          total = total - (+total - +this.reqcom);
          if (total === this.reqcom) {
            this.noninterItems[this.noninterItems.length - 1][
              "required_completes"
            ] = y;
            x = 0;
          } else {
            x = 0;
          }
        } else if (total < this.reqcom) {
          // if total less than required completes

          let subtotal = total - Math.round(prereq);

          if (subtotal === this.reqcom) {
            x = Math.round(prereq);
            total = total + x;
          } else if (subtotal > this.reqcom) {
            x = Math.round(prereq) - (total - this.reqcom);
            if (x < 0) {
              x = 0;
            }
            total = total + x;
          } else {
            x = Math.round(prereq);
            total = total + x;
          }
        } else if (total === this.reqcom) {
          // if total equal to required completes

          let subtotal = total - Math.round(prereq);

          if (subtotal === this.reqcom) {
            x = Math.round(prereq);
            total = total + x;
          } else if (subtotal > this.reqcom) {
            x = Math.round(prereq) - (subtotal - this.reqcom);
            if (x < 0) {
              x = 0;
            }
            total = total + x;
          } else {
            x = Math.round(prereq);
            if (x < 0) {
              x = 0;
            }
            total = total + x;
          }
        }

        // Drag Data
        if (qdata.quota.id === "G") {
          obj["quota_name"] = dragData[i].quota_name;
          if (dragData[i].quota_name == "Male") {
            obj["quota_conditions"]["gender"] = "1";
          } else {
            obj["quota_conditions"]["gender"] = "2";
          }
        }

        if (qdata.quota.id === "A") {
          obj["quota_name"] = dragData[i].quota_name;
          const ages = dragData[i].quota_name.split("-");
          obj["quota_conditions"]["min_age"] = ages[0];
          obj["quota_conditions"]["max_age"] = ages[1];
        }

        if (qdata.quota.id === "L") {
          obj["quota_name"] = dragData[i].quota_name;
          obj["quota_conditions"]["location"] =
            dragData[i].quota_conditions.location;
        }

        if (qdata.quota.id === "Q") {
          obj["quota_name"] = dragData[i].quota_name;
          obj["quota_conditions"]["questions"] =
            dragData[i].quota_conditions.questions;

          this.nonques.forEach(element => {
            let object = element["answers"].find(
              o => o.quota_name === dragData[i].quota_name
            );
            if (object != undefined) {
              let index = element["answers"].indexOf(object);
              if (this.nonques[index] != undefined) {
                this.nonques[index]["is_checked"] = false;
                return;
              }
            }
            return;
          });
          (document.getElementById(this.selectedque) as any).checked = false;
        }

        if (
          qdata.quota.id != "L" &&
          qdata.quota.id != "A" &&
          qdata.quota.id != "G" &&
          qdata.quota.id != "Q"
        ) {
          obj["quota_name"] = dragData[i].quota_name;
          obj["quota_conditions"] = Object.assign(dragData[i].quota_conditions);
        }

        obj["required_completes"] = x;

        // Other Data
        if (other.quota.id === "G") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          if (otherData[j].quota_name == "Male") {
            obj["quota_conditions"]["gender"] = "1";
          } else {
            obj["quota_conditions"]["gender"] = "2";
          }
        }

        if (other.quota.id === "A") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          const ageso = otherData[j].quota_name.split("-");
          obj["quota_conditions"]["min_age"] = ageso[0];
          obj["quota_conditions"]["max_age"] = ageso[1];
        }

        if (other.quota.id === "L") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          obj["quota_conditions"]["location"] =
            otherData[j].quota_conditions.location;
        }

        if (other.quota.id === "Q") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          obj["quota_conditions"]["questions"] =
            otherData[j].quota_conditions.questions;
          this.prononlock = false;
          this.prononlockdrag = false;

          this.nonques.forEach((element, i) => {
            let object = element["answers"].find(
              o => o.quota_name === otherData[j].quota_name
            );
            if (object != undefined) {
              let index = element["answers"].indexOf(object);
              if (this.nonques[index] != undefined) {
                this.nonques[index]["is_checked"] = false;
                return;
              }
            }
            return;
          });
          (document.getElementById(this.selectedque) as any).checked = false;
          this.questlock = false;
        }

        if (
          other.quota.id != "L" &&
          other.quota.id != "A" &&
          other.quota.id != "G" &&
          other.quota.id != "Q"
        ) {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          obj["quota_conditions"] = Object.assign(
            otherData[j].quota_conditions,
            dragData[i].quota_conditions
          );
        }
        this.noninterItems.push(obj);
      });
    });
    // Loop Ends

    const payload = {
      target_group_id: +this.tgid,
      // source_id: +this.sendsources[0],
      quota: {
        id: qdata.quota.id + "-" + other.quota.id,
        data: this.noninterItems
      }
    };
    this.noninterdata = payload;
    this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
      this.noninterItems = res.data.data;
      this.intotal = this.noninterItems.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.inftotal = this.noninterItems.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
      this.galoaded = false;
      setTimeout(() => {
        $(document).ready(function () {
          $(".agecity-show").show();
        });
      }, 1);
    });
  }
  // End of AutoLock Function

  onItemDrop(data: any, other: any) {
    this.galoaded = true;
    // Get the dropped data here
    this.droppedItems = [];
    let dragData = data.dragData.quota.data;
    let total = 0;
    // Loop Starts
    dragData.map((e, i) => {
      other.quota.data.map((ele, j) => {
        let otherData = other.quota.data;
        let req1 = (dragData[i].required_completes / +this.reqcom) * 100;
        let req2 = (+otherData[j].required_completes / +this.reqcom) * 100;
        let prereq = 0;
        prereq = (this.reqcom * req1) / 100;
        prereq = (prereq * req2) / 100;
        let x: any;
        let y: any;
        let gname;
        let obj = {
          quota_name: "",
          required_completes: 0,
          quota_conditions: {},
          link: { interlock_0: "" }
        };

        // calculating with required completes
        if (total > this.reqcom) {
          // if total greater than required completes
          let subtotal = total + Math.round(prereq);
          y = this.droppedItems[this.droppedItems.length - 1]["required_completes"] - (+total - +this.reqcom);
          total = total - (+total - +this.reqcom);
          if (total === this.reqcom) {
            this.droppedItems[this.droppedItems.length - 1]["required_completes"] = y;
            x = 0;
          } else {
            x = 0;
          }
        } else if (total < this.reqcom) {
          // if total less than required completes

          let subtotal = total - Math.round(prereq);

          if (subtotal === this.reqcom) {
            x = Math.round(prereq);
            total = total + x;
          } else if (subtotal > this.reqcom) {
            x = Math.round(prereq) - (total - this.reqcom);
            if (x < 0) {
              x = 0;
            }
            total = total + x;
          } else {
            x = Math.round(prereq);
            total = total + x;
          }
        } else if (total === this.reqcom) {
          // if total equal to required completes

          let subtotal = total + Math.round(prereq);

          if (subtotal === this.reqcom) {
            x = Math.round(prereq);
            total = total + x;
          } else if (subtotal > this.reqcom) {
            x = Math.round(prereq) - (subtotal - this.reqcom);
            if (x < 0) {
              x = 0;
            }
            total = total + x;
          } else {
            x = Math.round(prereq);
            if (x < 0) {
              x = 0;
            }
            total = total + x;
          }
        }

        // Drag Data
        if (data.dragData.quota.id === "G") {
          obj["quota_name"] = dragData[i].quota_name;
          if (dragData[i].quota_name == "Male") {
            obj["quota_conditions"]["gender"] = "1";
          } else {
            obj["quota_conditions"]["gender"] = "2";
          }
          this.message = "Interlocked Quotas for Gender";
          this.gnonlock = false;
          this.gnonlockdrag = false;
          this.gloaded = true;
        }

        if (data.dragData.quota.id === "A") {
          obj["quota_name"] = dragData[i].quota_name;
          const ages = dragData[i].quota_name.split("-");
          obj["quota_conditions"]["min_age"] = ages[0];
          obj["quota_conditions"]["max_age"] = ages[1];
          this.message = "Interlocked Quotas for Age";
          this.agenonlock = false;
          this.anonlockdrag = false;
          this.showagesrc = null;
        }

        if (data.dragData.quota.id === "L") {
          obj["quota_name"] = dragData[i].quota_name;
          obj["quota_conditions"]["location"] =
            dragData[i].quota_conditions.location;
          this.message = "Interlocked Quotas for Location";
          this.citynonlock = false;
          this.rnonlockdrag = false;
          this.loloaded = false;
        }

        if (data.dragData.quota.id === "Q") {
          obj["quota_name"] = dragData[i].quota_name;
          obj["quota_conditions"]["questions"] = dragData[i].quota_conditions.questions;

          this.nonques.forEach((element, k) => {
            let object = element["answers"].find(
              o => o.quota_name === dragData[i].quota_name
            );
            if (object != undefined) {
              let index = element["answers"].indexOf(object);
              if (this.nonques[k] != undefined) {
                this.nonques[k].is_checked = false;
                this.nonques[k].inerlocked = true;
                return;
              }
            }
            return;
          });


          // (document.getElementById(this.selectedque) as any).style.display = 'none';
          this.citynonlock = false;
          this.rnonlockdrag = false;
          this.questlock = false;
          this.quesnonlock = false;
          this.queloaded = true;
        }

        if (
          data.dragData.quota.id != "L" &&
          data.dragData.quota.id != "A" &&
          data.dragData.quota.id != "G" &&
          data.dragData.quota.id != "Q"
        ) {
          obj["quota_name"] = dragData[i].quota_name;
          obj["quota_conditions"] = Object.assign(dragData[i].quota_conditions);
        }

        obj["required_completes"] = x;

        // Other Data
        if (other.quota.id === "G") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          if (otherData[j].quota_name == "Male") {
            obj["quota_conditions"]["gender"] = "1";
          } else {
            obj["quota_conditions"]["gender"] = "2";
          }
          this.message += ", Gender";
          this.gnonlock = false;
          this.gnonlockdrag = false;
          this.gloaded = true;
        }

        if (other.quota.id === "A") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          const ageso = otherData[j].quota_name.split("-");
          obj["quota_conditions"]["min_age"] = ageso[0];
          obj["quota_conditions"]["max_age"] = ageso[1];
          this.message += ", Age";
          this.agenonlock = false;
          this.anonlockdrag = false;
          this.showagesrc = null;
        }

        if (other.quota.id === "L") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          obj["quota_conditions"]["location"] =
            otherData[j].quota_conditions.location;
          this.message += ", Location";
          this.citynonlock = false;
          this.rnonlockdrag = false;
          this.loloaded = false;
        }

        if (other.quota.id === "Q") {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          obj["quota_conditions"]["questions"] =
            otherData[j].quota_conditions.questions;
          this.prononlock = false;
          this.prononlockdrag = false;

          this.nonques.forEach((element, i) => {
            let object = element["answers"].find(
              o => o.quota_name === otherData[j].quota_name
            );
            if (object != undefined) {
              let index = element["answers"].indexOf(object);
              if (this.nonques[i] != undefined) {
                this.nonques[i].is_checked = false;
                this.nonques[i].inerlocked = true;
                return;
              }
            }
            return;
          });
          // (document.getElementById(this.selectedque) as any).style.display = 'none';
          this.questlock = false;
          this.quesnonlock = false;
          this.queloaded = true;
        }

        if (
          other.quota.id != "L" &&
          other.quota.id != "A" &&
          other.quota.id != "G" &&
          other.quota.id != "Q"
        ) {
          obj["quota_name"] += ", " + otherData[j].quota_name;
          obj["quota_conditions"] = Object.assign(
            otherData[j].quota_conditions,
            dragData[i].quota_conditions
          );
        }
        this.droppedItems.push(obj);
      });

      // if(total < this.reqcom || total > this.reqcom){
      //   this.droppedItems[this.droppedItems.length-1]['required_completes'] = this.droppedItems[this.droppedItems.length-1]['required_completes'] + (+this.reqcom - +total);
      // }
    });
    // Loop Ends



    //   this.droppedItems[this.droppedItems.length - 1]["required_completes"]
    // );
    //this.droppedItems[this.droppedItems.length - 1]["required_completes"] = this.droppedItems[this.droppedItems.length - 1]["required_completes"] + (+this.reqcom - +total);

    const payload = {
      target_group_id: +this.tgid,
      // source_id: +this.sendsources[0],
      quota: {
        id: data.dragData.quota.id + "-" + other.quota.id,
        data: this.droppedItems
      }
    };
    this.droppedData = payload;
    this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
      this.droppedItems = res.data.data;
      this.intotal = this.droppedItems.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.inftotal = this.droppedItems.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
      this.galoaded = false;
      setTimeout(() => {
        $(document).ready(function () {
          $(".agecity-show").show();
        });
      }, 1);
    });
  }
  // End of Drop Function

  interChange(name, e) {
    if (this.getinchange) {
      this.getinchange.unsubscribe();
    }

    const index = this.droppedItems.findIndex(item => item.quota_name === name);
    this.droppedItems[index]["required_completes"] = e;
    this.galoaded = true;

    const payload = {
      target_group_id: +this.tgid,
      // source_id: +this.sendsources[0],
      quota: {
        id: this.droppedData.quota.id,
        data: this.droppedItems
      }
    };

    this.getinchange = this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
      this.droppedItems = res.data.data;
      this.intotal = this.droppedItems.reduce(
        (prev, cur) => +prev + +cur.required_completes,
        0
      );
      this.inftotal = this.droppedItems.reduce(
        (prev, cur) => +prev + +cur.feasible_completes,
        0
      );
      this.galoaded = false;
      // if(this.intotal != this.inftotal){
      //   this.failed = true;
      // }
    });
  }

  removeInterlock() {
    this.gnonlockdrag = true;
    this.anonlockdrag = true;
    this.rnonlockdrag = true;
    this.droppedItems = [""];
    this.agedata = "";
    this.ageArray = [{ minval: this.minage, maxval: "0" }];
    this.nonage = [];
    this.nonregion = [];
    this.showagesrc = null;
    this.gloaded = null;
    this.gnonlock = false;
    this.agenonlock = false;
    this.citynonlock = false;
    this.loloaded = null;
    this.nongender = [];
    this.showProfile();
    (document.getElementsByClassName('quescheckbox') as any).style.display = 'block';
    this.quesnonlock = false;
    this.queloaded = false;
  }

  storeQuota(txtId, imgId) {
    let payload;
    let lock = this.localStoreService.getLocal("quota", "locks");

    this.cs.hideshowImge(txtId, imgId, "a");
    if (lock != "") {
      if (this.droppedItems.length != 0) {
        payload = {
          target_group_id: +this.tgid,
          quota: {
            id: this.droppedData.quota.id,
            data: this.droppedItems
          }
        };
      } else {
        if (lock.length === 1) {
          payload = lock[0];
        }
        if (lock.length === 2) {
          this.onAutoLock(lock[0], lock[1]);
          payload = {
            target_group_id: +this.tgid,
            quota: {
              id: this.noninterdata.quota.id,
              data: this.noninterItems
            }
          };
        }

        if (lock.length == 3) {
          this.onAutoLock(lock[0], lock[1]);
          payload = {
            target_group_id: +this.tgid,
            quota: {
              id: this.noninterdata.quota.id,
              data: this.noninterItems
            }
          };
          this.onAutoLock(payload, lock[2]);
          payload = {
            target_group_id: +this.tgid,
            quota: {
              id: this.noninterdata.quota.id,
              data: this.noninterItems
            }
          };
        }

        if (lock.length == 4) {
          this.onAutoLock(lock[0], lock[1]);
          payload = {
            target_group_id: +this.tgid,
            quota: {
              id: this.noninterdata.quota.id,
              data: this.noninterItems
            }
          };
          this.onAutoLock(payload, lock[2]);
          payload = {
            target_group_id: +this.tgid,
            quota: {
              id: this.noninterdata.quota.id,
              data: this.noninterItems
            }
          };
          this.onAutoLock(payload, lock[3]);
          payload = {
            target_group_id: +this.tgid,
            quota: {
              id: this.noninterdata.quota.id,
              data: this.noninterItems
            }
          };
        }
      }

      if (this.qtype === 0) {
        this.cs.hideshowImge(txtId, imgId, "i");
        setTimeout(() => {
          this.router.navigate(["/project/target-groups/security"], {
            queryParams: { action: this.action }
          });
        }, 1000);
      } else {
        // this.service
        //   .storeQuota(payload.target_group_id, payload.quota)
        this.httpservice.postData(payload, requrls.storequota).subscribe(res => {
          this.cs.hideshowImge(txtId, imgId, "i");
          if (res.success) {
            this.qtype = 0;
            this.getScheduleList();
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    } else {
      //this.toastr.error('Quotas not added, you can update them later.');
      // this.cs.hideshowImge(txtId, imgId, "i");
      // this.router.navigate(["/project/target-groups/security"], {
      //   queryParams: { action: this.action }
      // });

      if (this.qtype === 0) {
        this.cs.hideshowImge(txtId, imgId, "i");
        setTimeout(() => {
          this.router.navigate(["/project/target-groups/security"], {
            queryParams: { action: this.action }
          });
        }, 1000);
      } else {
        let obj = {
          'target_group_id': this.target_grp_id,
          'is_all': 1
        }
        // this.service.storeQuotaAll(obj)
        this.httpservice.postData(obj, requrls.storequota).subscribe(res => {
          this.cs.hideshowImge(txtId, imgId, "i");
          if (res.success) {
            this.qtype = 0;
            this.getScheduleList();
          } else {
            this.toastr.error(res.message);
          }
        });
      }

    }
  }

  // Code after interlock
  is_authorized;

  getScheduleList() {
    // debugger
    const payload = {
      target_group_id: this.target_grp_id,
      no_of_schedule: 1
    };

    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.interlockquota).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.schList = response.data[0].quotas;
        this.schList.forEach(element => {
          element["req"] = element.completes_required;
        });
        this.is_authorized = response.data.is_authorozied;
        // this.localStoreService.setLocal(
        //   "target-group",
        //   "schedule-isauthorized",
        //   this.is_authorized
        // );
        this.qtype = 0;
        // this.localStoreService.setLocal(
        //   "target-group",
        //   "schedule-isauthorized",
        //   this.is_authorized
        // );
        // this.localStoreService.setLocal(
        //   "target-group",
        //   "schedule",
        //   this.schList
        // );
      } else {
        this.quotastatus = false;
        this.qtype = 1;
      }
      this.spinnerService.hide();
      this.is_authorized = response.data.is_authorozied;
      // this.localStoreService.setLocal(
      //   "target-group",
      //   "schedule-isauthorized",
      //   this.is_authorized
      // );
    });

    if (this.quotastatus) {
      this.qtype = 0;
      this.schList = this.localStoreService.getLocal(
        "target-group",
        "quota-list"
      );
      this.spinnerService.hide();
    } else {
      this.qtype = 1;
      this.schList = [];
      this.quotastatus = false;
      this.spinnerService.hide();
    }
  }

  // getScheduleList() {
  //   const payload = {
  //     target_group_id: +this.target_grp_id,
  //     no_of_schedule: 1
  //   };

  //   this.store.dispatch(new getinterquota(payload));
  //   this.spinnerService.show();
  //   this.store.select(fromStore.interlockquota).subscribe(state => {

  //     if (state != undefined) {
  //       if (state["status_code"] == 2114) {
  //         //this.toastr.error(state['message']);
  //         this.localStoreService.setLocal("target-group", "quota-status", state["success"]);
  //         this.qtype = 1;
  //         this.schList = [];
  //         this.quotastatus = false;
  //       } else {
  //         this.qtype = 0;
  //         this.schList = state["data"][0]["quotas"];
  //         this.localStoreService.setLocal("target-group","quota-status",state["success"]);
  //         this.localStoreService.setLocal("target-group","quota-list",state["data"][0]["quotas"]);
  //       }
  //     }
  //   });

  //   if (this.quotastatus) {
  //     this.qtype = 0;
  //     this.schList = this.localStoreService.getLocal(
  //       "target-group",
  //       "quota-list"
  //     );
  //     this.spinnerService.hide();
  //   } else {
  //     this.qtype = 1;
  //     this.schList = [];
  //     this.quotastatus = false;
  //     this.spinnerService.hide();
  //   }

  // }

  future = false;

  datetime = {};
  tptCheck(c) {
    console.log(c);
    if (c == "f") {
      this.future = true;
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
      this.future = false;
    }
  }

  addSupplier() {
    this.is_req = false;
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0 && this.selectedDatas.length == 0) {
      this.toastr.error("Please Select Quota");
      return;
    }
    $("#addSupplier").modal("show");
  }

  closeMd() {
    this.getScheduleList();
    this.future = true;
    this.tptCheck('n');
    this.selectedDatas = [];
  }

  schduleQuota() {
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0 && this.selectedDatas.length == 0) {
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

  enableRouting() {
    if (this.is_authorized == 0) return;
    if (this.quotas.length == 0 && this.selectedDatas.length == 0) {
      this.toastr.error("Please Select Quota");
      return;
    }
    $("#enableRoutings").modal("show");
    this.supplier.routing_type = [1];
  }

  enRouting(value, imgid, lodimgid) {
    let quota = this.quotas.map(option => ({
      target_group_quota_id: +option.quota_id,
      routing_required_completes: option.req
    }));
    const payload = {
      target_group_id: this.target_grp_id,
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
          this.schList.forEach(ele1 => {
            if (ele1.quota_id === ele2.quota_id) {
              ele1.routing_enabled = 1;
            }
          });
        });
        this.supplier = {};
        $("#enableRoutings").modal("hide");
      } else {
        this.toastr.error(response.message);
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
    this.supplier["target_group_id"] = this.target_grp_id;
    this.supplier["quotas"] = this.quotas.map(option => ({
      id: option.quota_id,
      required_completes: option.req
    }));
    let payload = this.supplier;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.addexternalsupplier).subscribe(res => {
      let responce = res;
      if (responce.status_code == 200) {
        $("#addSupplier").modal("hide");
        this.supplier = {};
        this.toastr.success(responce.message);
      } else {
        this.toastr.error(responce.message);
      }
      this.is_disabled = false;
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  is_disabled = false;

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
  srcId = null;
  onSubmitSchedule(imgid, lodimgid) {
    if (this.quotas.length == 0) {
      this.toastr.error("Please select quotas");
      return;
    }
    this.supplier["target_group_id"] = this.target_grp_id;
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
        this.supplier = {};
        this.router.navigate(['/project/target-groups/schedule'], { queryParams: { action: this.action } });
        $("#scheduleModel").modal("hide");
      } else {
        this.toastr.error(responce.message);
      }
      this.is_disabled = false;
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

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

  payload;
  popupMess;

  delete(obj, call) {
    this.payload = {};
    if (call == "i") {
      this.payload["id"] = [obj.id];
      $("#confirmBox").modal("show");
    } else {
      if (this.selectedDatas.length != 0) {
        $("#confirmBox").modal("show");
        this.payload["id"] = this.selectedDatas;
      } else {
        //this.toastr.error('Please Select Project..!');
      }
    }
    this.popupMess = "Are you sure want to delete.?";
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.payload, requrls.deletetrggrpsch).subscribe(res => {
      let response = res;
      if (response.status_code == 2069) {
        this.payload["id"].forEach(ele2 => {
          this.schList.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.schList.indexOf(ele1);
              this.schList.splice(index, 1);
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

  authorizedTrgGrp() {
    let payload = {
      target_group_id: this.tgid
    };
    this.httpservice.postData(payload, requrls.authorizeproject).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  disablesRouting() {
    let temp = [];
    this.selectedDatas.forEach(element => {
      if (element.routing_enabled == 1) {
        temp.push(element.quota_id);
      }
    });
    let payload = {
      'target_group_id': this.tgid,
      'quotas': temp
    }
    this.httpservice.postData(payload, requrls.disablerouting).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        this.selectedDatas.forEach(ele2 => {
          this.schList.forEach(ele1 => {
            if (ele1.quota_id === ele2.quota_id) {
              ele1.routing_enabled = 0;
            }
          });
        });
      }
    })
  }

  remove(obj, i) {
    this.quotas.splice(i, 1);
    this.selectedDatas.splice(i, 1);
    $("#chk1" + obj.quota_id).prop("checked", false);
  }

  clearFun() {
    this.supplier.post_params = null;
  }
}
