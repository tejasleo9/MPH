import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';
@Component({
  selector: 'app-setting-overview',
  templateUrl: './setting-overview.component.html',
  styleUrls: ['./setting-overview.component.css']
})
export class SettingOverviewComponent implements OnInit {

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private route: ActivatedRoute,
    public cs: CommonService
  ) { }

  languageOptions = [];
  countryOptions = [];
  industryOptions = [];
  categoriesOptions = [];
  dataObj: any = {};
  panelId;

  panelObj = new FormData();
  temp = null;
  url = null;

  manual = false;
  auto = false;

  errors = [];

  getlanguageFn() {
    this.httpservice.getData(requrls.getlanguage).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.languageOptions = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  getCountryFn() {
    this.httpservice.getData(requrls.getcountrylist).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.countryOptions = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
        this.toastr.error(res.message);
      }

    });
  }

  getIndustriesFn() {
    this.httpservice.getData(requrls.researchindustry).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.industryOptions = response.map(option => ({
          value: option.id,
          label: option.industry_name
        }));
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  getCategoriesFn(x) {
    if (+x > 0) {
      let payload = {
        'industry_id': x
      }
      this.httpservice.postData(payload, requrls.researchcategories).subscribe(res => {
        if (res.success) {
          let response = res.data;
          this.categoriesOptions = response.map(option => ({
            value: option.id,
            label: option.name
          }));
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

  getPanelDetails(id) {
    this.httpservice.getData(requrls.getpanels + id).subscribe(res => {
      if (res.success) {
        let response = res.data;
        response.country_id = [response.country_id];
        response.language_id = [response.language_id];
        response.research_industry_id = [response.research_industry_id];
        this.getCategoriesFn(response.research_industry_id[0])
        response.research_categories = response.research_categories.map(res => {
          return res.id;
        });
        if (response.incentive_redemption_options == 1) {
          this.auto = true;
        }
        if (response.incentive_redemption_options == 0) {
          this.manual = true;
        }
        if (response.incentive_redemption_options == 2) {
          this.auto = true;
          this.manual = true;
        }
        this.dataObj = response;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  removeImgUploadFn1(obj) {
    console.log(obj);
    obj.logo = null;
    this.url = null;
    if (this.temp != null) {
      this.temp.target.value = null;
    }
  }

  onSubmitClik(formVal, imgid, lodimgid) {

    let dropChkArray = [];
    dropChkArray = [{
      value: formVal.value.language_id,
      key: 'language_idd'
    }, {
      value: formVal.value.country_id,
      key: 'country_idd'
    }, {
      value: formVal.value.research_industry_id,
      key: 'research_industry_idd'
    }, {
      value: formVal.value.research_categories,
      key: 'research_categoriess'
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
      if (formVal.form.valid == true) {
        this.onSubmit(formVal, imgid, lodimgid);
      }
    }
  }

  detectFiles1(event) {
    var self = this;
    let file = event.target.files;
    this.temp = event;
    if (file) {
      //Get reference of FileUpload.
      var fileUpload = (document.getElementById("fileUpload") as any);
      //Check whether the file is valid Image.
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
      if (regex.test(fileUpload.value.toLowerCase())) {
        //Check whether HTML5 is supported.
        if (typeof (fileUpload.files) != "undefined") {
          //Initiate the FileReader object.
          var reader = new FileReader();
          //Read the contents of Image File.
          reader.readAsDataURL(fileUpload.files[0]);
          reader.onload = function (e: any) {
            //Initiate the JavaScript Image object.
            var image: any = new Image();
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            //Validate the File Height and Width.
            image.onload = function () {
              var height = this.height;
              var width = this.width;
              if (height > 200 || width > 200) {
                alert("Height and Width must not exceed 200px.");
                return false;
              }
              let data = event.target.files[0];
              let data2 = event.target.files[0].name;
              self.panelObj.set('logo', data, data2);
              if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = (event: ProgressEvent) => {
                  self.url = (<FileReader>event.target).result;
                  self.dataObj.logo = (<FileReader>event.target).result;
                }
                reader.readAsDataURL(event.target.files[0]);
              }
              return true;
            };
          }
        } else {
          alert("This browser does not support HTML5.");
          return false;
        }
      } else {
        alert("Please select a valid Image file.");
        return false;
      }
    }
  }

  onSubmit(f, imgid, lodimgid) {
    if (f.value.manual == true) {
      this.panelObj.set('incentive_redemption_options', '0');
    }
    if (f.value.auto == true) {
      this.panelObj.set('incentive_redemption_options', '1');
    }
    if (f.value.manual == true && f.value.auto == true) {
      this.panelObj.set('incentive_redemption_options', '2');
    }
    delete f.value.manual;
    delete f.value.auto;
    this.panelObj.set('country_id', f.value.country_id);
    this.panelObj.set('language_id', f.value.language_id);
    this.panelObj.set('name', f.value.name);
    this.panelObj.set('id', this.panelId);
    this.panelObj.set('status', this.dataObj.status);
    for (var i = 0; i < f.value.research_categories.length; i++) {
      this.panelObj.append('research_categories[]', f.value.research_categories[i]);
    }
    this.panelObj.set('research_industry_id', f.value.research_industry_id);
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(this.panelObj, requrls.updatepanel).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
      } else {
        this.panelObj.delete('research_categories[]')
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
      this.panelObj = new FormData();
    })
  }

  ngOnInit() {
    this.getlanguageFn();
    this.getCountryFn();
    this.getIndustriesFn();
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
      setTimeout(() => {
        this.getPanelDetails(panelDtl.id);
      }, 1500);

    }
  }

}
