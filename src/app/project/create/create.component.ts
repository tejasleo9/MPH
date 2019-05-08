import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from "../store";
import { LoadIndustry, LoadCategory } from "../store/actions/industry.actions";
import { getprojectstats } from "../store/actions/getprostats.actions";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ShareDataService } from "../../shared/share-data.service";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../shared/common.service";
import { LocalstoreService } from "../../shared/localstore.service";
import { LoadProjects } from "../store";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from '../store/requrl';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  industries: any = [];
  categories: any = [];
  indOpt: any = [];
  catOpt: any = [];
  rtype: any = [];
  message: string = "";
  prodetails: any = {};
  project_id;
  redirect_links;
  redirectUrl: any = {};
  indid;
  catid;
  retyid;
  disabled = false;
  loader: boolean = false;
  redirectLinks = false;
  proname;
  rid;
  cid;
  //summery
  payload;
  pricingTableRes: any = [];
  total_current_cost = 0;
  pricingTableShow = false;

  projStatsRes: any = [];
  projStatsShow = false;
  projstat = [];

  TgQuotasRes: any = [];
  TgQuotasShow = false;
  project_status;

  constructor(
    private store: Store<fromStore.ProjectsState>,
    private httpservice: HttpService,
    private router: Router,
    public route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private _shareData: ShareDataService,
    private toastr: ToastrService,
    private cs: CommonService,
    private localStoreService: LocalstoreService
  ) {
    this._shareData.listen().subscribe((m: any) => {
      this.ngOnInit();
    });
  }

  summaryBtn: boolean;
  hideShow: boolean;
  action;
  lastAction = this.localStoreService.getLastAction("last-action");

  quotas = [];
  targetGrp = '';

  ngOnInit() {
    this.project_id = null;
    let action = this.route.snapshot.queryParamMap.get("action");
    this.action = action;
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    if (action == "edit") {
      if (localStoreDetail != undefined) {
        this.summaryBtn = true;
        this.project_status = localStoreDetail.status;
        if (localStoreDetail.status == 1 || localStoreDetail.status == 4) {
          this.hideShow = false;
          this.payload = { project_id: localStoreDetail.id };
          this.projStatsShow = true;
          this.projStatsFn();
          this.pricingTableFn();
          this.TgQuotasShow = true;
          this.getTgQuotasFn();
        } else {
          this.summaryBtn = false;
          this.hideShow = true;
        }
      }
      this.redirectLinks = true;
      let localStoreOverview = this.localStoreService.getLocal(
        "project",
        "overview"
      );
      let localStoreIndustry = this.localStoreService.getLocal(
        "project",
        "industry"
      );
      let localStoreCategory = this.localStoreService.getLocal(
        "project",
        "category"
      );
      this.project_id = +localStoreDetail.id;
      this.proname = localStoreDetail.name;
      if (localStoreOverview == undefined) {
        this.getIndustry();
        this.getDetails(localStoreDetail.id);
      } else {
        if (localStoreIndustry != null) {
          this.indOpt = localStoreIndustry;
        } else {
          this.getIndustry();
        }
        if (localStoreCategory != null) {
          this.catOpt = localStoreCategory;
        }
        this.getDetails(this.project_id);
      }
    } else {
      this.hideShow = true;
      this.summaryBtn = false;
      this.redirectLinks = false;
      let localStoreOverview = this.localStoreService.getLocal(
        "project",
        "overview"
      );
      let localStoreIndustry = this.localStoreService.getLocal(
        "project",
        "industry"
      );
      let localStoreCategory = this.localStoreService.getLocal(
        "project",
        "category"
      );
      if (localStoreOverview != undefined) {
        if (localStoreIndustry != undefined) {
          this.indOpt = localStoreIndustry;
        } else {
          this.getIndustry();
        }
        if (localStoreCategory != undefined) {
          this.catOpt = localStoreCategory;
        }
        if (localStoreOverview != undefined && localStoreDetail != undefined) {
          this.redirectLinks = true;
          this.prodetails = localStoreDetail;
          this.indid = [localStoreOverview.research_industry_id];
          this.catid = [localStoreOverview.research_category_id];
          this.redirectUrl = localStoreOverview.redirect_links;
        }
      } else {
        this.getIndustry();
      }
    }
  }

  getIndustry() {
    let industry = [];
    this.store.select(fromStore.getAllIndustryLoaded).subscribe(state => {
      if (state) {
        this.store.select(fromStore.getAllIndustry).subscribe(state => {
          if (state) {
            this.indOpt = state.map(option => ({
              value: option.id,
              label: option.industry_name
            }));
            this.localStoreService.setLocal("project", "industry", this.indOpt);
          }
        });
      } else {
        this.store.dispatch(new LoadIndustry());
      }
    });
  }

  getDetails(id) {
    const payload = {
      project_id: id
    };
    this.store.dispatch(new getprojectstats(payload));
    this.spinnerService.show();
    this.store.select<any>(fromStore.getprodetails).subscribe(state => {
      this.localStoreService.setLocal("project", "overview", state);
      this.prodetails = state;
      console.log(this.prodetails);
    });
    this.store.select<any>(fromStore.getprodetailsLoaded).subscribe(state => {
      if (state) {
        if (this.prodetails.redirect_links != undefined) {
          this.redirectUrl = this.prodetails['redirect_links'];
          this.indid = [this.prodetails.research_industry_id];
          this.retyid = 0;
          if (this.indid != null) {
            this.getCategory({ value: this.indid[0] });
          }
        }
        this.spinnerService.hide();
      }
    });
  }

  getCategory(e) {
    this.loader = true;
    const payload = { industry_id: e.value };
    this.httpservice.postData(payload, requrls.getresearchcategories).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.catOpt = response.data.map(option => ({
          value: option.id,
          label: option.name
        }));
        this.catid = [this.prodetails.research_category_id];
        this.localStoreService.setLocal("project", "category", this.catOpt);
      } else {
        this.toastr.error(response.message);
      }
      this.loader = false;
    });
  }

  redirect(call) {
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    if (localStoreDetail != undefined) {
      if (call == "tg" && localStoreDetail.id != null) {
        this.router.navigate(["project/target-groups"], {
          queryParams: { action: this.lastAction }
        });
      } else if (call == "sch" && localStoreDetail.id != null) {
        this.router.navigate(["project/scheduling"], {
          queryParams: { action: this.lastAction }
        });
      } else {
        return;
      }
    } else {
      if (call == "tg" && this.project_id != null) {
        this.router.navigate(["project/target-groups"], {
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
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    let action = this.route.snapshot.queryParamMap.get("action");
    if (this.project_status == 1) {
      if (action == "new") {
        this.router.navigate(["project/target-groups/overview"], {
          queryParams: { action: "new" }
        });
      } else {
        this.router.navigate(["project/target-groups"], {
          queryParams: { action: "edit" }
        });
      }
      return;
    }
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    // debugger
    let val =
      typeof formVal.form.value["catid"] == "object"
        ? formVal.form.value["catid"][0]
        : formVal.form.value["catid"];
    if (val === undefined) {
      this.cid = true;
    } else {
      this.cid = false;
    }
    let val2 =
      typeof formVal.form.value["indid"] == "object"
        ? formVal.form.value["indid"][0]
        : formVal.form.value["indid"];
    if (val2 === undefined) {
      this.rid = true;
    } else {
      this.rid = false;
    }

    if (formVal.form.valid == true) {
      if (action == "new") {
        if (val === undefined || val2 === undefined) {
          return;
        } else {
          if (!formVal.form.dirty) {
            this.router.navigate(["project/target-groups"], {
              queryParams: { action: this.action }
            });
          } else {
            this.onSubmit(formVal.value, imgid, lodimgid);
          }
        }
      } else {
        if (formVal.form.dirty == true) {
          this.onUpdateSubmit(formVal.value, imgid, lodimgid);
        } else {
          this.router.navigate(["project/target-groups"], {
            queryParams: { action: "edit" }
          });
        }
      }
    } else {
      return;
    }
  }

  onSubmit(f, imgid, lodimgid) {
    const payload = {
      "name": f.pname,
      "research_category_id": typeof (f.indid) == 'object' ? +f.indid[0] : +f.indid,
      "research_industry_id": typeof (f.indid) == 'object' ? +f.indid[0] : +f.indid,
      "end_page_url_type": 0
    }
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.createproject).subscribe(res => {
      let responce = res;
      if (responce.success) {
        let obj = {
          id: responce.data.id,
          name: responce.data.name,

        };
        this.localStoreService.setLocal("project", "detail", obj);
        let project = this.localStoreService.getLocal("project", "overview");
        if (project != undefined) {
          project["research_industry_id"] =
            typeof f.indid == "object" ? +f.indid[0] : +f.indid;
          project["research_category_id"] =
            typeof f.catid == "object" ? +f.catid[0] : +f.catid;
          this.localStoreService.setLocal("project", "overview", project);
        } else {
          payload['redirect_links'] = responce.data.redirect_links;
          this.localStoreService.setLocal("project", "overview", payload);
        }
        let action = this.route.snapshot.queryParamMap.get("action");
        const projectPayload = {
          select_fields:
            "id,name,start_date,completes_required,company_id,status,completion_rate"
        };
        this.store.dispatch(new LoadProjects(projectPayload));
        if (action == "new") {
          this.router.navigate(["project/target-groups/overview"], {
            queryParams: { action: "new" }
          });
          this.redirectUrl = responce.redirect_links;
        } else {
          this.router.navigate(["project/target-groups"], {
            queryParams: { action: "edit" }
          });
        }
      } else {
        let errMeg = responce.data.name[0];
        this.toastr.error(errMeg);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  onUpdateSubmit(f, imgid, lodimgid) {
    const payload = {
      project_id: this.project_id,
      name: f.pname,
      research_category_id: typeof f.catid == "object" ? f.catid[0] : f.catid,
      research_industry_id: typeof f.indid == "object" ? f.indid[0] : f.indid,
      end_page_url_type: 0
    };
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.updateproject).subscribe(res => {
      let responce = res;
      if (responce.status_code == 200) {
        let obj = {
          id: responce.data.project_id,
          name: responce.data.name
        };

        this.localStoreService.setLocal("project", "detail", obj);
        let project = this.localStoreService.getLocal("project", "overview");
        project.research_industry_id =
          typeof f.indid == "object" ? +f.indid[0] : +f.indid;
        project.research_category_id =
          typeof f.catid == "object" ? +f.catid[0] : +f.catid;
        this.localStoreService.setLocal("project", "overview", project);

        let action = this.route.snapshot.queryParamMap.get("action");
        if (action == "new") {
          this.router.navigate(["project/target-groups/overview"], {
            queryParams: { action: "new" }
          });
        } else {
          this.router.navigate(["project/target-groups"], {
            queryParams: { action: "edit" }
          });
        }
      } else {
        let errMeg = responce.message;
        this.toastr.error(errMeg);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  projStatsFn() {
    this.httpservice.postData(this.payload, requrls.projectcomstats).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.projStatsRes = res.data;
        this.projstat = Object.keys(res.data);
        this.projStatsShow = true;
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  pricingTableFn() {
    this.httpservice.postData(this.payload, requrls.projectcostdetails).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.pricingTableRes = Object.values(res.data);
        this.pricingTableRes.forEach(element => {
          this.total_current_cost += element.current_cost;
        });
        this.pricingTableShow = true;
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  getTgQuotasFn() {
    this.httpservice.postData(this.payload, requrls.targetgrpquotastats).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.TgQuotasRes = res.data;
        this.TgQuotasShow = true;
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  changeTargetGrp(trggrp) {
    this.quotas = trggrp.quotas;
  }

  editOverview(call) {
    if (call == "overview") {
      this.hideShow = true;
    } else {
      this.hideShow = false;
    }
  }
}
