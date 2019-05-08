import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from '../../../../shared/localstore.service';
import { CommonService } from 'app/shared/common.service';
import { DomSanitizer } from '@angular/platform-browser'
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-add-templates',
  templateUrl: './add-templates.component.html',
  styleUrls: ['./add-templates.component.css']
})
export class AddTemplatesComponent implements OnInit {

  tptCheckingBox = false;
  panelId;
  categoryOptions = [];
  addTemp: any = {};
  textMeg;
  emilCont;
  flag = false;
  is_disabled = false;

  constructor(
    private router: Router,
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private route: ActivatedRoute,
    private cs: CommonService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let self = this;
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let tempdetail = this.localStoreService.getLocal('panel', 'temp-detail');
    this.addTemp.is_active = '1';
    this.addTemp.template_category_id = [''];
    if (pdetail != undefined) {
      this.panelId = pdetail.id
    }
    if (tempdetail != undefined) {
      this.textMeg = 'Edit';
      this.getTemplateDetails(tempdetail.id);
      this.is_disabled = true;
    } else {
      this.textMeg = 'New';
      this.flag = true;
      this.is_disabled = false;
    }
    this.getActivityTemplate();
    setTimeout(() => {
      $('#summernote').summernote({
        callbacks: {
          onChange: function (contents, $editable) {
            if (contents === '<p><br></p>' || contents == '') {
              self.addTemp.content = undefined;
            } else {
              self.addTemp.content = contents;
            }
            document.getElementById('contentt').style.display = 'none';
          },
          onBlurCodeview: function (contents, $editable) {
            $(this).html(contents);
            if (contents === '<p><br></p>' || contents == '') {
              self.addTemp.content = undefined;
            } else {
              self.addTemp.content = contents;
            }
            document.getElementById('contentt').style.display = 'none';
          }
        }
      });
    }, 500);
  }

  setFocus(event) {
    event.focus()
  }

  getTemplateDetails(id) {
    let payload = {
      'id': id
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.viewactivitytemplate).subscribe(res => {
      let response = res.data;
      let self = this;
      if (res.success) {
        setTimeout(() => {
          response.is_active = '' + response.is_active;
          response.template_category_id = [response.template_category_id];
          this.addTemp = response;
          this.flag = true;
          if (response.type == 1) {
            $('#summernote').on('summernote.init', function () {
              $('#summernote').summernote('codeview.activate');
            }).summernote({
              height: 300,
              minHeight: null,
              maxHeight: null,
            });
            var markupStr = self.addTemp.content;
            $('#summernote').summernote('code', markupStr);
          }
        }, 1500);
      } else {
        this.flag = true;
      }
      this.spinnerService.hide();
    });
  }


  text: string = "";
  options: any = { maxLines: 1000, printMargin: false };

  onChange(code) {
    this.addTemp.content = code
  }

  onSubmitClik(formVal, imgid, lodimgid, formVal2) {
    console.log(formVal.form.valid, imgid, lodimgid, formVal2.form.valid)
    if (this.addTemp.content == undefined || this.addTemp.content == null || this.addTemp.content == '') {
      document.getElementById('contentt').style.display = 'block';
    } else {
      document.getElementById('contentt').style.display = 'none';
    }
    let dropChkArray = [];
    if (this.is_disabled) {
      dropChkArray = [
        {
          value: this.addTemp.content,
          key: 'contentt'
        }
      ];
    } else {
      dropChkArray = [
        {
          value: formVal.value.template_category_id,
          key: 'template_category_idd'
        },
        {
          value: this.addTemp.content,
          key: 'contentt'
        }
      ];
    }
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    var t = Object.keys(formVal2.form.controls).forEach(field => {
      const control = formVal2.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      if (formVal.form.valid) {
        this.onSubmit(formVal, imgid, lodimgid, formVal2);
      }
    }
  }

  errors = [];

  onSubmit(f, imgid, lodimgid, f2) {
    // console.log(f.value, imgid, lodimgid, f2.value);
    f.value['panel_id'] = this.panelId;
    let action = this.route.snapshot.queryParamMap.get("action");
    let tempdetail = this.localStoreService.getLocal('panel', 'temp-detail');
    let callTo;
    f.value['content'] = this.addTemp.content;
    if (f.value.type == 1 && f2 != null){
      f.value['subject'] = f2.value.subject;
    }
    if (action == 'edit') {
      if (tempdetail != undefined) {
        f.value['id'] = tempdetail.id;
        f.value.template_category_id = this.addTemp.template_category_id[0];
        callTo = this.httpservice.postData(f.value, requrls.editactivitytemplate);
      }
    } else {
      callTo = this.httpservice.postData(f.value, requrls.createactivitytemplate);
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.cs.showError(this.errors, 'i');
    callTo.subscribe(res => {
      if (res.success) {
        this.router.navigate(['/panel/engagement/templates']);
        this.toastr.success(res.message);
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  getActivityTemplate() {
    let payload = {
      "panel_id": this.panelId
    }
    this.httpservice.postData(payload, requrls.getactivitytemplate).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.categoryOptions = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      }
    });
  }

  editorContent = "Hello, Froala!";

  tptCheck(x) {
    if (x == 'tptOn') {
      this.tptCheckingBox = true;
    } else {
      this.tptCheckingBox = false;
    }
  }

  previewTemplate() {
    $("#previewModal").modal("show");
  }

  clearFun() {
    if (this.textMeg == 'New') {
      document.getElementById('contentt').style.display = 'none';
      this.addTemp.content = null;
      let markupStr = this.addTemp.content;
      $('#summernote').summernote('code', markupStr);
    }
  }
}
