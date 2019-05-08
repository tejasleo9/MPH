import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { CommonService } from 'app/shared/common.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
declare var $: any;
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../../store/requrl';
@Component({
  selector: 'app-project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.css']
})
export class ProjectHistoryComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  getProjectHistoryLists = [];
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  panelDetail;
  panelistDetail;
  schpayload = {};

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private localStoreService: LocalstoreService,
    private cs: CommonService
  ) { }

  ngOnInit() {
    var self = this;
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let pandetail = this.localStoreService.getLocal('panelist', 'id');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    if (pandetail != undefined || pandetail != null) {
      this.panelistDetail = this.localStoreService.getLocal('panelist', 'id');
    }
    self.schpayload['launch_date'] = new Date();
    setTimeout(() => {
      $('#datetimepicker2').datetimepicker({
        format: 'DD-MM-YYYY',
        useCurrent: true,
        defaultDate: new Date(),
        icons: {
          time: "fa fa-clock",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down",
          next: "fa fa-arrow-right",
          previous: "fa fa-arrow-left"
        },
      });
      $("#datetimepicker2").on("dp.change", function (e) {
        self.schpayload['launch_date'] = e.date;
      });
    }, 100);
    this.getProjectHistoryListFn();
  }

  getProjectHistoryListFn() {
    this.spinnerService.show();
    this.payload['id'] = this.panelistDetail;
    this.httpservice.postData(this.payload, requrls.panelistproject).subscribe(res => {
      let response = res.data;
      if (res.success) {
        this.pageSize = res.data['per_page'];
        this.cPage = res.data['current_page'];
        this.total = res.data['total'];
        this.perpage = res.data['per_page'];
        this.getProjectHistoryLists = response.data;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  pageChanged(e) {
    this.payload["page"] = +e;
    this.payload["per_page"] = this.perpage
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.panelistproject).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getProjectHistoryLists = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    })
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.panelistproject).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getProjectHistoryLists = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    })
  }

  search(f, txtId, lodimgid) {
    let payload = {
      'project_id': f.value.project_id == undefined ? '' : f.value.project_id,
      'launch_date': this.cs.formatDate(this.schpayload['launch_date']) == undefined ? '' : this.cs.formatDate(this.schpayload['launch_date']),
    }
    if (f.value.project_id == undefined && this.cs.formatDate(this.schpayload['launch_date']) == undefined) return;
    this.cs.hideshowImge(txtId, lodimgid, 'a');
    this.httpservice.postData(payload, requrls.panelistproject).subscribe(res => {
      let response = res;
      if (response.success) {
        this.getProjectHistoryLists = res.data;
      } else {
        this.getProjectHistoryLists = [];
      }
      this.cs.hideshowImge(txtId, lodimgid, 'i');
    });
  }

  reset() {
    this.getProjectHistoryListFn();
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
        'project_name': val == '' ? undefined : val,
        'id': this.panelistDetail
      }
      this.spinnerService.show();
      this.httpservice.postData(payload, requrls.panelistproject)
        .subscribe(res => {
          if (res.success) {
            let response = res.data.data;
            this.pageSize = res.data['per_page'];
            this.cPage = res.data['current_page'];
            this.total = res.data['total'];
            this.perpage = res.data['per_page'];
            if (res.data.length > 0 || Object.values(res.data).length > 0) {
              this.getProjectHistoryLists = response;
            } else {
              this.getProjectHistoryLists = [];
            }
          } else {
            this.toastr.error(res.message);
          }
          this.spinnerService.hide();
        });
    });
  }

  sortpayload: any = {};
  sort = '';

  sortData(sort) {
    let sdir;
    if (this.sort != sort) {
      sdir = 'asc';
      this.sort = sort;
    } else {
      sdir = 'desc';
      this.sort = '';
    }
    this.spinnerService.show();
    this.sortpayload['order_by'] = sort;
    this.sortpayload['order_dir'] = sdir;
    this.sortpayload["page"] = this.cPage;
    this.sortpayload["per_page"] = +this.perpage;
    this.sortpayload['id'] = this.panelistDetail;
    let payload = this.sortpayload;
    this.httpservice.postData(payload, requrls.panelistproject).subscribe(res => {
      if (res.success) {
        let response = res.data.data;
        this.getProjectHistoryLists = response;
        this.pageSize = this.perpage;
        this.total = res.data.total;
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

}
