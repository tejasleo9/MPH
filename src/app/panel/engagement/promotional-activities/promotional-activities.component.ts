import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router } from '@angular/router';
import { CommonService } from 'app/shared/common.service';
import 'rxjs/add/operator/debounceTime';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
declare var $: any;
declare var CanvasJS: any;
declare var $: any;
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';
@Component({
  selector: 'app-promotional-activities',
  templateUrl: './promotional-activities.component.html',
  styleUrls: ['./promotional-activities.component.css']
})
export class PromotionalActivitiesComponent implements OnInit {

  activityLists: any = [];
  panelId: any;
  activityPayload = {};
  disablelink = true;
  selectedDatas = [];
  order = "";
  reverse: boolean = false;
  payload: any = {};
  popupMess;
  statsObj: any = {};

  @ViewChild('questionInput') questionInput: ElementRef;
  public input$: Observable<string>;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private cs: CommonService
  ) { }

  ngOnInit() {
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
      this.activityListFn(panelDtl.id);
    }
  }

  activityListFn(id) {
    let payload = {
      'panel_id': id
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listpractivity).subscribe(res => {
      let response = res.data;
      this.activityLists = response;
      this.spinnerService.hide();
    });
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

  ngAfterViewInit() {
    this.input$ = fromEvent(this.questionInput.nativeElement, 'input')
      .pipe(
        debounceTime(1500),
        map((e: KeyboardEvent) => e.target['value'])
      );
    this.input$.subscribe((val: string) => {
      let payload = {
        'name': val == '' ? undefined : val,
        'panel_id': this.panelId
      }
      this.spinnerService.show();
      this.httpservice.postData(payload, requrls.listpractivity)
        .subscribe(res => {
          let response = res;
          if (response.status_code == 200) {
            let response = res.data;
            this.activityLists = response;
          } else {
            this.activityLists = [];
          }
          this.spinnerService.hide();
        });
    });
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

  addNew() {
    this.localStoreService.removeLocalStorageObj('panel', 'activity-details');
    this.localStoreService.lastAction('last-action', 'new');
    this.router.navigate(['/panel/engagement/promotional-activity/add-edit'], { queryParams: { action: 'new' } });
  }

  edit(obj) {
    if (obj != null) {
      this.localStoreService.setLocal('panel', 'activity-details', obj);
      this.router.navigate(['/panel/engagement/promotional-activity/add-edit'], { queryParams: { action: 'edit' } });
    }
  }


  getStats(obj) {
    var self = this;
    let payload = {
      'activity_id': obj.id,
      'panel_id': this.panelId
    }
    this.httpservice.postData(payload, requrls.activitystats).subscribe(res => {
      let response = res;
      let self = this;
      if (response.success) {
        let data = response.data.activityStats;
        this.statsObj = {
          'email': data[0],
          'SMS': data[1],
        }
        setTimeout(() => {
          window.onload = function () {
            let chart = new CanvasJS.Chart("test2", {
              animationEnabled: true,
              exportEnabled: true,
              theme: "light1",
              title: {
                text: "Panel Analysis",
              },
              data: [{
                type: "pyramid",
                yValueFormatString: "#\"%\"",
                indexLabelFontColor: "black",
                valueRepresents: "area",
                indexLabelPlacement: "outside",
                indexLabelFontSize: 14,
                indexLabel: "{label} - {y}",
                reversed: true,
                dataPoints: [{
                  y: +self.statsObj.email.TotalSent,
                  label: "Total Spent",
                  color: "#2bcc98",
                },
                {
                  y: +self.statsObj.email.Openrate,
                  label: "Open Rate",
                  color: "#4c84ff",
                },
                {
                  y: +self.statsObj.email.Clickrate,
                  label: "Click Rate",
                  color: "#896cff",
                },
                {
                  y: +self.statsObj.email.Clickrate,
                  label: "Conversion",
                  color: "#c66fd5",
                }
                ]
              }]
            });
            chart.render();
          }
        }, 1000)
        // this.generateFunction(this.statsObj);
        $("#statsModel").modal("show");
      } else {
        this.toastr.error(response.message);
      }
    })

  }


  generateFunction(statsObj) {

  }

  delete(obj, call) {
    this.payload = {};
    this.payload['panel_id'] = this.panelId;
    if (call == 'i') {
      this.payload['activity_id'] = obj.id;
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#confirmBox').modal('show');
        this.payload['activity_id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletepractivity).subscribe(res => {
      let response = res;
      if (response.status_code == 200) {
        this.activityLists.forEach(ele1 => {
          if (ele1.id === this.payload['activity_id']) {
            let index = this.activityLists.indexOf(ele1);
            this.activityLists.splice(index, 1);
          }
        });
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  selectAll(status) {
    this.selectedDatas = this.activityLists.map(res => res.id);
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

}
