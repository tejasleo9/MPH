import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-end-pages',
  templateUrl: './end-pages.component.html',
  styleUrls: ['./end-pages.component.css']
})
export class EndPagesComponent implements OnInit {

  addTemp: any = {};
  is_visible = false;

  constructor(
    private router: Router,
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private route: ActivatedRoute,
    private cs: CommonService
  ) { }

  panelObj = new FormData();
  panelId;
  categories = [];
  catgActive = 0;

  getPageCategory() {
    let payload = {
      'reference_type': 2
    }
    this.spinnerService.show();
    this.httpservice.getDataWithParams(payload, requrls.pagecateogry).subscribe(res => {
      let response = res;
      if (response.success) {
        this.categories = response.data;
        this.getCategoryDetails(this.categories[0], this.catgActive);
      }
      this.spinnerService.show();
    })
  }

  getCategoryDetails(catObj, index) {
    let payload = {
      'page_category_id': catObj.id,
      'reference_id': this.panelId,
      'select_fields': "id,reference_id,page_category_id,content"
    }
    let self = this;
    this.spinnerService.show();
    this.httpservice.getDataWithParams(payload, requrls.pagepage).subscribe(res => {
      let response = res;
      if (response.success) {
        this.catgActive = index;
        this.addTemp = response.data[0];
        setTimeout(() => {
          $('#summernote2').on('summernote.init', function () {
            $('#summernote2').summernote('codeview.activate');
          }).summernote({
            height: 300,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
          });
          var markupStr = self.addTemp.content;
          $('#summernote2').summernote('code', markupStr);
        }, 500)
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    })
  }

  onSubmitClik(imgid, lodimgid) {
    let dropChkArray = [];
    dropChkArray = [
      {
        value: this.addTemp.content,
        key: 'contentt'
      }
    ];
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      this.updatePageFn(imgid, lodimgid);
    }
  }

  updatePageFn(imgid, lodimgid) {
    let payload = {
      'content': this.addTemp.content
    }
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.pagepage + this.addTemp.id).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    })
  }

  text: string = "";
  options: any = { maxLines: 1000, printMargin: false };

  onChange(code) {
    this.addTemp.content = code;
  }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let self = this;
    if (pdetail != undefined) {
      this.panelId = pdetail.id
    }
    this.getPageCategory();
    setTimeout(() => {
      $('#summernote2').summernote({
        callbacks: {
          onChange: function (contents, $editable) {
            self.addTemp.content = contents;
          },
          onBlurCodeview: function (contents, $editable) {
            $(this).html(contents);
            self.addTemp.content = contents;
          }
        }
      });

    }, 500);
    setTimeout(() => {
      this.is_visible = true;
    }, 2000)
  }

}
