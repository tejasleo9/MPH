import { Component, OnInit } from '@angular/core';
declare var $: any;
import { SelectModule } from 'ng-select';
import { IOption } from 'ng-select';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../shared/common.service';
import { Router } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css']
})
export class AdminSupportComponent implements OnInit {

  panelId;
  support_id;
  reply = false;
  panelDet = {};
  payload = {};
  sd = {};
  dt: any = {};
  comment = [];
  file_path = [];

  urls1;

  statusOptions = [
    { label: 'Open', value: 0 },
    { label: 'Close', value: 1 },
    { label: 'In Progress', value: 2 },
  ];

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService,
  ) { }

  ngOnInit() {
    this.panelDet = this.localStoreService.getLocal('panel', 'detail');
    this.support_id = this.localStoreService.getLocal('panel', 'support-ticket');
    this.viewSupportTicketFn();
    setTimeout(() => {
      $("#image-holder1").on('click', '.thumb-image1', function () {
        $(this).toggleClass("selectedItem");
      });

      $(document).on('click', '.delete1', function (e) {
        $(this).prev('img').remove();
        $(this).remove();
      });

      var image_holder = $("#image-holder1");
      image_holder.empty();

      $("#fileUpload1").on('change', function () {

        //Get count of selected files
        var countFiles = ($(this)[0] as any).files.length;
        var imgPath = ($(this)[0] as any).value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();

        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
          if (typeof (FileReader) != "undefined") {
            //loop for each file selected for uploaded.
            for (var i = 0; i <
              countFiles; i++) {
              var reader = new FileReader();
              reader.onload = function (e) {
                $("<img />", {
                  "src": (e.target as any).result,
                  "class": "thumb-image1"
                }).appendTo(image_holder);

                $("<a class='delete1'><img src='assets/img/cross-red.png' class='btnDelete1' alt='cross image'></a>", {

                }).appendTo(image_holder);
              }
              image_holder.show();
              reader.readAsDataURL(($(this)[0] as any).files[i]);
            }
          } else {
            alert("This browser does not support FileReader.");
          }
        } else {
          alert("Pls select only images");
        }
      });
    }, 100);
  }


  viewSupportTicketFn() {
    this.spinnerService.show();
    this.payload['id'] = this.support_id;
    this.httpservice.postData(this.payload, requrls.viewsupportticket).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.sd = response;
        this.comment = this.sd['history'];
        this.file_path = this.sd['file_path'];
      } else {
        this.toastr.error(res.message);
      }
      this.spinnerService.hide();
    });
  }

  formData = new FormData();

  submitComment(f) {
    let dropChkArray = [];
    dropChkArray = [{
      value: f.value.status,
      key: 'statusd'
    }
    ];
    let dropChk = this.cs.dropChkFn(dropChkArray);
    var t = Object.keys(f.form.controls).forEach(field => {
      const control = f.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (dropChk.length != 0) {
      return false;
    }
    if (f.form.valid == true) {
      this.formData.append("id", this.support_id);
      this.formData.append("status", f.value.status);
      this.formData.append("message", f.value.message);
      this.httpservice.postData(this.formData, requrls.replaysupportquery).subscribe(res => {
        if (res.success) {
          this.toastr.success(res.message);
          this.viewSupportTicketFn();
          this.reply = false;
        } else {
          this.toastr.error(res.message);
        }
        this.spinnerService.hide();
      });
    }
  }

  disableMessage() {
    if (this.dt.status !== undefined) {
      console.log("in");
      document.getElementById('statusd').style.display = 'none';
    }
  }

  replayy() {
    this.reply = true;
    this.dt = {};
    this.formData = new FormData();
  }
  temp;
  uploadFile(event) {
    // tslint:disable-next-line: prefer-const
    let self = this;
    let file = event.target.files;
    this.temp = event;
    if (file) {
      // Get reference of FileUpload.
      var fileUpload = (document.getElementById("fileUpload1") as any);
      // Check whether the file is valid Image.
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif|.jpeg)$");
      if (regex.test(fileUpload.value.toLowerCase())) {
        self.urls1 = event.target.files[0], event.target.files[0].name;
        // tslint:disable-next-line: quotemark
        self.formData.append("webimages[]", self.urls1);
      } else {
        self.toastr.error("Please select a valid Image file.")
        return false;
      }
    }
  }
}
