import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { HttpService } from 'app/store/http/http.service';
declare var $: any;
declare var Chart: any;
import * as moment from 'moment';
import * as requrls from './../store/requrl';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    panelDetail;
    earnStats;
    mnthyr = new Date();
    lifeinr;
    lifeusd;
    lifeinrkey = [];
    lifeinrval = [];

    constructor(
        private httpservice: HttpService,
        private spinnerService: Ng4LoadingSpinnerService,
        private toastr: ToastrService,
        private localStoreService: LocalstoreService,
        private cs: CommonService
    ) { }

    ngOnInit() {
        var self = this;
        let pdetail = this.localStoreService.getLocal('panel', 'detail');
        if (pdetail != undefined || pdetail != null) {
            this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
        }

        setTimeout(() => {
            $(document).ready(function () {
                $('.rch-ind').select2();
            });

            $(function () {
                $('#datepicker').datetimepicker({
                    format: 'MM-YYYY',
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
                $("#datepicker").on("dp.change", function (e) {
                    self.mnthyr = e.date;
                    self.getEarnStatsFn(e.date);
                });

            });

            new Chart(document.getElementById("bar-chart-horizontal2"), {
                type: 'horizontalBar',
                data: {
                    labels: ["Africa", "Asia", "Europe", "Latin America"],
                    datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#fac005", "#4fc7f6", "#ff5050", "#4c2deb"],
                        data: [500, 250, 750, 1000]
                    }]
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
                        fontSize: 16,
                        text: 'YTD Sales Per Panel'
                    },
                    scales: {
                        yAxes: [{
                            barThickness: 10,
                            barPercentage: 0.3,
                        }],
                        xAxes: [{
                            position: 'top',
                            ticks: {
                                stepSize: 200,
                                mirror: true,
                                min: 0,
                                max: 1200,
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

            new Chart(document.getElementById("bar-chart-horizontal3"), {
                type: 'horizontalBar',
                data: {
                    labels: ["Africa", "Asia", "Europe", "Latin America"],
                    datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#fac005", "#4fc7f6", "#ff5050", "#4c2deb"],
                        data: [100, 50, 150, 200]
                    }]
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
                        fontSize: 16,
                        text: 'YTD Sales Per Panel'
                    },
                    scales: {
                        yAxes: [{
                            barThickness: 10,
                            barPercentage: 0.3,
                        }],
                        xAxes: [{
                            position: 'top',
                            ticks: {
                                stepSize: 100,
                                mirror: true,
                                min: 0,
                                max: 500,
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

        }, 10);

        this.getEarnStatsFn(this.mnthyr);

    }

    getEarnStatsFn(date) {
        console.log(date);
        this.spinnerService.show();
        // this.payload['panel_id'] = this.panelDetail['id'];
        // console.log(this.payload);
        let payload = { 'month_year': this.cs.formatDateMonthYear(date) };
        this.httpservice.postData(payload, requrls.earningstats).subscribe(res => {
            // console.log(res);
            if (res.success) {
                let response = res.data;
                this.earnStats = response.overall.count;

                this.lifeinr = response.sales_per_panel.mtd.cost_inr;
                this.lifeusd = response.sales_per_panel.mtd.cost_usd;

                let key;
                for (key in this.lifeinr) {
                    if (this.lifeinr.hasOwnProperty(key)) {
                        this.lifeinrkey.push(key);
                        this.lifeinrval.push(this.lifeinr[key]);
                    }
                }

                console.log(this.lifeinrval);

                setTimeout(() => {
                    new Chart(document.getElementById("bar-chart-horizontal1"), {
                        type: 'horizontalBar',
                        data: {
                            labels: this.lifeinrkey,
                            datasets: [{
                                label: "Population (millions)",
                                FontColor: '#222',
                                backgroundColor: ["#fac005", "#4fc7f6", "#ff5050", "#4c2deb"],
                                data: this.lifeinrval,
                                radius: 5,
                            }]
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
                                fontSize: 16,
                                text: 'November Sales Per Panel'
                            },
                            scales: {
                                yAxes: [{
                                    barThickness: 10,
                                    barPercentage: 0.3,
                                }],
                                xAxes: [{
                                    position: 'top',
                                    ticks: {
                                        stepSize: 50,
                                        mirror: true,
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
                }, 10);

            } else {
                this.toastr.error(res.message);
            }
            this.spinnerService.hide();
        });
    }

    onChange(val, call) {
        let payload = {
            'timeline_type': val,
            'month_year': this.cs.formatDateMonthYear(this.mnthyr)
        }
        this.httpservice.postData(payload, requrls.earningstatstimeline).subscribe(res => {
            console.log(res);
            let response = res;
            if (response.success) {
                this.generateMap(response.data)
            }
        })
    }


    generateMap(data) {

        console.log(data);

        // function getRandomInt(max, min) {
        //     return Math.floor(Math.random() * (max - min + 1) + min);
        // }

        // console.log(getRandomInt(99, 10));

        // {
        //     "success": true,
        //     "message": "Data fetched successfully.",
        //     "data": {
        //         "Q3-2018": {
        //             "S-Test-p5": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             },
        //             "zippy": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             },
        //             "Narendra Borse1": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             }
        //         },
        //         "Q4-2018": {
        //             "S-Test-p5": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             },
        //             "zippy": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             },
        //             "Narendra Borse1": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             }
        //         },
        //         "Q1-2019": {
        //             "S-Test-p5": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             },
        //             "zippy": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             },
        //             "Narendra Borse1": {
        //                 "cost_inr": 0,
        //                 "cost_usd": 0,
        //                 "count": 0
        //             }
        //         }
        //     },
        //     "status_code": 200

        // dyndata.forEach(element => {
        //     for (const key in element) {
        //         if (element.hasOwnProperty(key)) {
        //             if (key == 'mph_own') {
        //                 mphown.push(element[key])
        //             } else if (key == 'mph_panel') {
        //                 mphpan.push(element[key])
        //             } else if (key == 'supplier') {
        //                 supplier.push(element[key])
        //             } else {
        //                 total.push(element[key])
        //             }
        //         }
        //     }
        // });


        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


        let final_array = [];

        console.log(Object.values(data));
        let mapData = Object.values(data);
        let labels = Object.keys(mapData[0]);
        console.log(labels);
        let obj = {};
        this.getData(mapData, "zippy")
        // labels.forEach((ele, index) => {
        //     let color = getRandomColor();
        //     obj['label'] = ele
        //     obj['backgroundColor'] = 'rgb(0, 0, 0 ,0)';
        //     obj['borderColor'] = color
        //     obj['pointBackgroundColor'] = color
        //     obj['data'] =
        //         obj['pointStyle'] =
        //         obj['radius'] =
        // })


        // mapData.forEach((ele, index) => {
        //     if (index == 0) {
        //         labels = Object.keys(ele);
        //         console.log(labels);
        //     }

        // })
        // for (const key in data) {
        //     if (data.hasOwnProperty(key)) {
        //         const element = data[key];
        //         labels = Object.keys(element);
        //         console.log();
        //         // final_array
        //     }
        // }

        // var ctx3 = (document.getElementById('myChart3') as any).getContext('2d');
        // var chart3 = new Chart(ctx3, {
        //     type: 'line',
        //     data: {
        //         labels: Object.keys(data),
        //         datasets: [{
        //             label: "ZIppy Opinion-IN",
        //             backgroundColor: 'rgb(0, 0, 0 ,0)',
        //             borderColor: '#4c2deb',
        //             pointBackgroundColor: '#4c2deb',
        //             data: [0, 150, 100, 150, 100, 150, 0, 80, 90, 100],
        //             pointStyle: 'circle',
        //             radius: 5,
        //         }, {
        //             label: "ZIppy Opinion-USA",
        //             backgroundColor: 'rgb(0, 0, 0 ,0)',
        //             borderColor: '#2bcc98',
        //             pointBackgroundColor: '#2bcc98',
        //             data: [90, 75, 55, 40, 75, 120, 180, 90, 75, 55],
        //             pointStyle: 'circle',
        //             radius: 5,
        //         }, {
        //             label: "MHO",
        //             backgroundColor: 'rgb(0, 0, 0 ,0)',
        //             borderColor: '#ff5050',
        //             pointBackgroundColor: '#ff5050',
        //             data: [0, 15, 85, 40, 90, 70, 120, 90, 75, 250],
        //             pointStyle: 'circle',
        //             radius: 5,
        //         }, {
        //             label: "MWP",
        //             backgroundColor: 'rgb(0, 0, 0 ,0)',
        //             borderColor: '#4fc7f6',
        //             pointBackgroundColor: '#4fc7f6',
        //             data: [150, 50, 50, 150, 100, 120, 10, 90, 75, 155],
        //             pointStyle: 'circle',
        //             radius: 5,
        //         }]
        //     },
        //     options: {
        //         elements: {
        //             line: {
        //                 tension: 0
        //             }
        //         },
        //         legend: {
        //             position: 'bottom',
        //             labels: {
        //                 fontColor: '#000',
        //                 fontFamily: 'Montserrat',
        //                 usePointStyle: true,
        //             }
        //         }
        //     }
        // });

    }

    getData(mapData, data) {
        mapData.forEach(element => {
            element['value'] = [];
        });
        console.log(mapData);
        mapData.forEach(res => {
            for (const key in res) {
                console.log(key);
                if (res.hasOwnProperty(key)) {
                    const element = res[key];
                    if (key == data) {
                        res.value.push(element);
                    }
                    // console.log(key);
                }
            }
        })
        console.log(mapData);
    }

}
