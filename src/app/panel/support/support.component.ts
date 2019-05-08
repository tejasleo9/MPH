import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import { SelectModule } from 'ng-select';
import { IOption } from 'ng-select';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../store/requrl';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  payload = {};
  selectedDatas = [];
  disablelink = true;
  panelId;
  pageSize = 20;
  cPage = 1;
  total = 10;
  perpage = 20;
  getPanelists = [];
  order: string = 'id';
  reverse: boolean = false;

  sortpayload: any = {};
  sort = '';
  ticketCount = [];

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
    this.getListSupportTicketFn();
    this.getTicketCount();
  }

  getTicketCount() {
    const payload = {
      'panel_id' : this.panelId
    }
    this.httpservice.postData(payload, requrls.supportticketcount).subscribe(res => {
      console.log(res);
      let responce = res;
      if (res.success) {
        this.ticketCount = responce.data;
      }
      this.spinnerService.hide();
    });
  }

  getListSupportTicketFn() {
    this.spinnerService.show();
    this.payload['panel_id'] = this.panelId;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    this.payload["order_by"] = +this.perpage;
    this.httpservice.postData(this.payload, requrls.listsupportticket).subscribe(res => {
      if (res.success) {
        let response = res.data.data;
        this.getPanelists = response;
        this.pageSize = res.data['per_page'];
        this.cPage = res.data['current_page'];
        this.total = res.data['total'];
        this.perpage = res.data['per_page'];
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
    this.payload['panel_id'] = this.panelId;
    this.payload["page"] = +e;
    this.payload["per_page"] = this.perpage
    let text = this.questionInput.nativeElement.value;
    if (text != null || text != '') {
      this.payload["ticket_number"] = text;
    }
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.listsupportticket).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getPanelists = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    this.payload['panel_id'] = this.panelId;
    this.payload["page"] = this.cPage;
    this.payload["per_page"] = +this.perpage;
    let text = this.questionInput.nativeElement.value;
    if (text != null || text != '') {
      this.payload["ticket_number"] = text;
    }
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.listsupportticket).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.getPanelists = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
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
        'ticket_number': val == '' ? undefined : val,
        'panel_id': this.panelId,
        'page': this.cPage,
        'per_page': +this.perpage
      }
      this.spinnerService.show();
      this.httpservice.postData(payload, requrls.listsupportticket).subscribe(res => {
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
    let sdir;
    if (this.sort != sort) {
      sdir = 'asc';
      this.sort = sort;
    } else {
      sdir = 'desc';
      this.sort = '';
    }
    this.spinnerService.show();
    this.sortpayload['panel_id'] = this.panelId;
    this.sortpayload['order_by'] = sort;
    this.sortpayload['order_dir'] = sdir;
    let payload = this.sortpayload;
    this.httpservice.postData(payload, requrls.listsupportticket).subscribe(res => {
      if (res.success) {
        let response = res.data.data;
        this.getPanelists = response;
        this.total = res.data.total;
        this.pageSize = this.perpage;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  ticketNo(x) {
    this.localStoreService.setLocal('panel', 'support-ticket', x);
  }
}
