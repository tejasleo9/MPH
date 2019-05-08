import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { CommonService } from '../../../../shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-import-panelist',
  templateUrl: './import-panelist.component.html',
  styleUrls: ['./import-panelist.component.css']
})
export class ImportPanelistComponent implements OnInit {

  input_file = new FormData();
  fileName = 'No file choosen';
  panelDetail;
  panelist_status = '1';
  upload_type = '1';

  constructor(
    private httpservice: HttpService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
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
  urls1 = new Array<string>(); //change
  detectFiles1(event) {  //change
    alert("Perfect");
    this.urls1 = [];
    let files = event.target.files;
    if (files) {
      this.fileUpload(files, this.urls1);
    }
  }

  removeImgUploadFn1(url, i) {
    this.urls1.splice(i, 1);
  }

  getCsvFile(event) {
    this.input_file.set('file', event.target.files[0], event.target.files[0].name);
    this.fileName = event.target.files[0].name;
  }

  errors = [];
  is_exist = false;

  is_disable = false;

  importSubmit(f, imgid, lodimgid) {
    if(this.fileName == 'No file choosen'){
      this.is_exist = true;
      return;
    }else{
      this.is_exist = false;
    }
    this.is_disable = true;
    setTimeout(() => {
      this.is_disable = false;
    }, 2000);
    this.input_file.set('panel_id', this.panelDetail['id']);
    this.input_file.set('panelist_status', f.value.panelist_status);
    this.input_file.set('upload_type', f.value.upload_type);
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.cs.showError(this.errors, 'i');
    this.httpservice.postData(this.input_file, requrls.validatepanelist).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        this.cs.back();
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.input_file = new FormData();
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }


}
