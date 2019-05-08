import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../shared/common.service';
// import { AccountsService } from '../store/service';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
declare var $: any;
declare var Chart: any;
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import * as requrls from './../store/requrl';
import { HttpService } from 'app/store/http/http.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  panelDetail;
  userList = [];
  userFilter: any = {};
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  payload: any = {};
  rolesList;
  panelId;
  userObj: any = {};
  @ViewChild('questionInput') questionInput: ElementRef;
  public input$: Observable<string>;
  selectedDatas = [];
  popupMess = '';
  errors = [];
  searchpayload: any = {};
  text = '';

  sortpayload: any = {};
  sort = '';

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined) {
      this.panelId = pdetail.id;
    }
    this.getUserlistFn();
    this.getRoleslistFn();
  }

  getUserlistFn() {
    this.spinnerService.show();
    // this.payload['panel_id'] = this.panelDetail['id'];
    // this.payload["page"] = this.cPage;
    // this.payload["per_page"] = +this.perpage;
    this.httpservice.postData(this.payload, requrls.listuser).subscribe(res => {
      if (res.success) {
        let response = Object.values(res.data.data);
        this.userList = response;
        this.pageSize = res.data['per_page'];
        this.cPage = res.data['current_page'];
        this.total = res.data['total'];
        this.perpage = res.data['per_page'];
      } else {
        // this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  getRoleslistFn() {
    this.spinnerService.show();
    // this.payload['panel_id'] = this.panelDetail['id'];
    let payload;
    this.httpservice.postData(payload, requrls.listrole).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.rolesList = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    let dropChkArray = [];
    dropChkArray = [{
      value: formVal.value.role_id,
      key: 'role_id'
    }
    ];
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      if (formVal.form.valid == true) {
        this.onValidate(formVal, imgid, lodimgid);
      }
    }
  }

  onValidate(f, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    let payload = {
      "name": f.value.name,
      "email": f.value.email,
      "role_id": typeof (f.value.role_id) == 'object' ? +f.value.role_id[0] : +f.value.role_id,
    };
    this.cs.showError(this.errors, 'i');
    let callTo;
    if(this.text == 'Edit') {
      payload['id'] = this.userObj.id;
      payload['status'] = this.userObj.status;
      callTo = this.httpservice.postData(payload, requrls.edituser);
    } else {
      callTo = this.httpservice.postData(payload, requrls.adduser);
    }
    callTo.subscribe(res => {
      console.log(res);
      if (res.success) {
        this.getUserlistFn();
        $('#exampleModal').modal('hide');
        this.toastr.success('User added successfully!');
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  resetForm() {
    this.userObj = {};
    this.text = 'Add';
    this.cs.showError(this.errors, 'i');
  }

  pageChanged(e) {
    this.payload["page"] = +e;
    this.payload["per_page"] = this.perpage;

    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.listuser).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.userList = responce.data.data;
        this.total = responce.data.total;
        this.spinnerService.hide();
      }
    });
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.listuser).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.userList = responce.data.data;
        this.total = responce.data.total;
        this.spinnerService.hide();
      }
    });
  }

  delete(obj, call) {
    if (call == 'i') {
      this.payload['id'] = [obj.id];
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        $('#confirmBox').modal('show');
        this.payload['id'] = this.selectedDatas;
      } else {
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  selectAll(status) {
    this.selectedDatas = this.userList.map(res => res.id);
    if (status) {
      this.selectedDatas.forEach((element) => $('#chk' + element).prop('checked', true));
    } else {
      this.selectedDatas.forEach((element) => $('#chk' + element).prop('checked', false));
      this.selectedDatas = [];
    }
  }

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj.id) !== -1) {
      } else {
        this.selectedDatas.push(obj.id);
      }
    } else {
      const index = this.selectedDatas.indexOf(obj.id);
      this.selectedDatas.splice(index, 1);
    }
  }

  ngAfterViewInit() {
    this.input$ = fromEvent(this.questionInput.nativeElement, 'input')
      .pipe(
        debounceTime(1500),
        map((e: KeyboardEvent) => e.target['value'])
      );
    this.input$.subscribe((val: string) => {
      // let payload = {
      //   'name': val == '' ? undefined : val,
      //   'panel_id': this.panelId
      // }
      this.payload['name'] = val === '' ? undefined : val;
      this.payload['panel_id'] = this.panelId;
      this.spinnerService.show();
      this.httpservice.postData(this.payload, requrls.listuser)
        .subscribe(res => {
          let response = res;
          if (response.success) {
            let response = res.data.data;
            this.userList = response;
            this.pageSize = res.data['per_page'];
            this.cPage = res.data['current_page'];
            this.total = res.data['total'];
            this.perpage = res.data['per_page'];
          } else {
            this.userList = [];
          }
          this.spinnerService.hide();
        });
    });
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deleteuser).subscribe(res => {
      const response = res;
      if (response.success) {
        this.payload['id'].forEach(ele2 => {
          this.userList.forEach(ele1 => {
            if (ele1.id === ele2) {
              const index = this.userList.indexOf(ele1);
              this.userList.splice(index, 1);
            }
          });
        });
        this.payload = {};
        this.selectedDatas = [];
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  search(f, txtId, lodimgid) {
    let payload: any = {};
    if (f.value.name != null && f.value.name !== undefined && f.value.name !== "") {
      payload['name'] = f.value.name.trim();
    }
    if (f.value.email != null && f.value.email !== undefined && f.value.email !== "") {
      payload['email'] = f.value.email.trim();
    }
    this.searchpayload = payload;
    if (f.value.name === undefined && f.value.email === undefined) {
      return;
    } else {
      this.cs.hideshowImge(txtId, lodimgid, 'a');
      this.httpservice.postData(payload, requrls.listuser).subscribe(res => {
        if (res.success) {
          this.userList = res.data.data;
          this.pageSize = this.perpage;
          this.total = res.data.total;
        } else {
          this.userList = [];
        }
        this.cs.hideshowImge(txtId, lodimgid, 'i');
        document.getElementById('headname').click();
      });
    }
  }

  reset() {
    this.payload = {};
    this.getUserlistFn();
    this.searchpayload = {};
    this.questionInput.nativeElement.value = '';
    document.getElementById('headname').click();
  }

  editUser(obj) {
    if (obj != null) {
      this.cs.showError(this.errors, 'i');
      this.text = 'Edit';
      obj.role_id = [obj.role_id];
      this.userObj = obj;
      $('#exampleModal').modal('show');
    }
  }

  sortData(sort) {
    let sdir;
    if (this.sort !== sort) {
      sdir = 'asc';
      this.sort = sort;
    } else {
      sdir = 'desc';
      this.sort = '';
    }
    this.spinnerService.show();
    this.sortpayload['order_by'] = sort;
    this.sortpayload['order_dir'] = sdir;
    const payload = this.sortpayload;
    this.httpservice.postData(payload, requrls.listuser).subscribe(res => {
      this.userList = res.data.data;
      this.pageSize = this.perpage;
      this.total = res.data.total;
    });
    this.spinnerService.hide();
  }

}
