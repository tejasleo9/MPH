import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/shared/common.service';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
})
export class AddActivityComponent implements OnInit {


  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    public cs: CommonService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  payload: any = {};
  emailTemplate = [];
  smsTemplate = [];
  panelId;
  activityCounts: any = {};
  quesCat = [];
  addActivity: any = {};
  activityTemp = [];
  temp = [];

  currentActivity;

  preview: any = {};
  call: string;

  getActivity(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.postData(payload, requrls.getactivitytemplate).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.temp = response;
        this.activityTemp = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  getQuesCat(id) {
    let payload = {
      'panel_id' : id
    }
    this.httpservice.getDataWithParams(payload, requrls.panelquestioncategory).subscribe(res => {
      let response = res;
      if (response.success) {
        this.quesCat = response.data.map(option => ({
          value: option.id,
          label: option.name
        }));
      }
    })
  }

  getActivityPanel(e) {
    let found = true;
    if (found) {
      this.temp.forEach(element => {
        if (element != null) {
          if (element.id == e.value) {
            this.emailTemplate = element.EMAIL.map(option => ({
              value: option.id,
              label: option.template_name,
              content: option.content
            }));
            this.smsTemplate = element.SMS.map(option => ({
              value: option.id,
              label: option.template_name,
              content: option.content
            }));
            found = false;
          }
        }
      });
    }
  }

  onChange1() {
    this.getActivityCount();
  }

  selectCategories(e) {
    this.currentActivity = e.value;
    this.getActivityCount();
  }

  getActivityCount() {
    let payload = {
      'panel_id': this.panelId,
      'panel_question_category_id': this.currentActivity == undefined ? undefined : this.currentActivity,
      'from_date': this.cs.formatDate(this.payload.from_date),
      'to_date': this.cs.formatDate(this.payload.to_date),
      'panelist_status': this.addActivity.panelist_status
    }
    this.httpservice.postData(payload, requrls.getactivitycount).subscribe(res => {
      let response = res;
      if (response.success) {
        this.activityCounts = response.data[0];
      }
    })
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    let dropChkArray = [];
    dropChkArray = [
      {
        value: formVal.value.template_category_id,
        key: 'template_category_id'
      },
      {
        value: formVal.value.email_content,
        key: 'email_content'
      }
    ];
    let action = this.route.snapshot.queryParamMap.get("action");
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      if (formVal.form.valid) {
        this.onSubmit(formVal, imgid, lodimgid);
      }
    }
  }

  onSubmit(f, imgid, lodimgid) {
    f.value['panel_id'] = this.panelId;
    this.cs.hideshowImge(imgid, lodimgid, "a");
    let action = this.route.snapshot.queryParamMap.get("action");
    let tempdetail = this.localStoreService.getLocal('panel', 'temp-detail');
    let callTo;
    f.value['name'] = "Das";
    f.value['from_date'] = this.cs.formatDate(this.payload.from_date);
    f.value['to_date'] = this.cs.formatDate(this.payload.to_date);
    f.value['start_date'] = this.cs.formatDate(this.payload.start_date);
    f.value['end_date'] = this.cs.formatDate(this.payload.end_date);
    if (action == 'edit') {
      if (tempdetail != undefined) {
        f.value['id'] = tempdetail.id;
        callTo = this.httpservice.postData(f.value, requrls.edittemplate);
      }
    } else {
      callTo = this.httpservice.postData(f.value, requrls.createactivity);
    }
    callTo.subscribe(res => {
      if (res.success) {
        setTimeout(() => {
          this.cs.back();
        }, 1000);
        this.toastr.success(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  selectedOption(call, template) {
    if (call == 'e') {
      this.preview['email'] = template;
    } else {
      this.preview['sms'] = template;
    }
  }

  previewTemplate(template) {
    if (template == 'e') {
      this.call = 'email';
    } else {
      this.call = 'sms';
    }
    if (this.preview['email'] != undefined || this.preview['sms'] != undefined) {
      $("#previewModal").modal("show");
    } else {
      this.toastr.error("Please select template");
    }
  }

  ngOnInit() {
    var self = this;
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
    this.addActivity.panelist_status = 1;
    self.payload['from_date'] = myDate;
    self.payload['to_date'] = new Date();
    self.payload['start_date'] = myDate;
    self.payload['end_date'] = new Date();
    setTimeout(() => {
      $(function () {
        $('#datepicker').datetimepicker({
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
        $("#datepicker").on("dp.change", function (e) {
          self.payload['from_date'] = e.date;
        });

        $('#datepicker2').datetimepicker({
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
        $("#datepicker2").on("dp.change", function (e) {
          self.payload['to_date'] = e.date;
        });

        $('#datepicker3').datetimepicker({
          format: 'DD-MM-YYYY',
          useCurrent: true,
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
        $("#datepicker3").on("dp.change", function (e) {
          self.payload['start_date'] = e.date;
          self.payload['from_date'] = e.date;
          self.getActivityCount();
        });

        $('#datepicker4').datetimepicker({
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
        $("#datepicker4").on("dp.change", function (e) {
          self.payload['end_date'] = e.date;
          self.payload['to_date'] = e.date;
          self.getActivityCount();
        });
      });
    }, 500);
    let paneldetails = this.localStoreService.getLocal('panel', 'detail');
    if (paneldetails != undefined) {
      this.panelId = paneldetails.id;
      this.getActivity(paneldetails.id);
      this.getActivityCount();
      this.getQuesCat(paneldetails.id);
    }
  }

}
