import { Component, OnInit } from "@angular/core";
declare var $: any;
import { HeaderComponent } from "../../../core/header/header.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from "../../../../app/shared/common.service";
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from "../../../shared/localstore.service";
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: "app-region",
  templateUrl: "./region.component.html",
  styleUrls: ["./region.component.css"],
  providers: [HeaderComponent]
})
export class RegionComponent implements OnInit {
  locationMstr = [];
  locationValue = [];
  ctryid;
  target_grp_id;
  locValueName = "";
  LocValShow = false;
  proname;
  regionFilter: any = {};
  selectedDatas = [];
  selectedRegion = [];
  loaded: boolean = false;
  project_id;
  mapId;
  selRegion;
  map_id;
  action;
  project_status;
  lastAction = this.localStoreService.getLastAction('last-action');
  is_disabled = false;
  is_show = false;

  source = [];
  srcloaded;

  flag = false;

  selectedLists = [];

  constructor(
    private httpservice: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private cs: CommonService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService
  ) { }


  ngOnInit() {
    let localStoreDetail = this.localStoreService.getLocal("project", "detail");
    this.project_status = localStoreDetail.status;
    setTimeout(() => {
      this.is_show = true;
    }, 500);
    this.getData();
    console.log(this.selRegion);
  }

  getRegionList() {
    const payload = {
      'country_id': this.ctryid
    };
    this.httpservice.postData(payload, requrls.getlocationmaster).subscribe(res => {
      let response = res;
      if (response.success) {
        if (response.data.data !== undefined) {
          this.locationMstr = response.data.data;
        } else {
          this.locationMstr = [];
        }
        console.log(response);
        this.localStoreService.setLocal('target-group', 'locations', this.locationMstr);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  getRegionData() {
    this.map_id = null;
    const payload = {
      'target_group_id': +this.target_grp_id
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.viewtargetgrpregion).subscribe(res => {
      const response = res;
      console.log(Object.values(response.data).length);
      if (response.success) {
        console.log(Object.values(response.data));
        // if (response.data.length === 0) return;
        if (Object.values(response.data).length === 1) {
          if (response.data.is_editable === 1) {
            this.is_disabled = false;
          } else {
            this.is_disabled = true;
          }
        } else {
          const data: any = Object.values(response.data)[1];
          console.log(Object.values(response.data)[1]);
          if (data.is_editable === 0) {
            this.is_disabled = true;
          } else {
            this.is_disabled = false;
          }
        }
        if (response.data[1] !== undefined) {
          this.selRegion = response.data[1].region_type;
          this.map_id = response.data[1].region_type;
        }
        console.log(this.selRegion);
        this.LocValShow = true;
        this.loaded = false;
        if (response.data[1] !== undefined) {
        this.locationValue = response.data[0];
        setTimeout(() => {
          this.localStoreService.setLocal('regions', 'selected', this.locationValue);
          this.locationValue.forEach(element => {
            if (element.is_checked === 1) {
              this.selectedDatas.push(element);
            }
          });
        }, 1000);
// this.localStoreService.setLocal('target-group', 'locations-selected', [this.map_id, this.locationValue, response.data[1].is_editable]);
        }
        if (this.selectedDatas.length == 0) return;
        this.generateSource(this.selectedDatas);
      }
    });
    this.spinnerService.hide();
  }

  locationValueFn(x) {
    this.map_id = x;
    this.selectedDatas = [];
    if (x == 1) {
      this.locValueName = "Region";
    } else if (x == 2) {
      this.locValueName = "State";
    } else if (x == 3) {
      this.locValueName = "City";
    }
    const payload = {
      country_id: this.ctryid,
      location_country_map_id: this.map_id,
      no_pagination: true
    };
    this.loaded = true;
    this.httpservice.postData(payload, requrls.getlocationvalue).subscribe(res => {
      let response = res;
      if (response.success) {
        this.LocValShow = true;
        this.loaded = false;
        this.locationValue = response.data;
        this.localStoreService.setLocal('target-group', 'locations-value', this.locationValue);
        this.locationValue.forEach(element => {
          element['is_checked'] = 0;
        });
      }
    })
  }

  updateSource(updatesourcepayload, txtid, imgid) {
    this.cs.hideshowImge(txtid, imgid, 'a');
    this.httpservice.postData(updatesourcepayload, requrls.updatesource).subscribe(res => {
      let response = res;
      if (res.success) {
        setTimeout(() => {
          this.router.navigate(['/project/target-groups/profile'], { queryParams: { action: this.action } });
        }, 1000);
      } else {
        this.toastr.error(response.message);
      }
      this.cs.hideshowImge(txtid, imgid, 'a');
    })
  }

  generateSource(payload) {
    if (payload == undefined) return;
    let localStoreTgOverview = this.localStoreService.getLocal('target-group', 'overview');
    let generateSource = { ...localStoreTgOverview }
    generateSource['location'] = payload.map(res => { return res.id })
    this.source = [];
    this.srcloaded = true;
    this.httpservice.postData(generateSource, requrls.quotafeasibility).subscribe(res => {
      let response = res;
      if (response.success) {
        let source: any = Object.values(response.data.data[0].feasible);
        if (source.length > 0) {
          this.source = source;
        }
        this.loaded = false;
        this.srcloaded = false;
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    })
  }

  getData() {
    let localStoreDetail = this.localStoreService.getLocal('project', 'detail');
    this.project_id = +localStoreDetail.id;
    this.proname = localStoreDetail.name;
    let localStoreTgDetail = this.localStoreService.getLocal('target-group', 'detail');
    let localStoreTgOverview = this.localStoreService.getLocal('target-group', 'overview');
    let localStoreTgSource = this.localStoreService.getLocal('target-group', 'source');
    let localStoreTgLocation = this.localStoreService.getLocal('target-group', 'locations');
    // let localStoreTgSelectedLocation = this.localStoreService.getLocal('target-group', 'locations-selected');
    let localStoreTgLocationValue = this.localStoreService.getLocal('target-group', 'locations-value');
    let localStoreTgSelectedResgion = this.localStoreService.getLocal('regions', 'selected');
    if (localStoreTgDetail == undefined) {
      this.toastr.error('Please create Target group');
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    this.ctryid = localStoreTgOverview.country_id;
    let action = this.route.snapshot.queryParamMap.get('action');
    this.action = action;
    if (action === 'edit') {
      if (localStoreTgSource !== undefined) {
        this.source = localStoreTgSource;
      } else {
        // if (localStoreTgSelectedLocation != undefined) {
          this.generateSource(this.selectedDatas);
        // }
      }
    } else {
      // if (localStoreTgLocationValue !== undefined) {
      //   this.locationValue = localStoreTgLocationValue;
      // }
    }
    // if (localStoreTgSelectedLocation != undefined) {
    //   this.LocValShow = true;
    //   this.loaded = false;
    //   this.selRegion = localStoreTgSelectedLocation[0];
    //   this.map_id = localStoreTgSelectedLocation[0];
    //   this.locationValue = localStoreTgSelectedLocation[1];
    //   let is_editable = localStoreTgSelectedLocation[2];
    //   if (is_editable == 0) {
    //     this.is_disabled = true;
    //   } else {
    //     this.is_disabled = false;
    //   }
    //   localStoreTgSelectedLocation[1].forEach(ele => {
    //     if (ele.is_checked == 1) {
    //       this.selectedDatas.push(ele);
    //     }
    //   });
    //   // this.selectedDatas = localStoreTgSelectedLocation[1];
    // } else {
      this.getRegionData();
    // }
    if (localStoreTgSource !== undefined) {
      this.source = localStoreTgSource;
    }
    if (localStoreTgLocation !== undefined) {
      this.locationMstr = localStoreTgLocation;
    } else {
      this.getRegionList();
    }
    // if (localStoreTgSelectedResgion != undefined) {
      // localStoreTgSelectedLocation.forEach(ele => {
      //   if (ele.is_checked == 1) {
      //     this.selectedDatas.push(ele);
      //   }
      // });
      // this.localStoreService.setLocal('regions', 'selected', this.selectedDatas);
      // this.selectedDatas = localStoreTgSelectedResgion
    // }
  }

  selectAll(status) {
    this.flag = true;
    this.selectedDatas = this.locationValue.map(res => res);
    if (status) {
      this.selectedDatas.forEach((element) => {
        element.is_checked = 1;
        $('#chk' + element.id).prop('checked', true);
      });
    } else {
      this.selectedDatas.forEach((element) => {
        element.is_checked = 0;
        $('#chk' + element.id).prop('checked', false);
      });
      this.selectedDatas = [];
    }
    this.generateSource(this.selectedDatas);
  }

  selectData(obj, status) {
    this.flag = true;
    if (status) {
      if (this.selectedDatas.indexOf(obj) != -1) {
      } else {
        obj.is_checked = 1;
        this.selectedDatas.push(obj);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj);
      obj.is_checked = 0;
      this.selectedDatas.splice(index, 1);
      $('#chk' + obj.id).prop('checked', false);
    }
    this.generateSource(this.selectedDatas);
  }

  saveAndUpdate(txtid, imgid) {
    if (this.selectedDatas.length == 0) {
      if (this.flag) {
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
        this.localStoreService.setLocal('target-group', 'source', this.source);
        this.updateSource(updatesourcepayload, txtid, imgid);
      } else {
        this.router.navigate(['/project/target-groups/profile'], { queryParams: { action: this.action } });
      }
    } else {
      if (this.flag == false) {
        this.router.navigate(['/project/target-groups/profile'], { queryParams: { action: this.action } });
      } else {
        if (this.action == 'new') {
          this.saveTargetGroupRegion(txtid, imgid);
        }
      }
    }
    if (this.action == 'edit') {
      if (this.flag == false) {
        this.router.navigate(['/project/target-groups/profile'], { queryParams: { action: this.action } });
      } else {
        this.updateRegion(txtid, imgid);
      }
    }
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

  saveTargetGroupRegion(txtid, imgid) {
    let payload = {
      'target_group_id': this.target_grp_id,
      'location_country_map_id': this.map_id,
      'location': this.selectedDatas.map(res => res.id)
    }
    this.localStoreService.setLocal('regions', 'selected', this.selectedDatas);
    this.cs.hideshowImge(txtid, imgid, 'a');
    this.httpservice.postData(payload, requrls.savetargetgrpregioncat).subscribe(res => {
      if (res.success) {
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
        this.localStoreService.setLocal('target-group', 'locations-selected', [this.map_id, this.locationValue]);
        this.localStoreService.setLocal('target-group', 'source', this.source);
        this.updateSource(updatesourcepayload, txtid, imgid);
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(txtid, imgid, 'i');
    })
  }

  updateRegion(txtid, imgid) {
    let payload = {
      'target_group_id': this.target_grp_id,
      'location_country_map_id': this.map_id,
      'location': this.selectedDatas.map(res => res.id),
      'is_delete_quotas': 1
    }
    this.localStoreService.setLocal('regions', 'selected', this.selectedDatas);
    this.cs.hideshowImge(txtid, imgid, 'a');
    this.httpservice.postData(payload, requrls.updatetargetgrplocation).subscribe(res => {
      if (res.success) {
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
        this.localStoreService.setLocal('target-group', 'locations-selected', [this.map_id, this.locationValue]);
        this.localStoreService.setLocal('target-group', 'source', this.source);
        this.updateSource(updatesourcepayload, txtid, imgid);
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(txtid, imgid, 'i');
    });
  }

  previous() {
    this.router.navigate(['/project/target-groups/overview'], { queryParams: { action: this.action } });
  }

}
