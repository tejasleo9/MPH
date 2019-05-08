import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { CommonService } from "app/shared/common.service";
import { ToastrService } from "ngx-toastr";
import { LocalstoreService } from "../../../shared/localstore.service";
import * as _ from 'lodash';
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: "app-exclusion",
  templateUrl: "./exclusion.component.html",
  styleUrls: ["./exclusion.component.css"]
})
export class ExclusionComponent implements OnInit {
  proname;
  exclusionList = [];
  selected = [];
  exclusionType: number = 0;
  exlFilter: any = {};
  listLoaded$;
  ifError: boolean = false;
  ifSucc: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";
  project_id;
  target_grp_id;
  action;
  source = [];
  srcloaded;
  include = [];
  exclude = [];
  lastAction = this.localStoreService.getLastAction("last-action");
  includeOrExclude: boolean = true;
  isShow = false;
  projectStatuses = [];
  projectObj: any = {};
  projectStatus = [];
  includestatus;
  excluderesstatus;
  includest = [];
  excludest = [];
  selectedLists = [];
  project_status;
  is_disabled = false;
  is_editable;

  is_included_or_excluded = [];
  temp_array_ex = [];
  temp2_array_ex = [];

  temp_array_proj = [];
  projectList = [];
  callFrom = 'list';

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cs: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService
  ) { }

  getExclusionList(payload) {
    this.spinnerService.show();
    this.httpservice.postData(payload == null ? {} : payload, requrls.exclusionlist).subscribe(res => {
      let response = res;
      if (response.success !== 2313) {
        this.exclusionList = response.data.data;
        this.exclusionList.map(res => {
          if (res.is_selected === 1) {
            this.selected.push(res);
            this.is_included_or_excluded.push(res);
          }
        });
        this.is_editable = response.data.is_editable;
        if (this.is_editable === 0) {
          this.is_disabled = true;
        } else {
          this.is_disabled = false;
        }
        this.localStoreService.setLocal("target-group", "exclusion", [
          response.data.data,
          this.is_editable
        ]);
      } else {
        setTimeout(() => {
          this.toastr.error(response.message);
        }, 500);
      }
      this.spinnerService.hide();
    });
  }

  getProjectList() {
    const payload = {
      select_fields:
        "id,name,start_date,completes_required,company_id,status,completion_rate"
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listproject).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectList = response.data.data;
        this.projectList.forEach(res => {
          this.projectStatuses.forEach(res2 => {
            if (res.id === res2.id) {
              res['is_visible'] = true;
            }
          });
        });
      } else {
      }
      this.spinnerService.hide();
    });
  }

  selectData(obj, status) {
    if (!this.isShow) {
      let list = [];
      // let present_index = this.is_included_or_excluded.indexOf(obj);
      let index = this.selected.indexOf(obj);
      // let temp_index = this.temp2_array_ex.indexOf(obj);
      if (status) {
        if (this.selected.indexOf(obj) != -1) {
        } else {
          obj.is_selected = 1;
          obj.type = this.exclusionType == 0 ? "include" : "exclude";
          this.selected.push(obj);
          this.temp_array_ex.push(obj);
          // if (present_index != -1 && temp_index == -1 && this.exclusionType == 0) {
          //   let t_attay = [];
          //   t_attay = [...this.selected];
          //   list = t_attay.concat(this.temp2_array_ex);
          // } else if (present_index == -1 && temp_index == -1 && this.exclusionType == 0) {
          //   list = this.selected;
          // } else if (present_index == -1 && temp_index == -1 && this.exclusionType == 1) {
          //   let t_attay = [];
          //   t_attay = [...this.temp2_array_ex];
          //   let exData = this.selected.filter(res => {
          //     if (res.type == 'exclude') {
          //       return res;
          //     }
          //   }).map(res => {
          //     return res;
          //   })
          //   list = t_attay.concat(exData);
          // }
          // let type;
          // type = this.exclusionType == 0 ? "include" : "exclude";
          list = this.selected.filter(res => {
            if (res.type === obj.type) {
              return res;
            }
          }).map(res => {
            return res.id;
          });
          this.generateSource(this.exclusionType, list);
        }
      } else {
        this.selected.splice(index, 1);
        obj.is_selected = 0;
        let type;
        type = this.exclusionType == 0 ? "include" : "exclude";
        list = this.selected.filter(res => {
          if (res.type == type) {
            return res;
          }
        }).map(res => {
          return res.id;
        });
        this.generateSource(this.exclusionType, list);
        // if (present_index != -1) {
        //   this.temp2_array_ex.splice(temp_index, 1);
        //   if (index != -1 && temp_index != -1) {
        //     list = this.selected;
        //   } else if (index != -1 && temp_index == -1) {
        //     list = this.selected;
        //   }
        // } else {
        //   list = this.selected;
        // }
        // this.generateSource(this.exclusionType, list);
      }
    } else {
      let index = this.projectStatuses.indexOf(obj);
      if (status) {
        let temp_obj: any = {};
        temp_obj = obj;
        temp_obj['is_selected'] = 1;
        temp_obj['type'] = this.exclusionType === 0 ? "include" : "exclude";
        // temp_obj.is_visible = true;
        let found = false;
        this.projectStatuses.forEach(res => {
          if (res.id !== obj.id) {
            found = true;
          } else {
            found = false;
          }
        });
        if (this.exclusionType === 0 && this.includest.length > 0) {
          temp_obj['statuses'] = this.includest;
        } else if (this.exclusionType === 1 && this.excludest.length > 0) {
          temp_obj['statuses'] = this.excludest;
        }
        this.projectStatuses.push(temp_obj);
      } else {
        // obj.is_visible = false;
        this.projectStatuses.splice(index, 1);
      }
      if (this.exclusionType === 0 && this.includest.length > 0) {
        this.generateProjectSource(this.exclusionType, this.projectStatuses);
      } else if (this.exclusionType === 1 && this.excludest.length > 0) {
        this.generateProjectSource(this.exclusionType, this.projectStatuses);
      }
    }
  }

  generateSource(type, list) {
    this.source = [];
    this.srcloaded = true;
    let exList = {};
    exList["type"] = type;
    exList["list"] = list;
    let payloadData = {
      target_group_id: this.target_grp_id,
      exclusion_list: exList
    };
    this.httpservice.postData(payloadData, requrls.quotafeasibility).subscribe(res => {
      let response = res;
      if (response.success) {
        let source = Object.values(response.data.data[0].feasible);
        if (source.length > 0) {
          this.source = source;
        }
        this.spinnerService.hide();
      } else {
        this.toastr.error(response.message);
      }
      this.srcloaded = false;
    });
  }

  onIncludeSelected(data, status) {
    if (status) {
      this.includest.push(data);
    } else {
      let index = this.includest.indexOf(data);
      this.includest.splice(index, 1);
    }
    // if (this.temp_array_proj.length > 0) {
    this.projectStatuses.forEach((res2, index) => {
      if (index >= this.temp_array_proj.length && res2.type === "include") {
        res2['statuses'] = this.includest;
      }
    });
    // } else {

    // }
    // if (this.includest.length > 0) {
    this.generateProjectSource(this.exclusionType, this.projectStatuses);
    // }
  }

  onExcludeSelected(data, status) {
    if (status) {
      this.excludest.push(data);
    } else {
      let index = this.excludest.indexOf(data);
      this.excludest.splice(index, 1);
    }
    // if (this.temp_array_proj.length > 0) {
    this.projectStatuses.forEach((res2, index) => {
      if (index >= this.temp_array_proj.length && res2.type === "exclude") {
        res2['statuses'] = this.excludest;
      }
    });
    // }
    // if (this.excludest.length > 0) {
    this.generateProjectSource(this.exclusionType, this.projectStatuses);
    // }
  }

  generateProjectSource(type, list) {
    this.source = [];
    this.srcloaded = true;
    // let exType = type == 0 ? "include" : "exclude";
    // let exList = {};
    // exList['type'] = type;
    // exList['projects'] = this.projectStatuses.filter(res => {
    //   if (res.is_selected === 1 && res.type === exType) {
    //     return res;
    //   }
    // }).map(res => {
    //   return res.id;
    // });
    // exList['response_status'] = this.projectStatuses.filter(res => {
    //   if (res.is_selected === 1 && res.type === exType) {
    //     return res;
    //   }
    // }).map(res => {
    //   return res.statuses.map(res2 => {
    //     return res2.value;
    //   });
    // });
    // let payloadData = {
    //   target_group_id: this.target_grp_id,
    //   project_exclusion: exList
    // };
    let typee = this.exclusionType === 0 ? "include" : "exclude";
    let payload: any = {
      target_group_id: this.target_grp_id,
      exclusion_type: this.exclusionType,
      project_statuses: this.projectStatuses
        .filter(res => {
          if (res.is_selected === 1 && res.type === typee) {
            return res;
          }
        })
        .map(option => ({
          project_id: option.id,
          response_status: option.statuses.map(res => {
            return res.value;
          })
        }))
    };
    payload.project_statuses.forEach((res, index) => {
      // const index =  payload.project_statuses.indexOf(res);
      if (res.response_status.length === 0) {
        payload.project_statuses.splice(index, 1);
        if (index == 0) {
          payload.project_statuses.splice(0, 1);
        }
      }
    });
    this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
      let response = res;
      if (response.success) {
        let source = Object.values(response.data.data[0].feasible);
        if (source.length > 0) {
          this.source = source;
        }
        this.spinnerService.hide();
      } else {
        this.toastr.error(response.message);
      }
      this.srcloaded = false;
    });
  }

  addToList(obj, status) {
    if (this.source.length > 0) {
      const index = this.source.indexOf(obj);
      if (status) {
        this.source[index].is_selected = 1;
      } else {
        this.source[index].is_selected = 0;
      }
    }
  }

  getExclusionType(Exclusiontype) {
    this.exclusionType = Exclusiontype;
    this.selected.forEach((res, ind) => {
      let index = this.is_included_or_excluded.indexOf(res);
      if (index == -1) {
        res.is_selected = false;
        res.type = null;
        let index = this.temp_array_ex.indexOf(res);
        this.temp_array_ex.splice(index, 1);
        this.selected.splice(ind, 1);
      } else {
        let index = this.exclusionList.indexOf(res);
        this.exclusionList[index] = res;
      }
    });
    this.temp2_array_ex = [...this.is_included_or_excluded];
    if (Exclusiontype === 0) {
      this.includeOrExclude = true;
    } else {
      this.includeOrExclude = false;
    }
  }

  getData(call) {
    let action = this.route.snapshot.queryParamMap.get("action");
    let localStoreTgExclusion = this.localStoreService.getLocal(
      "target-group",
      "exclusion"
    );
    if (call === "list") {
      this.callFrom = 'list';
      if (localStoreTgExclusion != undefined) {
        this.exclusionList = localStoreTgExclusion[0];
        let is_editable = localStoreTgExclusion[1];
        if (is_editable === 0) {
          this.is_disabled = true;
        } else {
          this.is_disabled = false;
        }
      } else {
        let payload = {
          target_group_id: this.target_grp_id
        };
        this.getExclusionList(action === "edit" ? payload : {});
      }

      this.isShow = false;
    } else {
      this.isShow = true;
      this.callFrom = 'project';
      this.getProjectList();
    }
  }

  getProjectWithStatus() {
    let payload = {
      target_group_id: this.target_grp_id
    };
    this.httpservice.postData(payload, requrls.trggrpwithstatus).subscribe(res => {
      let response = res;
      let temp = [];
      this.exclusionType === 0 ? "include" : "exclude";
      if (response.success) {
        let data = response.data.data;
        if (data === undefined) return;
        response.data.data.forEach(element => {
          element["value"] = [];
        });
        setTimeout(() => {
          data.forEach(element1 => {
            if (element1 != null) {
              let type = element1.exclusion_type === 0 ? "include" : "exclude";
              element1.exclusion_type = type;
              element1.response_status.forEach(element2 => {
                this.projectStatus.filter(res => {
                  if (res.value === element2) {
                    element1.value.push(res);
                  }
                });
              });
              temp.push(element1);
            }
          });
          temp.forEach(ele => {
            if (ele) {
              ele["name"] = ele.project_name;
              ele["id"] = ele.project_id;
              ele["type"] = ele.exclusion_type;
              ele["statuses"] = ele.value;
              ele["is_selected"] = 1;
              this.projectStatuses.push(ele);
            }
          });
          this.generateProjectSource(this.exclusionType, this.projectStatuses);
          this.temp_array_proj = [...this.projectStatuses];
        }, 1000);
      }
    });
  }

  saveExclusion(txtId, imgId) {
    let action = this.route.snapshot.queryParamMap.get("action");
    let type = this.exclusionType === 0 ? "include" : "exclude";
    if (this.isShow) {
      if (this.action == 'new' && this.projectStatuses.length === 0) {
        this.toastr.error("Please select Data!");
        return;
      }
      if (type == 'include' && this.includest.length == 0) {
        this.toastr.error("please select response status");
        return;
      } else if (type == 'exclude' && this.excludest.length == 0) {
        this.toastr.error("please select response status");
        return;
      }
      let payload = {
        target_group_id: this.target_grp_id,
        exclusion_type: this.exclusionType,
        project_statuses: this.projectStatuses
          .filter(res => {
            if (res.is_selected === 1 && res.type === type) {
              return res;
            }
          })
          .map(option => ({
            project_id: option.id,
            response_status: option.statuses.map(res => {
              return res.value;
            })
          }))
      };
      this.cs.hideshowImge(txtId, imgId, "a");
      this.httpservice.postData(payload, requrls.savetrggrpwithstatus).subscribe(res => {
        let response = res;
        if (response.success) {
          this.projectList.forEach(res => {
            this.projectStatuses.forEach(res2 => {
              if (res.id === res2.id) {
                res['is_visible'] = true;
              }
            });
          });
          this.excluderesstatus = [];
          this.includestatus = [];
          this.includest = [];
          this.excludest = [];
          this.toastr.success(response.message);
          this.temp_array_proj = [...this.projectStatuses];
          this.localStoreService.setLocal('target-group', 'source', this.source);
        } else {
          this.toastr.error(response.message);
        }
        this.cs.hideshowImge(txtId, imgId, "i");
      });
      return;
    }
    if (this.action == 'new' && this.selected.length === 0) {
      this.toastr.error("Please select Data!");
      return;
    }
    const payload = {
      target_group_id: +this.target_grp_id,
      exclusion_type: +this.exclusionType,
      exclusion_lists: this.selected
        .filter(res => {
          if (res.is_selected === 1 && res.type === type) {
            return res;
          }
        })
        .map(res => {
          return res.id;
        })
    };
    this.cs.hideshowImge(txtId, imgId, "a");
    this.httpservice.postData(payload, requrls.savetrggrpexlist).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        this.localStoreService.setLocal("target-group", "exclusion", [
          this.exclusionList,
          this.is_editable
        ]);
        this.is_included_or_excluded = [...this.selected];
        this.localStoreService.setLocal('target-group', 'source', this.source);
        this.temp_array_ex = [];
        this.action = "edit";
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(txtId, imgId, "i");
    });
  }

  previous() {
    this.router.navigate(["/project/target-groups/profile"], {
      queryParams: { action: this.action }
    });
  }

  next() {
    this.router.navigate(["/project/target-groups/quota"], {
      queryParams: { action: this.action }
    });
  }

  remove(index, obj) {
    if (this.temp_array_proj.length === 0) {
      this.projectList.forEach(res => {
        if (res.project_id === obj.id) {
          res['is_visible'] = false;
          res.is_selected = 0;
          res.statuses = null;
        }
      });
      this.projectStatuses.splice(index, 1);
      this.generateProjectSource(this.exclusionType, this.projectStatuses);
      return;
    }
    this.excluderesstatus = null;
    this.includestatus = null;
    let projectWithStatus = this.projectStatuses.splice(index, 1);
    let type = this.exclusionType === 0 ? "include" : "exclude";
    let payload = {};
    if (projectWithStatus.length === 0) {
      payload = {
        target_group_id: this.target_grp_id,
        exclusion_type: this.exclusionType,
        project_statuses: []
      };
    } else {
      payload = {
        target_group_id: this.target_grp_id,
        exclusion_type: this.exclusionType,
        project_statuses: this.projectStatuses
          .filter(res => {
            if (res.is_selected === 1 && res.type === type) {
              return res;
            }
          })
          .map(option => ({
            project_id: option.id,
            response_status: option.value.map(res => {
              return res.value;
            })
          }))
      };
    }
    this.httpservice.postData(payload, requrls.savetrggrpwithstatus).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectList.forEach(res => {
          if (res.project_id === obj.id) {
            res['is_visible'] = false;
            res.is_selected = 0;
            res.statuses = null;
          }
        })
        this.temp_array_proj = [...this.projectStatuses];
        // this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
    return;
  }

  getResponseStatus() {
    this.httpservice.postData({}, requrls.responsestatus).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectStatus = response.data.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
        this.toastr.error(response.message);
      }
    });
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
    let localStoreTgExclusion = this.localStoreService.getLocal(
      "target-group",
      "exclusion"
    );
    let localStoreTgProjectStatus = this.localStoreService.getLocal(
      "target-group",
      "project-status"
    );
    this.localStoreService.setLocal(
      "target-group",
      "project-status",
      this.projectStatus
    );
    if (localStoreTgDetail === undefined) {
      setTimeout(() => {
        this.toastr.error("Please create Target group");
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    let localStoreTgSource = this.localStoreService.getLocal(
      "target-group",
      "source"
    );

    if (localStoreTgSource != null) {
      this.source = localStoreTgSource;
    }
    if (localStoreTgExclusion != undefined) {
      this.exclusionList = localStoreTgExclusion[0];
      this.exclusionList.map(res => {
        if (res.is_selected === 1) {
          this.selected.push(res);
        }
      });
      this.selected.forEach(res => {
        let index = this.is_included_or_excluded.indexOf(res);
        if (index != -1) {
        } else {
          if (res.is_selected == 1) {
            this.is_included_or_excluded.push(res);
          }
        }
      });
      this.temp2_array_ex = [...this.is_included_or_excluded];
      this.temp_array_ex = [];
      let is_editable = localStoreTgExclusion[1];
      if (is_editable == 0) {
        this.is_disabled = true;
      } else {
        this.is_disabled = false;
      }
    } else {
      this.getData("list");
    }
    // if (localStoreTgProjectStatus != undefined) {
    //   this.projectStatus = localStoreTgProjectStatus;
    // } else {
    //   this.getResponseStatus();
    // }
    this.getProjectWithStatus();
    this.getResponseStatus();
    $(function () {
      $("#datepicker")
        .datepicker({
          autoclose: true,
          todayHighlight: true
        })
        .datepicker("update", new Date());
    });
  }
}
