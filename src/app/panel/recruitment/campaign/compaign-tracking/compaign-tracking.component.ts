import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
import { CommonService } from 'app/shared/common.service';
declare var Chart: any;
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-compaign-tracking',
  templateUrl: './compaign-tracking.component.html',
  styleUrls: ['./compaign-tracking.component.css']
})
export class CompaignTrackingComponent implements OnInit {

  payload: any = {};
  panelId;
  comId;
  comTimeLine = [];
  reqStats;
  is_visible = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    public cs: CommonService
  ) { }

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

  generateGraph(data) {
    let act = [];
    let pgview = [];
    let reg = [];
    let forweek = [];
    // let dyndata = Object.values(data);
    data.forEach(element => {
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          if (key == 'activations') {
            act.push(element[key])
          } else if (key == 'page_views') {
            pgview.push(element[key])
          } else if (key == 'registrations') {
            reg.push(element[key])
          } else if (key == 'for_week') {
            forweek.push(element[key])
          }
        }
      }
    });
    return { act, pgview, reg, forweek }
  }

  myChart4;

  getStats(payload) {
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.getcomtimelinegraph).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.comTimeLine = response;
        let resdata = this.generateGraph(this.comTimeLine);
        var ctx3 = (document.getElementById('myChart4') as any);
        ctx3.height = 100;
        if (this.myChart4) {
          this.myChart4.destroy();
        }
        this.myChart4 = new Chart(ctx3, {
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
      }
      this.spinnerService.hide();
    });
  }

  ngOnInit() {
    let comdetails = this.localStoreService.getLocal('panel', 'compaign-details');
    let paneldetails = this.localStoreService.getLocal('panel', 'detail');
    if (paneldetails != undefined) {
      this.panelId = paneldetails.id;
      this.getRecruitmentStatistics(paneldetails.id);
    }
    if (comdetails != undefined) {
      this.comId = comdetails.id;
      let payload = {
        'panel_id': this.panelId,
        'campaign_id': this.comId
      }
      this.getStats(payload);
    }
    var self = this;
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
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
    }, 500);

    setTimeout(() => {
      this.is_visible = true;
    }, 5000)
  }

}
