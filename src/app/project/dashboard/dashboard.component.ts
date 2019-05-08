import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
declare var Chart: any;
declare var $: any;
import * as moment from 'moment';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from '../store/requrl';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class PDashboardComponent implements OnInit {

  from;
  to;
  payload = {};
  projectStats = {};
  projectSummery = {};
  projectTimeline = {};
  projectCompleteTimeline = {};
  projectCostTimeline = {};

  projects = [];
  proStats = {};


  constructor(
    private httpservice: HttpService,
    private cs: CommonService,
  ) { }


  getDate() {
    let payload = {
      'from_date': this.cs.formatDate(this.payload['from_date']),
      'to_date': this.cs.formatDate(this.payload['to_date'])
    };
    this.getProjectStats(payload);
    this.getProjectSummary(payload);
    this.getProjectDashboardTimeline(payload);
    this.getProjectDashboardComplateTimeline(payload);
    this.getProjectcosttimeline(payload);
    this.getProjectStat(payload);
  }

  getProjectStats(payload) {
    this.httpservice.postData(payload, requrls.projectdashboardstats).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectStats = response.data;
      } else {
        this.projectStats = {};
      }
    });
  }

  getProjectSummary(payload) {
    this.httpservice.postData(payload, requrls.projectdashboardsummary).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectSummery = response.data;
        this.getProjectSummery();
      } else {
        this.projectSummery = {};
      }
    });
  }

  getProjectDashboardTimeline(payload) {
    this.httpservice.postData(payload, requrls.projectdashboardtimline).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectTimeline = response.data;
        this.getProjectTimeline();
      } else {
        this.projectTimeline = {};
      }
    });
  }

  getProjectDashboardComplateTimeline(payload) {
    this.httpservice.postData(payload, requrls.projectdashboardcompletestimeline).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectCompleteTimeline = response.data;
        this.projectCompTimeline();
      } else {
        this.projectCompleteTimeline = {};
      }
    });
  }

  getProjectcosttimeline(payload) {
    this.httpservice.postData(payload, requrls.projectdashboardcosttimeline).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projectCostTimeline = response.data;
        this.proCostTimeline();
      } else {
        this.projectCostTimeline = {};
      }
    });
  }

  getProjectStat(payload) {
    this.httpservice.postData(payload, requrls.activeproject).subscribe(res => {
      let response = res;
      if (response.success) {
        this.projects = response.data.projects;
        this.proStats = res.data;
      } else {
        this.projects = [];
      }
    });
  }

  pie;

  getProjectSummery() {
    var self = this;
    if (this.pie) {
      this.pie.destroy();
    }
    var pie = (document.getElementById("pie") as any);
    var ctxpie2 = pie.getContext('2d');
    var data = {
      labels: Object.keys(self.projectSummery),
      datasets: [{
        fill: true,
        backgroundColor: ['#ff5050', '#2bcc98', '#fac005', '#886cff'],
        data: Object.values(self.projectSummery),
      }],
    };
    // Notice the rotation from the documentation.
    var options = {
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#000',
          fontFamily: 'Montserrat',
          usePointStyle: true,
        }
      },
      rotation: -0.7 * Math.PI
    };
    // Chart declaration:
    this.pie = new Chart(pie, {
      type: 'doughnut',
      data: data,
      options: options
    });
  }

  myChart1

  getProjectTimeline() {
    var self = this;
    if (this.myChart1) {
      this.myChart1.destroy();
    }
    var myChart1 = (document.getElementById('myChart1') as any).getContext('2d');
    this.myChart1 = new Chart(myChart1, {
      type: 'line',
      data: {
        labels: Object.keys(self.projectTimeline),
        datasets: [{
          label: "Project Timeline",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          pointBackgroundColor: '#fac005',
          borderColor: '#fcdf82',
          pointStyle: 'circle',
          radius: 5,
          data: Object.values(self.projectTimeline),
        }]
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
      },
    });
  }

  generateGraph(data) {
    let mphown = [];
    let mphpan = [];
    let supplier = [];
    let total = [];
    let dyndata = Object.values(data);
    dyndata.forEach(element => {
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          if (key == 'mph_own') {
            mphown.push(element[key])
          } else if (key == 'mph_panel') {
            mphpan.push(element[key])
          } else if (key == 'supplier') {
            supplier.push(element[key])
          } else {
            total.push(element[key])
          }
        }
      }
    });
    return { mphown, mphpan, supplier, total }
  }

  myChart2

  projectCompTimeline() {
    let result = this.generateGraph(this.projectCompleteTimeline);
    var self = this;
    if (this.myChart2) {
      this.myChart2.destroy();
    }
    var myChart2 = (document.getElementById('myChart2') as any).getContext('2d');
    this.myChart2 = new Chart(myChart2, {
      type: 'line',
      data: {
        labels: Object.keys(this.projectCompleteTimeline),
        datasets: [{
          label: "Own Panels",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#a596f5',
          pointBackgroundColor: '#4c2deb',
          data: result.mphown,
          pointStyle: 'circle',
          radius: 5,
        }, {
          label: "MPH Panel",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#95e5cb',
          pointBackgroundColor: '#2bcc98',
          data: result.mphpan,
          pointStyle: 'circle',
          radius: 5,
        }, {
          label: "External Suppliers",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#a7e3fa',
          pointBackgroundColor: '#4fc7f6',
          data: result.supplier,
          pointStyle: 'circle',
          radius: 5,
        }, {
          label: "Total",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#ffa7a7',
          pointBackgroundColor: '#ff5050',
          data: result.total,
          pointStyle: 'circle',
          radius: 5,
        }]
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

  }

  myChart3

  proCostTimeline() {
    let result = this.generateGraph(this.projectCostTimeline);
    if (this.myChart3) {
      this.myChart3.destroy();
    }
    var myChart3 = (document.getElementById('myChart3') as any).getContext('2d');
    this.myChart3 = new Chart(myChart3, {
      type: 'line',
      data: {
        labels: Object.keys(this.projectCostTimeline),
        datasets: [{
          label: "Own Panels",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#a596f5',
          pointBackgroundColor: '#4c2deb',
          data: result.mphown,
          pointStyle: 'circle',
          radius: 5,
        }, {
          label: "MPH Panel",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#95e5cb',
          pointBackgroundColor: '#2bcc98',
          data: result.mphpan,
          pointStyle: 'circle',
          radius: 5,
        }, {
          label: "External Suppliers",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#a7e3fa',
          pointBackgroundColor: '#4fc7f6',
          data: result.supplier,
          pointStyle: 'circle',
          radius: 5,
        }, {
          label: "Total",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#ffa7a7',
          pointBackgroundColor: '#ff5050',
          data: result.total,
          pointStyle: 'circle',
          radius: 5,
        }]
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
  }

  ngOnInit() {
    var self = this;
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
    self.payload['from_date'] = myDate;
    self.payload['to_date'] = new Date();
    self.getDate();
    setTimeout(() => {
      $(function () {
        $('#datetimepicker1').datetimepicker({
          viewMode: 'years',
          format: 'MM/YYYY',
          defaultDate: myDate,
          maxDate: moment(),
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
          viewMode: 'years',
          format: 'MM/YYYY',
          useCurrent: true,
          defaultDate: new Date(),
          maxDate: moment(),
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
  }
}
