import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';
import { CommonService } from 'app/shared/common.service';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  campaignList: any = [];
  panelId: any;
  comFilter: any = {};

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private cs: CommonService,
  ) { }

  ngOnInit() {
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
    }
    this.getCampaignListFn();
  }

  getCampaignListFn() {
    let payload = {
      'panel_id': this.panelId
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listcompaign).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.campaignList = response;
      } else {
      }

      this.spinnerService.hide();
    });
  }

  selectAll(status) {
    this.selectedDatas = this.campaignList.map(res => res.id);
    if (status) {
      this.selectedDatas.forEach((element) => $('#chk' + element).prop('checked', true));
    } else {
      this.selectedDatas.forEach((element) => $('#chk' + element).prop('checked', false));
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

  delete(obj, call) {
    if (obj != null && obj.registrations > 0) return;
    this.payload = {};
    this.payload['panel_id'] = this.panelId;
    if (call == 'i') {
      $('#confirmBox').modal('show');
      this.payload['id'] = [obj.id];
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#confirmBox').modal('show');
        this.payload['id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletecompaign).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload['id'].forEach(ele2 => {
          this.campaignList.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.campaignList.indexOf(ele1);
              this.campaignList.splice(index, 1);
            }
          });
        });
        this.payload = {};
        if (this.selectedDatas.length > 0) {
          this.selectedDatas = [];
        }
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  addNew() {
    this.localStoreService.removeLocalStorageObj('panel', 'compaign-details');
    this.localStoreService.lastAction('last-action', 'new');
    this.router.navigate(['/panel/recruitment/compaingn/add-edit'], { queryParams: { action: 'new' } });
  }

  edit(obj) {
    if (obj != null) {
      this.localStoreService.setLocal('panel', 'compaign-details', obj);
      this.router.navigate(['/panel/recruitment/compaingn/add-edit'], { queryParams: { action: 'edit' } });
    }
  }

  order = "";
  reverse: boolean = false;

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

  getStats(panelObj) {
    if (panelObj != null) {
      this.localStoreService.setLocal('panel', 'compaign-details', panelObj);
      this.router.navigate(['/panel/recruitment/compaingn/tracking']);
    }
  }

}
