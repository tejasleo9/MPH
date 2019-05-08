import { Component, OnInit } from "@angular/core";
declare var $: any;
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from "../../../shared/localstore.service";
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";
@Component({
  selector: "app-survey",
  templateUrl: "./survey.component.html",
  styleUrls: ["./survey.component.css"]
})
export class SurveyComponent implements OnInit {
  proname;
  hideShow;
  urlType = 0;
  payload = {};
  target_grp_id;
  input_file = new FormData();
  generate_url;
  surveyLinks;
  project_id;
  action;
  project_status;
  lastAction = this.localStoreService.getLastAction('last-action');

  filename;
  eventVar;

  constructor(
    private httpservice: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService
  ) { }

  ngOnInit() {
    let localStoreDetail = this.localStoreService.getLocal('project', 'detail');
    this.project_id = +localStoreDetail.id;
    this.project_status = localStoreDetail.status;
    this.proname = localStoreDetail.name;
    let localStoreTgDetail = this.localStoreService.getLocal('target-group', 'detail');
    if (localStoreTgDetail == undefined) {
      setTimeout(() => {
        this.toastr.error('Please create Target group');
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    let action = this.route.snapshot.queryParamMap.get('action');
    this.action = action;
    this.getSurveyLinks();
  }

  getData(data) {
    this.payload['generate_url'] = data;
  }

  onSubmitClik(formVal) {
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (formVal.form.valid == true) {
      this.generateUrl();
    }
    else {
      return;
    }
  }

  getSurveyLinks() {
    const payload = {
      "target_group_id": this.target_grp_id,
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.geturlcount).subscribe(res => {
      let response = res;
      if (response.success) {
        this.surveyLinks = { 'url': response.data['url'], 'count': response.data['un_used_survey_url_count'] };
      }
      this.spinnerService.hide();
    });
  }

  uploadCsv(event) {
    this.eventVar = event;
    this.filename = event.target.files[0].name
    this.input_file.append('input_file', event.target.files[0], event.target.files[0].name);
    this.tptCheck('tptOn');
  }

  saveuploadCsv() {
    if (this.input_file != undefined) {
      this.generateUrlByCsv();
    } else {
      this.toastr.error('Please upload file.');
    }
  }

  tptCheck(x) {
    setTimeout(() => {
      if (x == "tptOn") {
        $(".tptCheckingBox").show();
        $(".tptCheckingBox2").hide();
        $(".selected-listname").addClass("project-list");
      } else if (x == "tptOff") {
        $(".tptCheckingBox").hide();
        $(".tptCheckingBox2").show();
        $(".selected-listname").removeClass("project-list");
      }
    }, 1);
    if (x == "tptOn") {
      this.input_file.append('target_group_id', this.target_grp_id);
      this.input_file.append('url_type', '2');
    } else {
      this.payload = {
        target_group_id: this.target_grp_id,
        url_type: 1
      };
    }
  }

  generateUrl() {
    this.spinnerService.show();
    this.httpservice.postData(this.payload, requrls.importsurveylink).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        this.surveyLinks = { 'url': response.data.url, 'count': response.data.count };
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    });
  }

  generateUrlByCsv() {
    if (this.input_file.get('input_file') == null) {
      this.toastr.error('please select CSV file');
      return;
    }
    this.spinnerService.show();
    this.httpservice.postData(this.input_file, requrls.importsurveylink).subscribe(res => {
      let response = res;
      if (response.success) {
        this.eventVar.target.value = null;
        this.filename = "";
        this.toastr.success(response.message);
        this.surveyLinks = { 'url': response.data.url, 'count': response.data.avialable_url_count };
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
      this.input_file = new FormData();
    });
  }

  deleteSurveyLink() {
    if (this.surveyLinks.url == '') return;
    const payload = {
      "target_group_id": this.target_grp_id,
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.deleteurl).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        this.surveyLinks = { 'url': "", 'count': 0 };
      } else {

        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  next() {
    this.router.navigate(['/project/target-groups/schedule'], { queryParams: { action: this.action } });
  }

  previous() {
    this.router.navigate(['/project/target-groups/security'], { queryParams: { action: this.action } });
  }

  downloadExFile(){
    window.open('assets/importurls.csv', 'Download');
  }
}
