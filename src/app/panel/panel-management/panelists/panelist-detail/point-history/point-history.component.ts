import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../../store/requrl';

@Component({
  selector: 'app-point-history',
  templateUrl: './point-history.component.html',
  styleUrls: ['./point-history.component.css']
})
export class PointHistoryComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  getPointHistoryLists = [];
  searchTxt: any = {};
  panelDetail;
  panelistDetail;
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  panelId;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let pandetail = this.localStoreService.getLocal('panelist', 'id');
    if (pdetail != undefined || pdetail != null) {
      this.panelId = pdetail.id;
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    if (pandetail != undefined || pandetail != null) {
      this.panelistDetail = this.localStoreService.getLocal('panelist', 'id');
    }
    this.getPointHistoryListFn();
  }

  getPointHistoryListFn() {
    this.spinnerService.show();
    this.payload['panel_id'] = this.panelId;
    this.payload['panelist_id'] = this.panelistDetail;
    this.httpservice.postData(this.payload, requrls.panelistpoints).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.getPointHistoryLists = response.data;
        this.pageSize = res.data['per_page'];
        this.cPage = res.data['current_page'];
        this.total = res.data['total'];
        this.perpage = res.data['per_page'];
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
    this.httpservice.postData(this.payload, requrls.panelistpoints).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getPointHistoryLists = responce.data.data;
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
    this.httpservice.postData(this.payload, requrls.panelistpoints).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getPointHistoryLists = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
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
        'project_name': val == '' ? undefined : val,
        'panel_id': this.panelId,
        'page': this.cPage,
        'panelist_id': this.panelistDetail,
        'per_page': +this.perpage
      }
      this.spinnerService.show();
      this.httpservice.postData(payload, requrls.panelistpoints)
        .subscribe(res => {
          if (res.success) {
            let response = res.data.data;
            this.pageSize = res.data['per_page'];
            this.cPage = res.data['current_page'];
            this.total = res.data['total'];
            this.perpage = res.data['per_page'];
            this.getPointHistoryLists = response;
          } else {
            this.getPointHistoryLists = [];
            this.toastr.error(res.message);
          }
          this.spinnerService.hide();
        });
    });
  }


}
