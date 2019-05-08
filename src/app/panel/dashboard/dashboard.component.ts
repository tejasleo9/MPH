import { Component, OnInit } from '@angular/core';
declare var Chart: any;
declare var CanvasJS: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/shared/common.service';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../store/requrl';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private cs: CommonService,
    private route: ActivatedRoute
  ) {
  }

  panelId;
  panelStat: any = {};
  returnData;

  getPanelStats(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.dashboardcount).subscribe(res => {
      let response = res;
      if (response.success) {
        this.panelStat = response.data;
      } else {
        this.toastr.error(response.message)
      }
    })
  }

  getPanelUGraph(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.panelusagegraph).subscribe(res => {
      let response = res;
      if (response.success) {
        this.panelStat = response.data;
        this.generateGraph(this.panelStat);
      } else {
        this.toastr.error(response.message)
      }
    })
  }

  panelroadmap: any = {};

  getPanelRoadmap(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.dashboardroadmap).subscribe(res => {
      let response = res;
      if (response.success) {
        console.log(res);
        let datas = res.data;
        let title = datas.map(res => {
          return res.title
        });
        let value = datas.map(res => {
          return res.value;
        });
        let color = datas.map(res => ({
          color: this.cs.getRandomColor()
        })).map(res => {
          return res.color;
        });
        console.log(color);
        this.panelroadmap = { title, value, color };
        this.generateroadmapgraph();
      } else {
        this.toastr.error(response.message)
      }
    })
  }

  generateroadmapgraph() {
    var self = this;
    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal4"), {
      type: 'horizontalBar',
      data: {
        labels: ["Avg. Lifetime of a Panelist", "Avg. Time to Reach Redemtion Milestone",
          "Avg. Time to Complete First Survey", "Avg. Time to Receive the First Survey Invitations ",
          "Avg. Time to Complete the Profile"
        ],
        datasets: [{
          label: "Population (millions)",
          FontColor: '#222',
          backgroundColor: ["#ff9f84", "#ff5050", "#c66fd5", "#4c84ff", "#2bcc98"],
          data: self.panelroadmap.value,
          radius: 5,
        }],
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: true
        },
        title: {
          fontStyle: 'bold',
          FontColor: '#222',
          display: true,
          position: 'bottom',
          fontSize: 16,
        },
        scales: {
          yAxes: [{
            barThickness: 35,
            barPercentage: 0.3,
          }],
          xAxes: [{
            position: 'top',
            ticks: {
              mirror: true,
              callback: function (value) {
                return value
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage',
            },
          }],
        },
        tooltips: {
          enabled: true // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
              Chart.defaults
                .global.defaultFontStyle, Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.FontStyle = 'bold';
            ctx.FontColor = '#222';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index] + '%';
                ctx.fillText(data, bar._model.x, bar._model.y -
                  5);
              });
            });
          },
        },
      },
    });
  }

  getRrTimeline(id) {
    let d = new Date();
    let n = d.getFullYear();
    let payload = {
      'panel_id': id,
      'year': n
    }
    this.httpservice.postData(payload, requrls.rrtimelinegraph).subscribe(res => {
      let response = res;
      let datas = [
        {
          "01-18": "10",
          "02-18": "14",
          "03-18": "13",
          "04-18": "10",
        }
      ]
      var ctx8 = (document.getElementById('myChart8') as any).getContext('2d');
      var chart3 = new Chart(ctx8, {
        type: 'line',
        data: {
          labels: Object.keys(datas[0]),
          datasets: [{
            label: "Stared",
            backgroundColor: 'rgb(0, 0, 0 ,0)',
            borderColor: '#a596f5',
            pointBackgroundColor: '#4c2deb',
            data: Object.values(datas[0]),
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
      // if(response.success){
      // }
    })
  }

  getProfileDep(id) {
    let payload = {
      'panel_id': id,
      'flag': 0
    }
    this.httpservice.postData(payload, requrls.profiledepthdepthbtcat).subscribe(res => {
      let datas = [
        { "category": "Household", "completion": "14%" },
        { "category": "Education", "completion": "64%" },
        { "category": "Occupation", "completion": "44%" },
        { "category": "Media", "completion": "44%" },
      ]
      var diff = (document.getElementById('myChart3') as any).getContext('2d');
      var chart3 = new Chart(diff, {
        type: 'line',
        data: {
          labels: datas.map(res => res.category),
          datasets: [{
            label: "Invitation Sent",
            backgroundColor: 'rgb(0, 0, 0 ,0)',
            borderColor: '#a596f5',
            pointBackgroundColor: '#4c2deb',
            data: datas.map(res => res.completion),
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
    })
  }

  generateGraph(data) {
    let fordate = [];
    let surveyinvites_sent = [];
    let startedsurveys = [];
    let completedsurveys = [];
    setTimeout(() => {
      data.forEach(ele1 => {
        if (ele1.hasOwnProperty("for_date")) {
          fordate.push(ele1["for_date"]);
        }
        if (ele1.hasOwnProperty("survey_invites_sent")) {
          surveyinvites_sent.push(ele1["survey_invites_sent"]);
        }
        if (ele1.hasOwnProperty("started_surveys")) {
          startedsurveys.push(ele1["started_surveys"]);
        }
        if (ele1.hasOwnProperty("completed_surveys")) {
          completedsurveys.push(ele1["completed_surveys"]);
        }
      });
      var ctx3 = (document.getElementById('myChart4') as any).getContext('2d');
      var chart3 = new Chart(ctx3, {
        type: 'line',
        data: {
          labels: fordate,
          datasets: [{
            label: "Invitation Sent",
            backgroundColor: 'rgb(0, 0, 0 ,0)',
            borderColor: '#4c2deb',
            pointBackgroundColor: '#4c2deb',
            data: surveyinvites_sent,
            pointStyle: 'circle',
            radius: 5,
          }, {
            label: "Started",
            backgroundColor: 'rgb(0, 0, 0 ,0)',
            borderColor: '#2bcc98',
            pointBackgroundColor: '#2bcc98',
            data: startedsurveys,
            pointStyle: 'circle',
            radius: 5,
          }, {
            label: "Completes",
            backgroundColor: 'rgb(0, 0, 0 ,0)',
            borderColor: '#ff5050',
            pointBackgroundColor: '#ff5050',
            data: completedsurveys,
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
    }, 2000);
  }

  agedistribution: any = {};
  regiondistribution: any = {};
  genderdistribution: any = {};

  getPanelDis(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.paneldisbyage).subscribe(res => {
      console.log(res);
      if (res.success) {
        let datas = res.data;
        let agedis = datas.age_distribution;
        let genderdis = datas.gender_distribution;
        let regiondis = datas.region_distribution;
        let temp: any = Object.values(agedis);
        let temp2: any = Object.values(genderdis);
        let agerange = temp.map(res => {
          return res.age_range
        })
        let census = temp.map(res => {
          return res.census
        })
        let panel = temp.map(res => {
          return res.panel
        })
        this.agedistribution = { agerange, census, panel };

        let gender = temp2.map(res => {
          return res.gender
        })
        let gencensus = temp2.map(res => {
          return res.census
        })
        let genpanel = temp2.map(res => {
          return res.panel
        })
        this.genderdistribution = { gender, gencensus, genpanel };

        let region = regiondis.map(res => {
          return res.region
        })
        let regcensus = regiondis.map(res => {
          return res.census
        })
        let regpanel = regiondis.map(res => {
          return res.panel
        })
        this.regiondistribution = { region, regcensus, regpanel };
        console.log(agerange);
        this.initilizegraph()
      }
    })
  }

  initilizegraph() {
    var self = this;
// tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal1"), {
      type: 'horizontalBar',
      data: {
        labels: self.regiondistribution.region,
        datasets: [
          {
            label: "Census",
            backgroundColor: "#3e95cd",
            data: self.regiondistribution.regcensus
          }, {
            label: "Panel",
            backgroundColor: "#8e5ea2",
            data: self.regiondistribution.regpanel
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        title: {
          fontStyle: 'bold',
          FontColor: '#222',
          display: true,
          position: 'bottom',
          fontSize: 14,
          text: 'Region distribution'
        },
        scales: {
          yAxes: [{
            barThickness: 15,
            barPercentage: 0.3,
          }],
          xAxes: [{
            position: 'top',
            ticks: {
              stepSize: 25,
              mirror: true,
              min: 0,
              max: 100,
              callback: function (value) {
                return value + "%"
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage',
            },
          }],
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
              Chart.defaults
                .global.defaultFontStyle, Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.FontStyle = 'bold';
            ctx.FontColor = '#222';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index] + '%';
                ctx.fillText(data, bar._model.x, bar._model.y -
                  5);
              });
            });
          },
        },
      },
    });

// tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal2"), {
      type: 'horizontalBar',
      data: {
        labels: self.agedistribution.agerange,
        datasets: [
          {
            label: "Census",
            backgroundColor: "#3e95cd",
            data: self.agedistribution.census
          }, {
            label: "Panel",
            backgroundColor: "#8e5ea2",
            data: self.regiondistribution.panel
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        title: {
          fontStyle: 'bold',
          FontColor: '#222',
          display: true,
          position: 'bottom',
          fontSize: 14,
          text: 'Age distribution'
        },
        scales: {
          yAxes: [{
            barThickness: 15,
            barPercentage: 0.3,
          }],
          xAxes: [{
            position: 'top',
            ticks: {
              stepSize: 25,
              mirror: true,
              min: 0,
              max: 100,
              callback: function (value) {
                return value + "%"
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage',
            },
          }],
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
              Chart.defaults
                .global.defaultFontStyle, Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.FontStyle = 'bold';
            ctx.FontColor = '#222';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index] + '%';
                ctx.fillText(data, bar._model.x, bar._model.y -
                  5);
              });
            });
          },
        },
      },
    });

    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal3"), {
      type: 'horizontalBar',
      data: {
        labels: self.genderdistribution.gender,
        datasets: [
          {
            label: "Census",
            backgroundColor: "#3e95cd",
            data: self.genderdistribution.gencensus
          }, {
            label: "Panel",
            backgroundColor: "#8e5ea2",
            data: self.genderdistribution.genpanel
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        title: {
          fontStyle: 'bold',
          FontColor: '#222',
          display: true,
          position: 'bottom',
          fontSize: 14,
          text: 'Gender distribution'
        },
        scales: {
          yAxes: [{
            barThickness: 15,
            barPercentage: 0.3,
          }],
          xAxes: [{
            position: 'top',
            ticks: {
              stepSize: 25,
              mirror: true,
              min: 0,
              max: 100,
              callback: function (value) {
                return value + "%"
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage',
            },
          }],
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
              Chart.defaults
                .global.defaultFontStyle, Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.FontStyle = 'bold';
            ctx.FontColor = '#222';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index] + '%';
                ctx.fillText(data, bar._model.x, bar._model.y -
                  5);
              });
            });
          },
        },
      },
    });
  }

  getPanelana(id) {
    let payload = {
      'panel_id': id,
      'flag': 0
    }
    this.httpservice.postData(payload, requrls.panelanastats).subscribe(res => {
      let response = res;
      if (response.success) {
        window.onload = function () {
          var chart = new CanvasJS.Chart("chartContainer-dashbord", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1",
            // title: {
            //   text: "Panel Analysis",
            // },
            data: [{
              type: "pyramid",
              // yValueFormatString: "#\"%\"",
              indexLabelFontColor: "black",
              valueRepresents: "area",
              indexLabelPlacement: "outside",
              indexLabelFontSize: 18,
              indexLabel: "{label} - {y}",
              reversed: true,
              dataPoints: [{
                y: response.data.awareness,
                label: "Unique Page Visitors",
                color: "#2bcc98",
              },
              {
                y: response.data.acquisition,
                label: "Signed Opted In",
                color: "#4c84ff",
              },
              {
                y: response.data.activation,
                label: "Double Opted In",
                color: "#896cff",
              },
              {
                y: response.data.retention,
                label: "Responsive Panelists",
                color: "#c66fd5",
              },
              {
                y: response.data.revenue,
                label: "Unique Completes",
                color: "#ff5050",
              },
              {
                y: response.data.referral,
                label: "Successful Referrals",
                color: "#ff9f84",
              }
                // { y: 5, label: "Purchased" }
              ]
            }]
          });
          chart.render();
        }
      } else {
        this.toastr.error(response.message);
      }
    })
  }


  getAppUses(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.getappusersbypanel).subscribe(res => {
      let respose = res;
      if (respose.success) {
        new Chart(document.getElementById("doughnut-chart"), {
          type: 'doughnut',
          animationEnabled: true,
          exportEnabled: true,
          data: {
            labels: ["Android Users", "ISO users"],
            datasets: [{
              label: "Population (millions)",
              backgroundColor: ["#ff5050", "#c66fd5"],
              data: [respose.data.android_percent, respose.data.ios_percent],
              indexLabelFontSize: 14,
            }]
          },
          options: {
            title: {
              display: true,
              text: 'APP USER'
            }
          }
        });
      }
    })
  }

  getPanAc(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.anelactivitygrapth).subscribe(res => {
    })
  }

  getPanelService
  ngAfterViewInit(): void {
    var self = this;
    var ctx2 = (document.getElementById('myChart2') as any).getContext('2d');
    var chart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        datasets: [{
          label: "Started",
          backgroundColor: 'rgb(0, 0, 0 ,0)',
          borderColor: '#a7e3fa',
          pointBackgroundColor: '#4fc7f6',
          data: [10, 15, 65, 50, 95, 80],
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
    // var ctx2 = (document.getElementById('myChart6') as any).getContext('2d');
    // var chart2 = new Chart(ctx2, {
    //   type: 'line',
    //   data: {
    //     labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    //     datasets: [{
    //       label: "Complete",
    //       backgroundColor: 'rgb(0, 0, 0 ,0)',
    //       borderColor: '#2bcc98',
    //       pointBackgroundColor: '#2bcc98',
    //       data: [10, 15, 65, 50, 95, 80],
    //       pointStyle: 'circle',
    //       radius: 5,
    //     },]
    //   },
    //   options: {
    //     elements: {
    //       line: {
    //         tension: 0
    //       }
    //     },
    //     legend: {
    //       position: 'bottom',
    //       labels: {
    //         fontColor: '#000',
    //         fontFamily: 'Montserrat',
    //         usePointStyle: true,
    //       }
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });

    // var ctx3 = (document.getElementById('myChart7') as any).getContext('2d');
    // var chart3 = new Chart(ctx3, {
    //   type: 'line',
    //   data: {
    //     labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    //     datasets: [{
    //       label: "Invitation Sent",
    //       backgroundColor: 'rgb(0, 0, 0 ,0)',
    //       borderColor: '#ff5050',
    //       pointBackgroundColor: '#ff5050',
    //       data: [0, 1550, 500, 850, 550, 500],
    //       pointStyle: 'circle',
    //       radius: 5,
    //     },]
    //   },
    //   options: {
    //     elements: {
    //       line: {
    //         tension: 0
    //       }
    //     },
    //     legend: {
    //       position: 'bottom',
    //       labels: {
    //         fontColor: '#000',
    //         fontFamily: 'Montserrat',
    //         usePointStyle: true,
    //       }
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });
  }

  ngOnInit() {
    let paneldetails = this.localStoreService.getLocal('panel', 'detail');
    if (paneldetails != undefined) {
      this.panelId = paneldetails.id;
      this.getPanelStats(paneldetails.id);
      this.getPanelUGraph(paneldetails.id);
      this.getRrTimeline(paneldetails.id);
      this.getProfileDep(paneldetails.id);
      this.getPanelDis(paneldetails.id);
      this.getPanelana(paneldetails.id);
      this.getAppUses(paneldetails.id);
      this.getPanAc(paneldetails.id);
      this.getPanelRoadmap(paneldetails.id);
    }
  }

}
