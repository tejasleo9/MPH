import { Component, OnInit } from '@angular/core';
import { ProService } from '../store/service';
import * as requrls from '../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  payload;
  pricingTableRes: any = [];
  total_current_cost = 0;
  pricingTableShow = false;

  projStatsRes: any = [];
  projStatsShow = false;
  projstat = [];

  TgQuotasRes: any = [];
  TgQuotasShow = false;

  constructor(
    private httpservice: HttpService,
  ) { }

  ngOnInit() {
    this.payload = { 'project_id': 3 };
    this.pricingTableFn();
    this.projStatsFn();
    this.getTgQuotasFn();
  }

  projStatsFn() {
    this.httpservice.postData(this.payload, requrls.projectcomstats).subscribe(res => {
      this.projStatsRes = res.data;
      this.projstat = Object.keys(res.data);
      this.projStatsShow = true;
    })
  }

  pricingTableFn() {
    this.httpservice.postData(this.payload, requrls.projectcostdetails).subscribe(res => {
      this.pricingTableRes = Object.values(res.data);
      this.pricingTableRes.forEach(element => {
        this.total_current_cost += element.current_cost;
      });
      this.pricingTableShow = true;
    })
  }

  getTgQuotasFn() {
    this.httpservice.postData(this.payload, requrls.targetgrpquotastats).subscribe(res => {
      this.TgQuotasRes = res.data;
      this.TgQuotasShow = true;
    })
  }

}
