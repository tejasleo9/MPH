import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../shared/common.service';
import { Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-panelists',
  templateUrl: './panelists.component.html',
  styleUrls: ['./panelists.component.css']
})
export class PanelistsComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  getPanelists = [];
  panelFilter: any = {};
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  panelDetail;
  id;
  first_name;
  last_name;
  phone;
  email;
  postalcode;
  reg_source;
  status;
  gender;
  csvpath = '';
  input_file = new FormData();
  panelId;
  order: string = 'id';
  reverse: boolean = false;
  is_visible = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined) {
      this.panelId = pdetail.id;
    }
    this.getPanelistFn();
    setTimeout(() => {
      this.is_visible = true;
    }, 3000)
  }

  details(id) {
    this.localStoreService.setLocal('panelist', 'id', id);
    this.router.navigate(['/panel/panel-management/panelists/overview']);
  }

  getPanelistFn() {
    this.spinnerService.show();
    this.payload['panel_id'] = this.panelId;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    this.httpservice.postData(this.payload, requrls.listpanelist).subscribe(res => {
      if (res.success) {
        let response = res.data.data;
        this.pageSize = res.data['per_page'];
        this.cPage = res.data['current_page'];
        this.total = res.data['total'];
        this.perpage = res.data['per_page'];
        this.getPanelists = response;
      } else {
      }
      this.spinnerService.hide();
    });
  }


  selectAll(status) {
    this.selectedDatas = this.getPanelists.map(res => res.id);
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

  hideshowImge(stimg, imgid, call) {
    if (call == 'a') {
      document.getElementById(stimg).style.display = 'none';
      document.getElementById(imgid).style.display = 'inline-block';
    } else {
      document.getElementById(stimg).style.display = 'inline-block';
      document.getElementById(imgid).style.display = 'none';
    }
  }

  pageChanged(e) {
    this.payload["page"] = +e;
    this.payload["per_page"] = this.perpage
    let text = this.questionInput.nativeElement.value;
    if (text != null || text != '') {
      this.payload["first_name"] = text;
    }
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.listpanelist).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getPanelists = responce.data.data;
        this.total = responce.data.total;
        this.spinnerService.hide();
      }
    })
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    let text = this.questionInput.nativeElement.value;
    if (text != null || text != '') {
      this.payload["first_name"] = text;
    }
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.listpanelist).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getPanelists = responce.data.data;
        this.total = responce.data.total;
        this.spinnerService.hide();
      }
    })
  }

  search(f, txtId, lodimgid) {

    let payload:any = {
      'panel_id': this.panelId,
      'id': f.value.id == null ? undefined : f.value.id,
      'first_name': f.value.first_name == null ? undefined : f.value.first_name,
      'last_name': f.value.last_name == null ? undefined : f.value.last_name,
      'phone': f.value.phone == null ? undefined : f.value.phone,
      'email': f.value.email == null ? undefined : f.value.email,
      'postalcode': f.value.postalcode == null ? undefined : f.value.postalcode,
      'reg_source': f.value.reg_source == null ? undefined : f.value.reg_source,
      'status': f.value.status == null ? undefined : f.value.status,
      'gender': f.value.gender == null ? undefined : f.value.gender,
    }


    if (f.value.id == undefined &&
      f.value.first_name == undefined &&
      f.value.last_name == undefined &&
      f.value.phone == undefined &&
      f.value.email == undefined &&
      f.value.postalcode == undefined &&
      f.value.reg_source == undefined &&
      f.value.status == undefined &&
      f.value.gender == undefined) {
      return;
    } else {
      payload['panel_id'] = this.panelId;
      this.cs.hideshowImge(txtId, lodimgid, 'a');
      this.httpservice.postData(payload, requrls.listpanelist).subscribe(res => {
        if (res.success) {
          let response = res.data.data;
          this.pageSize = res.data['per_page'];
          this.cPage = res.data['current_page'];
          this.total = res.data['total'];
          this.perpage = res.data['per_page'];
          this.getPanelists = response;
        } else {
          this.getPanelists = [];
        }
        this.spinnerService.hide();
        this.cs.hideshowImge(txtId, lodimgid, 'i');
        document.getElementById('headname').click();
      });
    }
  }

  reset() {
    this.id = undefined;
    this.first_name = undefined;
    this.last_name = undefined;
    this.phone = undefined;
    this.email = undefined;
    this.postalcode = undefined;
    this.reg_source = undefined;
    this.status = undefined;
    this.gender = undefined;
    this.pageSize = 20;
    this.cPage = 1;
    this.total = 10;
    this.perpage = 20;
    this.getPanelistFn();
    document.getElementById('headname').click();
    this.questionInput.nativeElement.value = "";
  }

  fileName = 'No file choosen';
  event;

  getCsvFile(event) {
    this.input_file.set('file', event.target.files[0], event.target.files[0].name);
    this.fileName = event.target.files[0].name;
    this.event = event;
  }

  is_exist = false;
  errors = [];

  uploadStatus(imgid, lodimgid) {
    this.input_file.set('panel_id', this.panelId);
    if (this.fileName == 'No file choosen') {
      this.is_exist = true;
      return;
    } else {
      this.is_exist = false;
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(this.input_file, requrls.updatepaneliststatus).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        $('#exampleModal1').modal('hide');
      } else {
        if (response.status_code = 1351) {
          this.csvpath = 'http://m4-live.mysurveyhub.com/' + response.data.path;
        } else {
          if (response.data != {} && Object.values(response.data).length > 0) {
            this.errors = response.data;
            this.cs.showError(this.errors, 'a');
          } else {
            this.toastr.error(response.message);
          }
        }
        this.toastr.error(response.message);
      }
      this.is_exist = false;
      this.input_file = new FormData();
      this.event = null;
      this.fileName = 'No file choosen';
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  uploadPoints(imgid, lodimgid) {
    this.input_file.set('panel_id', this.panelId);
    this.is_exist = false;
    if (this.fileName == 'No file choosen') {
      this.is_exist = true;
      return;
    } else {
      this.is_exist = false;
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(this.input_file, requrls.uploadpanelistpoints).subscribe(res => {
      let response = res;
      if (response.success == true) {
        this.toastr.success(response.message);
        $('#exampleModal2').modal('hide');
      } else {
        if (response.data != {} && Object.values(response.data).length > 0) {
          this.errors = response.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(response.message);
        }
      }
      this.input_file = new FormData();
      this.event = null;
      this.fileName = 'No file choosen';
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  @ViewChild('questionInput') questionInput: ElementRef;
  public input$: Observable<string>;

  ngAfterViewInit() {
    this.input$ = fromEvent(this.questionInput.nativeElement, 'input')
      .pipe(
        debounceTime(1500),
        map((e: KeyboardEvent) => e.target['value'])
      );
    this.input$.subscribe((val: string) => {
      let payload = {
        'first_name': val == '' ? undefined : val,
        'panel_id': this.panelId,
        'page': this.cPage,
        'per_page': +this.perpage
      }
      this.spinnerService.show();
      this.httpservice.postData(payload, requrls.listpanelist)
        .subscribe(res => {
          if (res.success) {
            let response = res.data.data;
            this.pageSize = res.data['per_page'];
            this.cPage = res.data['current_page'];
            this.total = res.data['total'];
            this.perpage = res.data['per_page'];
            this.getPanelists = response;
          } else {
            this.getPanelists = [];
          }
          this.spinnerService.hide();
        });
    });
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }



}
