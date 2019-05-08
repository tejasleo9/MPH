import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "app/shared/common.service";
declare var $: any;
declare var Chart: any;
import * as requrls from "./../service/requrl";
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  constructor(
    private httpservice: HttpService,
    private toastr: ToastrService,
    private cs: CommonService
  ) { }

  prjcosttimeline = "m";
  datas = [];
  selectedData = [];
  widgets = [];
  projectSummryData: any = {};
  projectOverdueData: any = {};
  projectCostData: any = {};
  projectRevenueData: any = {};
  projectRevenueTimeline: any = {};
  panelreq: any = {};
  panelList = [];
  projectCostTimeLine = {};
  prjcost = "m";
  proCostt;
  prjrev = "m";
  revtimeline = "m";
  obj: any = {};

  ngOnInit() {
    this.getWidgetsList();
    this.getDashboardWidgets();
  }

  getWidgetsList() {
    this.httpservice.getData(requrls.getwidget).subscribe(res => {
      if (res.success) {
        this.datas = res.data;
      }
    });
  }

  addWidget(imgid, lodimgid) {
    this.selectedData = this.datas
      .filter(res => {
        if (res.is_added) {
          return res;
        }
      })
      .map(res => {
        return res.widget_id;
      });
    this.addWidgets(imgid, lodimgid);
  }

  toggle(obj) {
    if (obj != null) {
      obj.is_added = !obj.is_added;
    }
  }

  addWidgets(imgid, lodimgid) {
    let payload = {
      widget_id: this.selectedData
    };
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.addwidget).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        this.getDashboardWidgets();
      } else {
        this.toastr.error(res.message);
      }
      $("#addwidget").modal("hide");
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  getWidgets1() {
    ///get-panel-recruitment
    this.httpservice.getData(requrls.getpanelreq).subscribe(res => {
      if (res.success) {
        let data = res.data;

        let today = data.map(res => {
          return res.today;
        });
        let lastsevendays = data.map(res => {
          return res.last_seven_days;
        });
        let colors = data.map(res => {
          return this.cs.getRandomColor();
        });
        let panelname = data.map(res => {
          return res.panel_name;
        });
        this.panelreq = {
          todays: today,
          lastsevendays: lastsevendays,
          colors: colors,
          panelname: panelname
        };
        setTimeout(() => {
          this.reinitilizedata2();
        }, 1000);
      } else {
        this.panelreq = {};
      }
    });
  }

  getWidgets2() {
    // List Panels
    this.httpservice.getData(requrls.getpanelstats).subscribe(res => {
      if (res.success) {
        this.panelList = res.data;
      } else {
      }
    });
  }

  getWidgets3() {
    //Project summary
    this.httpservice.postData({}, requrls.projectsummary).subscribe(res => {
      if (res.success) {
        let data = res.data;

        let country = data.map(res => {
          return res.Country;
        });
        let colors = data.map(res => {
          return this.cs.getRandomColor();
        });
        let active = data.map(res => {
          return res.Active;
        });
        let paused = data.map(res => {
          return res.Paused;
        });
        var total = active.map(function (v, i) {
          return v + this[i];
        }, paused);
        this.projectSummryData = {
          country: country,
          colors: colors,
          active: active,
          paused: paused,
          total: total
        };
        console.log(this.projectSummryData);
        setTimeout(() => {
          this.reinitilizedata();
        }, 1000);
      } else {
      }
    });
  }

  reinitilizedata() {
    var self = this;
    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal2"), {
      type: "horizontalBar",
      data: {
        labels: self.projectSummryData.country,
        datasets: [
          {
            backgroundColor: self.projectSummryData.colors,
            data: self.projectSummryData.active
          }
        ]
      },
      options: {
        showLabelsOnBars: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                steps: 10,
                stepValue: 1,
                max: 100,
                callback: function (value) {
                  return value + "%";
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });

    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal3"), {
      type: "horizontalBar",
      data: {
        labels: self.projectSummryData.country,
        datasets: [
          {
            backgroundColor: self.projectSummryData.colors,
            data: self.projectSummryData.paused
          }
        ]
      },
      options: {
        showLabelsOnBars: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                steps: 10,
                stepValue: 1,
                max: 100,
                callback: function (value) {
                  return value + "%";
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });

    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal1"), {
      type: "horizontalBar",
      data: {
        labels: self.projectSummryData.country,
        datasets: [
          {
            backgroundColor: self.projectSummryData.colors,
            data: self.projectSummryData.total
          }
        ]
      },
      options: {
        showLabelsOnBars: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                steps: 10,
                stepValue: 1,
                max: 100,
                callback: function (value) {
                  return value + "%";
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });
  }

  reinitilizedata2() {
    var self = this;
    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal4"), {
      type: "horizontalBar",
      data: {
        labels: self.panelreq.panelname,
        datasets: [
          {
            backgroundColor: self.panelreq.colors,
            data: self.panelreq.todays
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                steps: 10,
                stepValue: 1,
                max: 100,
                callback: function (value) {
                  return value;
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });

    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal5"), {
      type: "horizontalBar",
      data: {
        // labels: self.panelreq.panelname,
        datasets: [
          {
            backgroundColor: self.panelreq.colors,
            data: self.panelreq.lastsevendays
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                stepSize: 20,
                stepValue: 1,
                // max: 100,
                callback: function (value) {
                  return value;
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });
  }

  getWidgets4() {
    //Project Overdue
    this.httpservice.postData({}, requrls.projectoverdue).subscribe(res => {
      if (res.success) {
        let data = res.data;

        let country = data.map(res => {
          return res.Country;
        });
        let colors = data.map(res => {
          return this.cs.getRandomColor();
        });
        let active = data.map(res => {
          return res.Active;
        });
        let paused = data.map(res => {
          return res.Paused;
        });
        let total = data.map(res => {
          return res.Total;
        });
        this.projectOverdueData = {
          country: country,
          colors: colors,
          active: active,
          paused: paused,
          total: total
        };
        setTimeout(() => {
          this.reinitilizedata3();
        }, 1000);
      } else {
      }
    });
  }

  reinitilizedata3() {
    var self = this;
    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal6"), {
      type: "horizontalBar",
      data: {
        labels: self.projectOverdueData.country,
        datasets: [
          {
            backgroundColor: self.projectOverdueData.colors,
            data: self.projectOverdueData.total
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                stepSize: 20,
                // max: 100,
                callback: function (value) {
                  return value + "%";
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });
    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal7"), {
      type: "horizontalBar",
      data: {
        labels: self.projectOverdueData.country,
        datasets: [
          {
            backgroundColor: self.projectOverdueData.colors,
            data: self.projectOverdueData.active
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                stepSize: 20,
                max: 100,
                callback: function (value) {
                  return value + "%";
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });

    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("bar-chart-horizontal8"), {
      type: "horizontalBar",
      data: {
        labels: self.projectOverdueData.country,
        datasets: [
          {
            backgroundColor: self.projectOverdueData.colors,
            data: self.projectOverdueData.paused
          }
        ]
      },
      options: {
        showLabelsOnBars: true,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
                stepSize: 20,
                max: 100,
                callback: function (value) {
                  return value + "%";
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              barThickness: 10,
              barPercentage: 0.3,
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false // show or hide tooltip
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = "start";
            ctx.textBaseline = "top";
            ctx.FontStyle = "bold";
            ctx.FontColor = "#222";
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      }
    });
  }

  projectDeviation: any = {};

  getWidgets5() {
    //Project deviation widget
    this.httpservice
      .postData({}, requrls.projectdeviationwidget)
      .subscribe(res => {
        if (res.success) {
          let data = res.data;
          let label = Object.keys(data);
          let arrayData = Object.values(data);
          let active = arrayData.map(resp => resp['active']);
          let paused = arrayData.map(resp => resp['pause']);
          let total = arrayData.map(resp => resp['total']);
          this.projectDeviation = {
            'label': label,
            'active': active,
            'paused': paused,
            'total': total,
          };
          console.log(this.projectDeviation);
          setTimeout(() => {
            this.reinitilizedata7();
          }, 1000);
        } else {
        }
      });
  }

  projectdeviation;

  reinitilizedata7() {
    let self = this;
    if (this.projectdeviation) {
      this.projectdeviation.destroy();
    }
    var chartData = {
      labels: self.projectDeviation.label,
      datasets: [{
        type: 'line',
        label: 'Total',
        borderColor: '#29cc97',
        borderWidth: 2,
        fill: false,
        data: self.projectDeviation.total
      }, {
        type: 'bar',
        label: 'Active',
        backgroundColor: '#2d69eb',
        data: self.projectDeviation.active,
        borderColor: 'white',
        borderWidth: 2
      }, {
        type: 'bar',
        label: 'Paused',
        backgroundColor: '#fd5152',
        data: self.projectDeviation.paused
      }]
    };

    var ctx = (document.getElementById('projectdeviation') as any).getContext('2d');
    this.projectdeviation = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }

  getWidgets6() {
    //Active Projects
    this.httpservice
      .postData({}, requrls.getprojectdashboardactiveproject)
      .subscribe(res => {
        if (res.success) {
        } else {
        }
      });
  }

  getWidgets7() {
    //Project cost widget
    this.httpservice.postData({}, requrls.projectcostwidget).subscribe(res => {
      if (res.success) {
        const data = res.data;
        if (data.length > 0) {
          const country = data.map(res => {
            return res.country;
          });
          const costininryear = data.map(res => {
            return res.cureent_year_cost_inr;
          });
          const costininrmonth = data.map(res => {
            return res.cureent_month_cost_inr;
          });
          const costinusdyear = data.map(res => {
            return res.cureent_year_cost_usd;
          });
          const costinusdmonth = data.map(res => {
            return res.cureent_month_cost_usd;
          });
          this.projectCostData = {
            country: country,
            costininrmonth: costininrmonth,
            costinusdmonth: costinusdmonth,
            costininryear: costininryear,
            costinusdyear: costinusdyear
          };
          console.log(this.projectCostData);
          setTimeout(() => {
            this.onChange("m", 0);
          }, 1000);
        }
      } else {
      }
    });
  }

  onChange(call, from) {
    if (from === 0) {
      this.reinitilizedata4(call);
    } else if (from === 1) {
      this.reinitilizedata5(call);
    } else if (from === 2) {
      this.reinitilizedata6(call);
    } else if (from === 3) {
      this.reinitilizedata8(call);
    }
  }

  reinitilizedata4(call) {
    // if (this.projectCostData = {}) {
    //   return;
    // }
    var self = this;
    if (this.proCostt) {
      this.proCostt.destroy();
    }
    var barChartData = {
      labels: self.projectCostData.country,
      datasets: [
        {
          label: "YTD",
          backgroundColor: "#ee6716",
          borderWidth: 1,
          data: call == 'm' ? self.projectCostData.costininryear : self.projectCostData.costinusdyear
        },
        {
          label: "MTD",
          backgroundColor: "#2bcc98",
          borderWidth: 1,
          data: call == 'm' ? self.projectCostData.costininrmonth : self.projectCostData.costinusdmonth
        }
      ]
    };

    var chartOptions = {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    var ctx = (document.getElementById("projectcost") as any).getContext("2d");
    this.proCostt = new Chart(ctx, {
      type: "bar",
      data: barChartData,
      options: chartOptions
    });
  }

  getWidgets8() {
    //Project revenue widget
    this.httpservice
      .postData({}, requrls.projectrevenuewidget)
      .subscribe(res => {
        if (res.success) {
          const data = res.data;
          if (data.length > 0) {
            const panel = data.map(res => {
              return res.panel;
            });
            const revenueininryear = data.map(res => {
              return res.cureent_year_revenue_inr;
            });
            const revenueininrmonth = data.map(res => {
              return res.cureent_month_revenue_inr;
            });
            const revenueinusdyear = data.map(res => {
              return res.cureent_year_revenue_usd;
            });
            const revenueinusdmonth = data.map(res => {
              return res.cureent_month_revenue_usd;
            });
            this.projectRevenueData = {
              panel: panel,
              revenueininrmonth: revenueininrmonth,
              revenueinusdmonth: revenueinusdmonth,
              revenueininryear: revenueininryear,
              revenueinusdyear: revenueinusdyear
            };
            setTimeout(() => {
              this.onChange("m", 1);
            }, 1000);
          }
        } else {
        }
      });
  }

  reinitilizedata5(call) {
    // if (this.projectRevenueData = {}) {
    //   return;
    // }
    var self = this;
    // // tslint:disable-next-line: no-unused-expression
    // tslint:disable-next-line: no-unused-expression
    new Chart(document.getElementById("projectrevenue"), {
      type: "bar",
      data: {
        labels: self.projectRevenueData.panel,
        datasets: [
          {
            label: "INR",
            backgroundColor: "#3e95cd",
            data:
              call == "m"
                ? self.projectRevenueData.revenueininrmonth
                : self.projectRevenueData.revenueininryear
          },
          {
            label: "USD",
            backgroundColor: "#8e5ea2",
            data:
              call == "m"
                ? self.projectRevenueData.revenueinusdmonth
                : self.projectRevenueData.revenueinusdyear
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Population growth (millions)"
        }
      }
    });
  }

  getWidgets9() {
    //Revenue timeline
    let payload = {
      timeline_type: 2
    };
    this.httpservice
      .postData(payload, requrls.projectrevenuetimelinewidget)
      .subscribe(res => {
        if (res.success) {
          const datas = res.data;
          if (Object.values(res.data).length > 0) {
            const label = Object.keys(datas);
            const temp: any = Object.values(datas)[0];
            temp.forEach(element => {
              element["newrevenue_inr"] = [];
              element["newrevenue_usd"] = [];
            });
            for (const key in datas) {
              if (datas.hasOwnProperty(key)) {
                const element = datas[key];
                temp.forEach(res1 => {
                  element.forEach(res => {
                    if (res.panel === res1.panel) {
                      res1.newrevenue_inr.push(res.revenue_inr);
                      res1.newrevenue_usd.push(res.revenue_usd);
                      res1["backcolor"] = this.cs.getRandomColor();
                    }
                  });
                });
              }
            }
            this.projectRevenueTimeline = {
              label: label,
              data: temp
            };
            setTimeout(() => {
              this.onChange("m", 2);
            }, 1000);
          }
        } else {
        }
      });
  }

  reinitilizedata6(call) {
    const newdata = this.projectRevenueTimeline.data.map(res => ({
      label: res.panel,
      backgroundColor: "rgb(0, 0, 0 ,0)",
      borderColor: res.backcolor,
      pointBackgroundColor: res.backcolor,
      data: call === "m" ? res.newrevenue_inr : res.newrevenue_usd,
      pointStyle: "circle",
      radius: 5
    }));
    console.log(this.projectRevenueTimeline);
    let self = this;
    var ctx3 = (document.getElementById("myChart3") as any).getContext("2d");
    var chart3 = new Chart(ctx3, {
      type: "line",
      data: {
        labels: self.projectRevenueTimeline.label,
        datasets: newdata
      },
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        legend: {
          position: "bottom",
          labels: {
            fontColor: "#000",
            fontFamily: "Montserrat",
            usePointStyle: true
          }
        },
        scales: {
          yAxes: [
            {
              barThickness: 5,
              barPercentage: 0.3,
              ticks: {
                callback: function (value, index, values) {
                  return call === 'm' ? 'INR ' + value : 'USD ' + value;
                }
              }
            }
          ]
        }
      }
    });
  }

  deleteWidget(obj) {
    this.obj = { ...obj };
    $("#confirmBox").modal("show");
  }

  deleteWidgets(imgid, lodimgid) {
    let payload = {
      widget_id: this.obj.widget_id
    };
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.deletewidget).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        this.getDashboardWidgets();
        this.getWidgetsList();
      } else {
        this.toastr.error(res.message);
      }
      $("#confirmBox").modal("hide");
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  projectcosttimelinewidget: any = {};

  getWidgets10() {
    //Project cost timeline widget
    let payload = {
      timeline_type: 1
    };
    this.httpservice
      .postData(payload, requrls.projectcosttimelinewidget)
      .subscribe(res => {
        if (res.success) {
          const datas = res.data;
          if (Object.values(res.data).length > 0) {
            const label = Object.keys(datas);
            const temp: any = Object.values(datas)[0];
            temp.forEach(element => {
              element["newcost_inr"] = [];
              element["newcost_usd"] = [];
            });
            for (const key in datas) {
              if (datas.hasOwnProperty(key)) {
                const element = datas[key];
                temp.forEach(res1 => {
                  element.forEach(res => {
                    if (res.panel === res1.panel) {
                      res1.newcost_inr.push(res.cost_inr);
                      res1.newcost_usd.push(res.cost_usd);
                      res1["backcolor"] = this.cs.getRandomColor();
                    }
                  });
                });
              }
            }
            this.projectcosttimelinewidget = {
              label: label,
              data: temp
            };
            setTimeout(() => {
              this.onChange("m", 3);
            }, 1000);
          }
        } else {
        }
      });
  }

  reinitilizedata8(call) {
    const newdata = this.projectcosttimelinewidget.data.map(res => ({
      label: res.country,
      backgroundColor: "rgb(0, 0, 0 ,0)",
      borderColor: res.backcolor,
      pointBackgroundColor: res.backcolor,
      data: call === "m" ? res.newcost_inr : res.newcost_usd,
      pointStyle: "circle",
      radius: 5
    }));
    console.log(this.projectcosttimelinewidget);
    let self = this;
    var ctx3 = (document.getElementById("myChart4") as any).getContext("2d");
    var chart3 = new Chart(ctx3, {
      type: "line",
      data: {
        labels: self.projectcosttimelinewidget.label,
        datasets: newdata
      },
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        legend: {
          position: "bottom",
          labels: {
            fontColor: "#000",
            fontFamily: "Montserrat",
            usePointStyle: true
          }
        },
        scales: {
          yAxes: [
            {
              barThickness: 5,
              barPercentage: 0.3,
              ticks: {
                callback: function (value, index, values) {
                  return call === 'm' ? 'INR ' + value : 'USD ' + value;
                }
              }
            }
          ]
        }
      }
    });
  }

  getDashboardWidgets() {
    this.httpservice.postData({}, requrls.getdashboardwidget).subscribe(res => {
      if (res.success) {
        this.widgets = res.data;
        console.log(res);
        this.widgets.forEach(res => {
          res["is_visible"] = true;
        });
        this.widgets.forEach(res => {
          if (res.name == "Widget 1") {
            this.getWidgets1();
          }
          if (res.name == "Widget 2") {
            this.getWidgets2();
          }
          if (res.name == "Widget 3") {
            this.getWidgets3();
          }
          if (res.name == "Widget 4") {
            this.getWidgets4();
          }
          if (res.name == "Widget 5") {
            this.getWidgets5();
          }
          if (res.name == "Widget 6") {
            this.getWidgets6();
          }
          if (res.name == "Widget 7") {
            this.getWidgets7();
          }
          if (res.name == "Widget 8") {
            this.getWidgets8();
          }
          if (res.name == "Widget 9") {
            this.getWidgets9();
          }
          if (res.name == "Widget 10") {
            this.getWidgets10();
          }
        });
      } else {
        this.widgets = [];
      }
    });
  }
}

// widget 2, 5 graph not in design
