import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Options } from 'ng5-slider';
import { LoadCountry } from '../../store/actions/tgroup.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from '../../../shared/localstore.service';
import { CommonService } from "../../../shared/common.service";
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  country: any = [];
  ctyOpt: any = [];
  source: any = [];
  req;
  age;
  proname;
  target_grp_id;
  project_id;
  grpdetails: any;
  tname: string;
  eloi: number;
  eir: number;
  creq = 100;
  overObj: any = {};
  loaded = false;
  grptype: string = localStorage.getItem('grptype');
  male = false;
  female = false;
  country_id;
  tgloaded;
  min_age;
  max_age;
  gender;
  sdatapayload;
  srcloaded = false;
  value: number;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  minValue: number;
  maxValue = 40;
  ageoptions: Options = {
    floor: 18,
    ceil: 99
  };
  agevalue = [18, 40];
  selectedLists = [];
  suggestsrc;
  action;
  minVal = 0;
  project_status;

  lastAction = this.localStoreService.getLastAction('last-action');

  constructor(
    private router: Router,
    private httpservice: HttpService,
    private store: Store<fromStore.ProjectsState>,
    private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService
  ) {
  }

  ngOnInit() {
    this.ctyOpt = [];
    this.getCountries();
    let localStoreDetail = this.localStoreService.getLocal('project', 'detail');
    this.project_id = +localStoreDetail.id;
    this.project_status = localStoreDetail.status;
    this.proname = localStoreDetail.name;
    let action = this.route.snapshot.queryParamMap.get('action');
    let localStoreTgDetail = this.localStoreService.getLocal('target-group', 'detail');
    let localStoreTgOverview = this.localStoreService.getLocal('target-group', 'overview');
    let localStoreTgCountry = this.localStoreService.getLocal('target-group', 'country');
    let localStoreTgSource = this.localStoreService.getLocal('target-group', 'source');
    let localStoreTgCount = this.localStoreService.getLocal('new-target-group', 'target-grp-count');
    this.action = action;
    if (action == 'edit') {
      if (localStoreTgCountry != null) {
        this.country = localStoreTgCountry;
      } else {
        this.getCountries();
      }
      if (localStoreTgSource != null) {
        this.source = localStoreTgSource;
      } else {
        this.generateSource(localStoreTgOverview);
      }
      this.target_grp_id = localStoreTgDetail.id;
      if (localStoreTgOverview != null) {
        this.overObj = localStoreTgOverview;
        if (this.overObj.is_editable == 0) {
          this.is_disabled = true;
        } else {
          this.is_disabled = false;
        }
        this.agevalue = [localStoreTgOverview.min_age, localStoreTgOverview.max_age];
        this.country_id = [localStoreTgOverview.country_id];
        if (localStoreTgOverview.gender === 0) {
          this.male = true;
          this.female = true;
        }
        if (localStoreTgOverview.gender === 1) {
          this.male = true;
          this.female = false;
        }
        if (localStoreTgOverview.gender === 2) {
          this.male = false;
          this.female = true;
        }
        // this.generateSource(localStoreTgOverview);
      } else {
        this.getTargetData(this.target_grp_id);
        // this.generateSource(localStoreTgOverview, false);
      }
    } else {
      console.log(localStoreTgCount);
      this.overObj.name = this.proname + ' ' + 'TargetGroup' + ' ' +  (localStoreTgCount === undefined ? 1 : +localStoreTgCount + 1);
      let localStoreTgDetail = this.localStoreService.getLocal('target-group', 'detail');
      if (localStoreTgDetail != undefined) {
        this.target_grp_id = localStoreTgDetail.id;
      }
      if (localStoreTgOverview != null) {
        this.overObj = localStoreTgOverview;
        this.agevalue = [localStoreTgOverview.min_age, localStoreTgOverview.max_age];
        this.country_id = [localStoreTgOverview.country_id];
        if (localStoreTgOverview.gender === 0) {
          this.male = true;
          this.female = true;
        }
        if (localStoreTgOverview.gender === 1) {
          this.male = true;
          this.female = false;
        }
        if (localStoreTgOverview.gender === 2) {
          this.male = false;
          this.female = true;
        }
        // this.generateSource(localStoreTgOverview);
      } else {
        // this.getTargetData(this.target_grp_id);
        // this.generateSource(localStoreTgOverview, false);
      }
      if (localStoreTgSource != null) {
        this.source = localStoreTgSource;
      } else {
        this.generateSource(localStoreTgOverview);
      }
    }
  }

  // Get Countries
  getCountries() {
    this.store.select(fromStore.getCountryLoaded).subscribe(state => {
      if (state) {
        this.store.select(fromStore.getCountry).subscribe(state => {
          if (state) {
            this.country = state.map(option => ({
              value: option.id,
              label: option.name
            }));
            this.localStoreService.setLocal('target-group', 'country', this.country);
          }
        });
      } else {
        this.store.dispatch(new LoadCountry());
      }
    });
  }

  addToList(obj, status) {
    this.flag = true;
    if (this.source.length > 0) {
      const index = this.source.indexOf(obj);
      if (status) {
        this.source[index].is_selected = 1;
      } else {
        this.source[index].is_selected = 0;
      }
    }
  }

  is_disabled = false;
  // Get Target Group Details
  getTargetData(id) {
    this.tgloaded = false;
    const payload = { 'target_group_id': id };
    // this.store.dispatch(new viewGroup(payload));
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.viewtargetgroup).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.overObj = response.data;
        if (this.overObj.is_editable == 0) {
          this.is_disabled = true;
        } else {
          this.is_disabled = false;
        }
        this.overObj['project_id'] = this.project_id;
        this.generateSource(this.overObj);
        this.country_id = [response.data.country_id];
        if (this.overObj.gender === 0) {
          this.male = true;
          this.female = true;
        }
        if (this.overObj.gender === 1) {
          this.male = true;
          this.female = false;
        }
        if (this.overObj.gender === 2) {
          this.male = false;
          this.female = true;
        }
        this.localStoreService.setLocal('target-group', 'overview', response.data);
        this.setQuotaDetails(id, this.overObj);
        localStorage.setItem('changed', 'true');
      }
    })
  }

  coutryId;
  onSubmitClik(formVal, imgid, lodimgid) {
    if (this.overObj.is_editable == 0) {
      if (this.flag) {
        this.onSubmit(this.overObj, imgid, lodimgid);
        return;
      }
      let action = this.route.snapshot.queryParamMap.get('action');
      let obj = {
        'newPage': 'project/target-groups/region',
        'editPage': 'project/target-groups/region',
      }
      this.cs.locatePage(obj, action);
      return;
    }
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    let dropChkArray = [];
    dropChkArray = [{
      value: formVal.value.country_id,
      key: 'country_id'
    }
    ];
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (formVal.value.male || formVal.value.female) {
      this.coutryId = false;
    } else {
      this.coutryId = true;
      return;
    }
    if (dropChk.length != 0) {
    } else {
      if (formVal.form.valid == true) {
        this.onSubmit(formVal.value, imgid, lodimgid);
      }
    }
  }

  flag = false;

  updateField() {
    this.flag = true;
  }

  // Get Sources
  getSourcesData(f) {
    this.flag = true;
    if (this.country_id != undefined) {
      this.coutryId = false;
    }
    let gen;
    if (!f.valid) return;
    localStorage.setItem('changed', 'true');
    if (f.value.male !== undefined || f.value.female !== undefined) {
      if (f.value.male === true || f.value.female === true) {
        if (f.value.country_id != undefined
          && f.value.estimated_ir != undefined
          && f.value.estimated_loi != undefined
          && f.value.completes_required != undefined
          && (f.value.male || f.value.female)) {
          if (f.value.male === true) {
            gen = '1';
          }
          if (f.value.female === true) {
            gen = '2';
          }
          if (f.value.male === true && f.value.female === true) {
            gen = '0';
          }
          const payload = {
            'country_id': f.value.country_id,
            'estimated_ir': f.value.estimated_ir,
            'estimated_loi': f.value.estimated_loi,
            'completes_required': f.value.completes_required,
            'min_age': f.value.min_age,
            'max_age': f.value.max_age,
            'gender': gen,
            'project_id': this.project_id,
            'target_group_id': this.target_grp_id == null ? null : this.target_grp_id
          };
          this.loaded = true;
          let timer = 1000;
          setTimeout(() => {
            this.generateSource(payload);
          }, timer)
          this.srcloaded = true;
        }
      }
    }
  }

  generateSource(payload) {
    if (payload == undefined) return;
    this.source = [];
    this.httpservice.postData(payload, requrls.quotafeasibility).subscribe(res => {
      let response = res;
      if (response.success) {
        let source: any = Object.values(response.data.data[0].feasible);
        if (source.length > 0) {
          this.source = source;
          let action = this.route.snapshot.queryParamMap.get('action');
          if (action == 'edit') {
            this.localStoreService.setLocal('target-group', 'source', this.source);
          }
        }

        this.loaded = false;
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
      this.srcloaded = false;
    })
  }

  onSubmit(f, imgid, lodimgid) {
    let gender;
    if (f.male === true) {
      gender = 1;
    }
    if (f.female === true) {
      gender = 2;
    }
    if (f.male === true && f.female === true) {
      gender = 0;
    }
    let action = this.route.snapshot.queryParamMap.get('action');
    const payload = {
      'name': f.name,
      'country_id': typeof f.country_id == "object" ? +f.country_id[0] : +f.country_id,
      'estimated_ir': f.estimated_ir,
      'estimated_loi': f.estimated_loi,
      'completes_required': f.completes_required,
      'min_age': action == 'edit' ? this.overObj.min_age : f.min_age,
      'max_age': action == 'edit' ? this.overObj.max_age : f.max_age,
      'project_id': this.project_id,
    };
    if (this.overObj.is_editable == 0) {
      payload['gender'] = this.overObj.gender;
    } else {
      payload['gender'] = gender
    }
    if (f.estimated_loi <= 0) {
      this.toastr.error('Length of Interview should be greater than 0');
      return;
    }
    if (f.estimated_ir <= 0) {
      this.toastr.error('Estimated Incidence should be greater than 0');
      return;
    }
    if (this.target_grp_id != null) {
      if (!this.flag) {
        let action = this.route.snapshot.queryParamMap.get('action');
        let obj = {
          'newPage': 'project/target-groups/region',
          'editPage': 'project/target-groups/region',
        }
        this.cs.locatePage(obj, action);
      } else {
        this.updateTargetGrpOverview(payload, imgid, lodimgid);
      }
    } else {
      this.createGroup(payload, imgid, lodimgid);
    }
  }

  updateTargetGrpOverview(payload, imgid, lodimgid) {
    payload['target_group_id'] = this.target_grp_id;
    payload['is_delete_quotas'] = 1;
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(payload, requrls.updatetargetgroup).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        const updatesourcepayload = {
          'target_group_id': this.target_grp_id,
          'sources': this.source.filter(res => {
            if (res.is_selected == 1) {
              return res;
            }
          }).map(res => {
            return res.panel_id;
          })
        };
        this.updateSource(updatesourcepayload, imgid, lodimgid);
        payload.sources = this.source.filter(res => {
          if (res.is_selected == 1) {
            return res;
          }
        }).map(res => {
          return res.panel_id;
        })
        this.localStoreService.setLocal('target-group', 'overview', payload);
        this.setQuotaDetails(this.target_grp_id, payload);
      } else {
        this.toastr.error(response.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  createGroup(payload, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(payload, requrls.createtargetgroup).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        let target_group_id = response.data.id;
        let obj = {
          'id': response.data.id,
          'name': response.data.name
        }
        this.localStoreService.setLocal('target-group', 'detail', obj);
        payload['target_group_id'] = target_group_id;
        payload['sources'] = this.source.filter(res => {
          if (res.is_selected == 1) {
            return res;
          }
        }).map(res => {
          return res.panel_id;
        })
        this.localStoreService.setLocal('target-group', 'overview', payload);
        const updatesourcepayload = {
          'target_group_id': response.data.id,
          'sources': this.source.filter(res => {
            if (res.is_selected == 1) {
              return res;
            }
          }).map(res => {
            return res.panel_id;
          })
        };
        this.updateSource(updatesourcepayload, imgid, lodimgid);
        this.setQuotaDetails(this.target_grp_id, payload);
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  updateSource(updatesourcepayload, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(updatesourcepayload, requrls.updatesource).subscribe(res => {
      let response = res;
      if (res.success) {
        this.localStoreService.setLocal('target-group', 'source', this.source);
        let action = this.route.snapshot.queryParamMap.get('action');
        let obj = {
          'newPage': 'project/target-groups/region',
          'editPage': 'project/target-groups/region',
        }
        this.cs.locatePage(obj, action);
      } else {
        this.toastr.error(response.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  setQuotaDetails(id, payload) {
    let obj = {
      'target-group-id': id,
      'gender': payload.gender,
      'age': payload.min_age + ',' + payload.max_age,
      'req-com': payload.completes_required
    }
    this.localStoreService.setLocal('target-group', 'quota', obj);
  }

}
