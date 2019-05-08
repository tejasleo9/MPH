import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router } from '@angular/router';
import { CommonService } from 'app/shared/common.service';
declare var $: any;
declare var Chart: any;
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor(
    private httpservice: HttpService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private cs: CommonService,
    private orderPipe: OrderPipe,
  ) { }

  panelId;
  reqStats;
  payload: any = {};
  disOverSources = [];
  disPanelDisSources = [];
  disPanelRateByAff = [];
  overviewBySch: any = {};
  panelResRateAff: any = {};
  panelDisBySrc: any = {};
  panelDisByReg: any = {};
  order;

  getRecruitmentStatistics(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.getreqstats).subscribe(res => {
      let response = res;
      if (response.success) {
        this.reqStats = res.data;
      } else {
      }
    })
  }

  timelineStats = [];
  duration = 'week';

  generateGraph(data) {
    let act = [];
    let pgview = [];
    let reg = [];
    let forweek = [];
    let dyndata = Object.values(data);
    data.forEach(element => {
// tslint:disable-next-line: forin
      for (const key in element) {
        console.log(element[key])
        if (element[key].hasOwnProperty('activations')) {
          act.push(element[key]['activations']);
        }
        if (element[key].hasOwnProperty('pageviews')) {
          pgview.push(element[key]['pageviews']);
        }
        if (element[key].hasOwnProperty('registrations')) {
          reg.push(element[key]['registrations']);
        }
        if (key != null) {
          forweek.push(key);
        }
      }
    });
    return { act, pgview, reg, forweek }
  }

  myChart1;

  getTracTimelineReport() {
    let payload = {};
    if (this.duration == 'date' || this.duration == 'month') {
      payload['from_date'] = this.cs.formatDate(this.payload['from_date']);
      payload['to_date'] = this.cs.formatDate(this.payload['to_date']);
    } else {
      delete payload['from_date'];
      delete payload['to_date'];
    }
    payload['duration'] = this.duration;
    payload['panel_id'] = this.panelId;
    this.httpservice.postData(payload, requrls.timelinereport).subscribe(res => {
      let response = res;
      console.log(this.timelineStats);
      if (response.success) {
        this.timelineStats = res.data;
        let resdata;
        if (this.timelineStats != null) {
          resdata = this.generateGraph(this.timelineStats);
        }
        var ctx3 = (document.getElementById('myChart1') as any).getContext('2d');
        ctx3.height = 100;
        if (this.myChart1) this.myChart1.destroy();
        this.myChart1 = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: resdata.forweek,
            datasets: [{
              label: "Page View",
              backgroundColor: 'rgb(0, 0, 0 ,0)',
              borderColor: '#4c2deb',
              pointBackgroundColor: '#4c2deb',
              data: resdata.pgview,
              pointStyle: 'circle',
              radius: 5,
            }, {
              label: "Registration",
              backgroundColor: 'rgb(0, 0, 0 ,0)',
              borderColor: '#2bcc98',
              pointBackgroundColor: '#2bcc98',
              data: resdata.reg,
              pointStyle: 'circle',
              radius: 5,
            }, {
              label: "Activation",
              backgroundColor: 'rgb(0, 0, 0 ,0)',
              borderColor: '#ff5050',
              pointBackgroundColor: '#ff5050',
              data: resdata.act,
              pointStyle: 'circle',
              radius: 5,
            },]
          },
          options: {
            elements: {
              line: {
                tension: 0
              }
            },
            legend: {
              position: 'bottom',
              labels: {
                fontColor: '#000',
                fontFamily: 'Montserrat',
                usePointStyle: true,
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      } else {
        this.timelineStats = [];
        // this.toastr.error(response.message);
      }
    })
  }

  getOverviewBySrource(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.overviewbysource).subscribe(res => {
      let response = res;
      if (response.success) {
        this.disOverSources = res.data
      } else {
      }
    })
  }

  getPanelRateByAffiliate(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.panelresponseratebyaff).subscribe(res => {
      let response = res;
      if (response.success) {
        this.disPanelRateByAff = res.data;
      } else {
      }
    })
  }

  getPanelDisBySrource(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.paneldisbysrc).subscribe(res => {
      let response = res;
      if (response.success) {
        this.disPanelDisSources = res.data;
      } else {
      }
    })
  }

  getData() {
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
      this.getTracTimelineReport();
    }
  }

  sortData(sort, c) {
    if (this.order == sort) {
      this.order = sort + ": reverse";
    } else {
      this.order = sort;
    }
    if (c == '1') {
      this.orderPipe.transform(this.disOverSources, this.order);
    } else if (c == '2') {
      this.orderPipe.transform(this.disPanelRateByAff, this.order);
    } else {
      this.orderPipe.transform(this.disPanelDisSources, this.order);
    }
  }

  ngOnInit() {
    var self = this;
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
    self.payload['from_date'] = myDate;
    self.payload['to_date'] = new Date();
    setTimeout(() => {
      $(function () {
        $('#datetimepicker1').datetimepicker({
          format: 'DD-MM-YYYY',
          defaultDate: myDate,
          icons: {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            next: "fa fa-arrow-right",
            previous: "fa fa-arrow-left"
          },
        });
        $("#datetimepicker1").on("dp.change", function (e) {
          self.payload['from_date'] = e.date;
        });

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
          self.payload['to_date'] = e.date;
        });
      });
    }, 10);
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
      this.payload['panel_id'] = panelDtl.id;
      this.getRecruitmentStatistics(panelDtl.id);
      this.getTracTimelineReport();
      this.getOverviewBySrource(panelDtl.id);
      this.getPanelRateByAffiliate(panelDtl.id);
      this.getPanelDisBySrource(panelDtl.id);
    }
  }

}
