import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../../shared/localstore.service';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  payload:any;
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  getTemplateLists: any = [];
  panelDetail;
  tempFilter: any = {};
  ifError: boolean = false;
  delload:any = {};
  panelId;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private orderPipe: OrderPipe,
  ) {}

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if(pdetail != undefined){
      this.panelId = pdetail.id
      this.getTemplateListFn(pdetail.id);
    }
  }

  getTemplateListFn(id) {
    this.spinnerService.show();
    let payload = {
      'reference_id' : id,
      'category_type' : 1
    }
    this.httpservice.getDataWithParams(payload, requrls.listtemplate).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.getTemplateLists = response;
      }
      this.spinnerService.hide();
    });
  }

  selectAll(status) {
    this.selectedDatas = this.getTemplateLists.map(res => res.id);
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
    // if (obj == null) return;
    this.payload = {};
    this.payload['panel_id'] = this.panelId;
    if (call == 'i') {
      this.payload['id'] = [obj.id];
      $('#confirmBox').modal('show');
    } else {
      console.log(1);
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
    this.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletetemplate).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload['id'].forEach(ele2 => {
          this.getTemplateLists.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.getTemplateLists.indexOf(ele1);
              this.getTemplateLists.splice(index, 1);
            }
          });
        });
        this.payload = {};
        if(this.selectedDatas.length > 0) { 
          this.selectedDatas = [];
        }
        this.toastr.success(response.message);
        this.disablelink = true;
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  edit(obj) {
    if (obj != null) {
      this.localStoreService.setLocal('panel', 'temp-detail', obj);
      this.router.navigate(['/panel/engagement/templates/add-template'], { queryParams: { action: 'edit' } });
    }
  }

  newAction() {
    this.localStoreService.removeLocalStorageObj('panel', 'temp-detail');
    this.router.navigate(['/panel/engagement/templates/add-template'], { queryParams: { action: 'new' } });
  }

  order;
  reverse: boolean = false;

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
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


}
