import { Component, OnInit } from '@angular/core';
declare var $: any;
import { LocalstoreService } from '../../../shared/localstore.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';
@Component({
  selector: 'app-payout-method',
  templateUrl: './payout-method.component.html',
  styleUrls: ['./payout-method.component.css']
})
export class PayoutMethodComponent implements OnInit {

  panelDetail;
  redeemlist;
  ifError: boolean = false;
  redeemFilter: any = {};
  temp;
  panelObj = new FormData();
  url;
  lg;
  viewmethod: any = {};
  selectedDatas = [];
  payload;
  popupMess;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private route: ActivatedRoute,
    private cs: CommonService) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.getPaymentList();
  }

  getPaymentList() {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    this.httpservice.postData(payload, requrls.listpaymentmethod).subscribe(res => {
      if (res.success == true) {
        let response = res.data;
        this.redeemlist = response;
        this.ifError = false;
      } else {
        this.ifError = true;
      }
      this.spinnerService.hide();
    });
  }

  /* Common Upload Function */
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
  detectFiles1(event) {
    console.log(event);
    var self = this;
    let file = event.target.files;
    this.temp = event;
    if (file) {
      //Get reference of FileUpload.
      var fileUpload = (document.getElementById("fileUpload") as any);
      //Check whether the file is valid Image.
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png)$");
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
            // console.log(image);
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            image.size = e.total / 1000;
            //Validate the File Height and Width.
            image.onload = function () {
              var height = this.height;
              var width = this.width;
              if (image.size > 1000) {
                alert("Image size should be less than 1000KBs.");
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
          alert("This browser does not support HTML5.");
          return false;
        }
      } else {
        alert("Please select a valid Image file.");
        return false;
      }
    }
  }

  removeImgUploadFn1(i) {
    this.url = null;
    this.temp.target.value = null;
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (formVal.form.valid == true) {
      this.onSubmit(formVal, imgid, lodimgid)
    } else {
      return
    }
  }

  onSubmit(f, imgid, lodimgid) {
    console.log(f.value);
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.panelObj.set('panel_id', this.panelDetail['id']);
    this.panelObj.set('method_name', f.value.method_name);
    this.panelObj.set('detail', f.value.detail);
    this.panelObj.set('min_threshold', f.value.min_threshold);
    this.panelObj.set('max_threshold', f.value.max_threshold);
    this.panelObj.set('unit_cost', f.value.unit_cost);
    this.panelObj.set('confirm_text', f.value.confirm_text);
    this.panelObj.set('acknowledge_text', f.value.acknowledge_text);
    this.httpservice.postData(this.panelObj, requrls.addpayment).subscribe(res => {
      if (res.status_code == 200) {
        this.getPaymentList()
        $('#exampleModal').modal("hide");
        f.reset();
        this.removeImgUploadFn1(this.url);
      } else {
        Object.keys(res.data).map(key => {
          this.toastr.error(res.data[key]);
        });
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
      this.panelObj = new FormData();
    });
  }

  onUpdateClick(formVal, imgid, lodimgid, id) {
    this.panelObj.set('id', id);
    this.onUpdate(formVal, imgid, lodimgid)
  }

  onUpdate(f, imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.panelObj.set('panel_id', this.panelDetail['id']);
    this.panelObj.set('method_name', f.value.method_name);
    this.panelObj.set('detail', f.value.detail);
    this.panelObj.set('min_threshold', f.value.min_threshold);
    this.panelObj.set('max_threshold', f.value.max_threshold);
    this.panelObj.set('unit_cost', f.value.unit_cost);
    this.panelObj.set('confirm_text', f.value.confirm_text);
    this.panelObj.set('acknowledge_text', f.value.acknowledge_text);
    this.httpservice.postData(this.panelObj, requrls.updatepayment).subscribe(res => {
      if (res.status_code == 200) {
        this.getPaymentList()
        $('#exampleModal2').modal("hide");
        f.reset();
        this.removeImgUploadFn1(this.url);
      } else {
        Object.keys(res.data).map(key => {
          this.toastr.error(res.data[key]);
        });
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
      this.panelObj = new FormData();
    });
  }

  editMethod(id) {
    $('#exampleModal2').modal('show');
    let payload = { 'id': id }
    this.httpservice.postData(payload, requrls.paymentmethod).subscribe(res => {
      if (res.status_code == 200) {
        this.viewmethod = res.data;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj) != -1) {
      } else {
        this.selectedDatas.push(obj);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj);
      this.selectedDatas.splice(index, 1);
    }
  }

  delete(obj, call) {
    this.payload = {};
    if (call == "i") {
      this.payload["id"] = [obj.id];
      this.payload["panel_id"] = this.panelDetail['id'];
      $("#confirmBox").modal("show");
    } else {
      if (this.selectedDatas.length != 0) {
        $("#confirmBox").modal("show");
        this.payload["id"] = this.selectedDatas;
        this.payload["panel_id"] = this.panelDetail['id'];
      } else {
      }
    }
    this.popupMess = "Are you sure want to delete ?";
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.payload, requrls.deletepaymentmethod).subscribe(res => {
      let response = res;
      if (response.success == true) {
        this.payload["id"].forEach(ele2 => {
          this.redeemlist.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.redeemlist.indexOf(ele1);
              this.redeemlist.splice(index, 1);
            }
          });
        });
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $("#confirmBox").modal("hide");
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

  deactivate(obj, call) {
    this.payload = {};
    if (call == "i") {
      this.payload["id"] = [obj.id];
      this.payload["panel_id"] = this.panelDetail['id'];
      $("#deactconfirmBox").modal("show");
    } else {
      if (this.selectedDatas.length != 0) {
        $("#deactconfirmBox").modal("show");
        this.payload["id"] = this.selectedDatas;
        this.payload["panel_id"] = this.panelDetail['id'];
      } else {
      }
    }
    this.popupMess = "Are you sure want to de-activate ?";
  }

  deactivateData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(this.payload, requrls.deactivatepaymentmethod).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload = {};
      } else {
        let ressucc: any = Object.values(response.data);
        ressucc.forEach(res => {
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              const element = res[key];
              if(element != null) {
                this.toastr.error(element);
              }
            }
          }
        });
      }
      $("#deactconfirmBox").modal("hide");
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

}
