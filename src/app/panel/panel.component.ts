import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../core/header/header.component';
declare var $: any;
import { SelectModule } from 'ng-select';
import { IOption } from 'ng-select';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { ProService } from '@Project/store/service';
import { Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './store/requrl';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers: [HeaderComponent]
})
export class PanelComponent implements OnInit {

  payload: any = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  panelLists: any = [];
  countries = [];
  medSearch: any = {};
  country;
  panel_name;
  sts;
  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private cs: CommonService,
    private router: Router,
    private localStoreService: LocalstoreService,
    private orderPipe: OrderPipe,
  ) { }

  is_true = false;

  ngOnInit() {
    this.panelListFn();
    this.getCountryList();
    setTimeout(() => {
      this.is_true = true;
    }, 5000)
  }

  panelListFn() {
    this.spinnerService.show();
    this.httpservice.getData(requrls.listpanel).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.panelLists = response;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  selectAll(status) {
    this.selectedDatas = this.panelLists.map(res => res.id);
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
      const index = this.selectedDatas.indexOf(obj.id);
      this.selectedDatas.splice(index, 1);
    }

    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  delete(obj, call) {
    if (call == 'i') {
      this.payload['panel_id'] = obj.id;
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#confirmBox').modal('show');
        this.payload['panel_id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = 'Are you sure want to delete.?';

  }

  deleteData(imgid, lodimgid) {
    this.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletepanel).subscribe(res => {
      let response = res;
      if (response.success) {
        this.panelLists.forEach((ele1, index) => {
          if (ele1.id === this.payload.panel_id) {
            this.panelLists.splice(index, 1);
          }
        });
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  hideshowImge(stimg, imgid, call) {
    if (call == 'a') {
      document.getElementById(stimg).style.display = 'none';
      document.getElementById(imgid).style.display = 'inline-block';
    } else {
      document.getElementById(stimg).style.display = 'inline-block';
      document.getElementById(imgid).style.display = 'none';
    }
  }

  edit(obj) {
    let panelId = obj.id;
    localStorage.setItem('panelId', panelId);
    localStorage.setItem('panelEdit', 'True');
  }

  panelDetail(x) {
    localStorage.setItem('panelId', x);
    localStorage.setItem('panelEdit', 'True');
  }

  getCountryList() {
    this.httpservice.getData(requrls.getcountrylist).subscribe(res => {
      let response = res;
      if (response.success) {
        this.countries = response.data;
      } else {
      }
    })
  }

  search(f, txtId, lodimgid) {
    let payload = {
      'country_id': f.value.country_id == undefined ? '' : f.value.country_id,
      'name': f.value.name == undefined ? '' : f.value.name,
      'status': f.value.status == undefined ? '' : f.value.status
    }
    if (f.value.name == undefined && f.value.country_id == undefined && f.value.status == undefined) return;
    this.cs.hideshowImge(txtId, lodimgid, 'a');
    this.httpservice.getDataWithParams(payload, requrls.listpanel).subscribe(res => {
      let response = res;
      if (response.success) {
        this.panelLists = res.data;
      } else {
        this.panelLists = [];
      }
      this.cs.hideshowImge(txtId, lodimgid, 'i');
    });
    this.cs.afterreset();
  }

  reset(f) {
    this.panelListFn();
    this.country = '';
    this.panel_name = '';
    this.sts = '';
    this.medSearch.name = '';
    f.reset();
    this.cs.afterreset();
  }

  addNew() {
    this.localStoreService.removeLocal('panel');
    this.localStoreService.lastAction('last-action', 'new');
    this.router.navigate(['/panel/add-edit'], { queryParams: { action: 'new' } });
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

  editProject(id, name) {
    let obj = {
      'id': id,
      'name': name
    }
    this.localStoreService.removeLocal('panel');
    this.localStoreService.setLocal('panel', 'detail', obj)
    this.localStoreService.lastAction('last-action', 'edit');
    this.router.navigate(['/panel/dashboard']);
  }

}
