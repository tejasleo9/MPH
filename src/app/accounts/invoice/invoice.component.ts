import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import * as requrls from './../store/requrl';
import { HttpService } from 'app/store/http/http.service';
declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  panelDetail;
  invoiceList;
  invoiceFilter: any = {};
  downloadpath = 'http://m4-live.mysurveyhub.com/';

  constructor( 
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if(pdetail != undefined || pdetail != null){
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    } 
    this.getInvoicelistFn();
  }


  getInvoicelistFn() {
    this.spinnerService.show();
    let payload;
    this.httpservice.postData(payload, requrls.listinvoice).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.invoiceList = response;
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }


}
