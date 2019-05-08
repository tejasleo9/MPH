import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from '../../../../shared/localstore.service';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';
@Component({
  selector: 'app-comm-temp-edit',
  templateUrl: './comm-temp-edit.component.html',
  styleUrls: ['./comm-temp-edit.component.css']
})
export class CommTempEditComponent implements OnInit {

  constructor(
    private router: Router,
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private route: ActivatedRoute,
    private cs: CommonService
  ) { }

  comm_data = this.localStoreService.getLocal('panel', 'sett-comm-temp');
  editComp: any = {};
  panelId;

  getCommTemplate() {
    let payload = {
      'id': this.comm_data.id
    }
    this.httpservice.postData(payload, requrls.viewactivitytemplate).subscribe(res => {
      let response = res;
      if (response.success) {
        this.editComp = response.data;
        let self = this;
        setTimeout(() => {
          if (res.data.medium_type == 'Email') {
            $('#summernote').on('summernote.init', function () {
              $('#summernote').summernote('codeview.activate');
            }).summernote({
              height: 300,                 // set editor height
              minHeight: null,             // set minimum height of editor
              maxHeight: null,             // set maximum height of editor
            });
            var markupStr = self.editComp.content;
            $('#summernote').summernote('code', markupStr);
          }
        }, 500)
      }
    })
  }

  text: string = "";
  options: any = { maxLines: 1000, printMargin: false };

  updateCommunicationTemplate(imgid, lodimgid) {
    let payload = {
      'subject': this.editComp.subject,
      'content': this.editComp.content,
      'id': this.editComp.id,
      'panel_id': this.panelId,
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(payload, requrls.editactivitytemplate).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }


  ngOnInit() {
    this.getCommTemplate();
    let self = this;
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined) {
      this.panelId = pdetail.id
    }
    setTimeout(() => {
      $('#summernote').summernote({
        callbacks: {
          onChange: function (contents, $editable) {
            self.editComp.content = contents;
          },
          onBlurCodeview: function (contents, $editable) {
            $(this).html(contents);
            self.editComp.content = contents;
          }
        }
      });
    }, 500);
    
  }

}
