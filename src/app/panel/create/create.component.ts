import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../store/requrl';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  name;
  language;
  country;
  industry;
  categories;
  manual = false;
  auto = false;
  note;
  panelId;
  panelEdit;
  languageOptions = [];
  countryOptions = [];
  industryOptions = [];
  categoriesOptions = [];
  dataObj: any = {}
  panelObj = new FormData();
  urls;
  urls1 = new Array;
  url = null;
  lg = null;


  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private route: ActivatedRoute,
    private cs: CommonService
  ) { }

  ngOnInit() {
    $(".image-holder").on('click', '.thumb-image', function () {
      $(this).toggleClass("selectedItem");
    });
    this.getlanguageFn();
    this.getCountryFn();
    this.getIndustriesFn();
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.getPanelFn(panelDtl.id);
    }
    let localStoreTgDetail = this.localStoreService.getLocal('panel', 'panel-detail');
    if (localStoreTgDetail != undefined) {
      this.dataObj = localStoreTgDetail;
    }
    // let panelEdit = localStorage.getItem('panelEdit');
    // if (panelEdit != 'null') {
    //   this.panelEdit = panelEdit;
    // }
  }

  fileUpload(files, url) {
    for (let file of files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        url.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  incentivered = false;

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
    if (this.url == null) {
      this.lg = true;
    }
    let action = this.route.snapshot.queryParamMap.get("action");
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (formVal.value.manual || formVal.value.auto) {
      this.incentivered = false;
    } else {
      this.incentivered = true;
      return;
    }
    if (dropChk.length != 0) {
    } else {
      this.onSubmit(formVal, imgid, lodimgid);
    }
  }

  // validateFun(dropChkArray, formVal, imgid, lodimgid) {
  //   setTimeout(() => {
  //     dropChkArray.forEach(e => {

  //       if (e.value == undefined || e.value == '') {

  //         if (this.url == undefined) {
  //           this.lg = true;
  //         } else {
  //           this.lg = false;
  //         }
  //       }
  //     })
  //   }, 500)

  //   if (formVal.value.language_id == undefined || formVal.value.country_id == undefined || formVal.value.research_industry_id == undefined || formVal.value.research_categories == undefined || formVal.value.research_categories == [] || this.url == undefined || formVal.form.valid == false) {
  //     return;
  //   } else {

  //   };
  // }

  temp;
  boxMessage = ''

  detectFiles1(event) {
    var self = this;
    let file = event.target.files;
    this.temp = event;
    if (file) {
      // Get reference of FileUpload.
      var fileUpload = (document.getElementById("fileUpload") as any);
      // Check whether the file is valid Image.
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
      if (regex.test(fileUpload.value.toLowerCase())) {
        // Check whether HTML5 is supported.
        if (typeof (fileUpload.files) != "undefined") {
          // Initiate the FileReader object.
          var reader = new FileReader();
          // Read the contents of Image File.
          reader.readAsDataURL(fileUpload.files[0]);
          reader.onload = function (e: any) {
            // Initiate the JavaScript Image object.
            var image: any = new Image();
            // Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            // Validate the File Height and Width.
            image.onload = function () {
              var height = this.height;
              var width = this.width;
              if (height > 200 || width > 200) {
                self.toastr.error("Height and Width must not exceed 200px.")
                return false;
              }
              let data = event.target.files[0];
              let data2 = event.target.files[0].name;
              self.panelObj.set('logo', data, data2);
              if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = (event: ProgressEvent) => {
                  self.url = (<FileReader>event.target).result;
                  self.lg = false;
                }
                reader.readAsDataURL(event.target.files[0]);
              }
              return true;
            };
          }
        } else {
          self.toastr.error("This browser does not support HTML5.")
          return false;
        }
      } else {
        self.toastr.error("Please select a valid Image file.")
        return false;
      }
    }
  }

  removeImgUploadFn1(i) {
    this.url = null;
    this.temp.target.value = null;
  }

  errors = [];

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
    this.panelObj.set('instructions', f.value.instructions);
    this.panelObj.set('language_id', f.value.language_id);
    this.panelObj.set('name', f.value.name);
    for (var i = 0; i < f.value.research_categories.length; i++) {
      this.panelObj.append('research_categories[]', f.value.research_categories[i]);
    }
    this.panelObj.set('research_industry_id', f.value.research_industry_id);
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(this.panelObj, requrls.createpanel).subscribe(panelres => {
      if (panelres.success) {
        const payload = {
          "panel_id": panelres.data.id
        };
        this.httpservice.postData(payload, requrls.getcopyquestion).subscribe(res => {
          if (res.success) {
            let action = this.route.snapshot.queryParamMap.get('action');
            this.router.navigate(['/panel/questions'], { queryParams: { action: action } });
            this.localStoreService.setLocal('panel', 'panel-detail', panelres.data);
          } else {
            this.router.navigate(['/panel']);
            this.toastr.success(panelres.message);
          }
        })
      } else {
        this.panelObj.delete('research_categories[]')
        if (panelres.data != {} && Object.values(panelres.data).length > 0) {
          this.errors = panelres.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(panelres.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    })
  }

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

  getPanelFn(pid) {
    this.spinnerService.show();
    this.httpservice.getData(requrls.getpanels + pid).subscribe(res => {
      if (res.success) {
        res.data.country_id = [res.data.country_id];
        let response = res.data;
        this.panelObj = response;
      } else {
        this.toastr.error(res.message);
      }

      this.spinnerService.hide();
    });
  }

  addNew() {
    this.localStoreService.removeLocal('project');
    this.localStoreService.removeLocal('target-group');
    this.localStoreService.removeLocal('regions');
    this.localStoreService.removeLocal('project-exclusion');
    this.localStoreService.removeLocal('changed');
    this.localStoreService.lastAction('last-action', 'new');
    // this.router.navigate(['/project/overview'], { queryParams: { action: 'new' } });
  }

  next() {
    this.router.navigate(['/panel/questions'], { queryParams: { action: 'new' } });
  }


}
