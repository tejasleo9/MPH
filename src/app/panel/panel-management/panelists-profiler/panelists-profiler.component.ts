import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { CommonService } from 'app/shared/common.service';
import { Router } from '@angular/router';
import { OrderPipe } from "ngx-order-pipe";
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-panelists-profiler',
  templateUrl: './panelists-profiler.component.html',
  styleUrls: ['./panelists-profiler.component.css']
})
export class PanelistsProfilerComponent implements OnInit {

  payload = {};
  panelId;
  panelOptions = [];
  questionCategoryList = [];
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  PanelQuestionList = [];
  addCategoryCheck;
  catName;
  nativeText;
  catSort;
  panelDetail;
  quetype = '1';
  questions;
  catdetail = {};
  errors = [];
  queFilter: any = {};

  glbQes = [];
  panelQues = [];

  catEdit: any = {}
  copyPanelId = undefined;
  filterByName = 'Filter By Category';
  panelLists = [];
  order
  payloadCopy;
  hideShow = true;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService,
    private router: Router,
    private orderPipe: OrderPipe,
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined) {
      this.panelId = pdetail.id;
    }
    this.getGlobalCategoryListFn();
    this.getGlobalQuestionListFn();
    this.panelListFn();
    // this.getPanelQuestionListFn();
  }

  getQuestionCategoryListFn() {
    this.cs.hideshowImgeFlex('catData', 'catLoading', 'a');
    let payload = {
      'panel_id': this.panelId
    }
    this.httpservice.getDataWithParams(payload, requrls.panelquestioncategory).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.questionCategoryList = response;
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImgeFlex('catData', 'catLoading', 'i');
    });
  }

  getGlobalCategoryListFn() {
    let payload = { 'panel_id': this.panelId }
    this.cs.hideshowImgeFlex('catData', 'catLoading', 'a');
    this.httpservice.postData(payload, requrls.getglobalquestioncategories).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.questionCategoryList = response;
      } else {
      }
      this.cs.hideshowImgeFlex('catData', 'catLoading', 'i');
    });
  }

  getPanelQuestionListFn() {
    this.spinnerService.show();
    let payload = {
      'panel_id': this.panelId
    }
    this.httpservice.getDataWithParams(payload, requrls.listpanelquestion).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.PanelQuestionList = response;
        this.panelQues = [...this.PanelQuestionList];
      } else {
      }
      this.spinnerService.hide();
    });
  }

  getGlobalQuestionListFn() {
    this.PanelQuestionList = [];
    this.spinnerService.show();
    let payload = { 'panel_id': this.panelId }
    this.httpservice.postData(payload, requrls.getcopyquestion).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.hideShow = true;
        this.PanelQuestionList = response;
        this.glbQes = [...response];
      } else {
      }
      this.spinnerService.hide();
    });
  }

  qtCatEdit(id) {
    $('.modal').modal('hide');
    $('#addCategory').modal('show');
    this.catCheck('e');
    this.httpservice.getData(requrls.panelcategory + id).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.catEdit = response;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  catCheck(x) {
    if (x == 'a') {
      this.catEdit = {};
      this.addCategoryCheck = true;
    } else {
      this.addCategoryCheck = false;
    }
  }

  selectAll(status) {
    if (status) {
      this.selectedDatas = [];
      if (this.quetype == '1') {
        this.PanelQuestionList.forEach(res1 => {
          res1.questions.forEach(res2 => {
            this.selectedDatas.push(res2.id);
          });
        })
      } else {
        this.selectedDatas = this.PanelQuestionList.map(res => res.id);
      }
      this.selectedDatas.forEach((element) => $('#chk' + element).prop('checked', true));
    } else {
      this.selectedDatas.forEach((element) => $('#chk' + element).prop('checked', false));
      this.selectedDatas = [];
    }
    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj.id) != -1) {
      } else {
        this.selectedDatas.push(obj.id);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj.id);
      this.selectedDatas.splice(index, 1);
    }

    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  delete(obj, call) {
    // this.payload = {};
    this.payload;
    if (call == 'i') {
      this.payload['panel_id'] = [obj.id];
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#confirmBox').modal('show');
        this.payload['panel_id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deletepanel).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload['panel_id'].forEach(ele2 => {
          this.PanelQuestionList.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.PanelQuestionList.indexOf(ele1);
              this.PanelQuestionList.splice(index, 1);
            }
          });
        });
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  filterByCat(cat) {
    if (cat != null) {
      this.filterByName = cat.name;
    } else {
      this.filterByName = 'All';
    }
    document.getElementById('headname').click();
    if (this.quetype == '1') {
      if (cat == null) {
        this.getGlobalQuestionListFn();
        return;
      }
      let filteredArray = this.glbQes
        .filter((element) =>
          element.questions.some((subElement) => subElement.global_question_category_id === cat.id))
        .map(element => {
          let newElt = Object.assign({}, element); // copies element
          newElt['is_visible'] = true;
          return newElt;
        });
      this.PanelQuestionList = filteredArray;
    } else {
      this.hideShow = false;
      if (cat == null) {
        this.getPanelQuestionListFn();
        return;
      }
      let filteredArray = this.panelQues.filter(res => {
        if (cat.id == res.panel_question_category_id) {
          return res;
        }
      }).map(res => {
        res['is_visible'] = true;
        return res;
      }
      );
      this.PanelQuestionList = filteredArray;
    }
  }

  editQuestion(questionObj) {
    if (questionObj.is_copied !== 1) {
      this.localStoreService.setLocal('panel', 'question', questionObj);
      this.router.navigate(['/panel/panel-management/panelist-profiler/add-questions'], { queryParams: { action: 'edit' } });
    }
  }

  addQuestion() {
    this.localStoreService.removeLocalStorageObj('panel', 'question');
    this.localStoreService.lastAction('last-action', 'new');
    this.router.navigate(['/panel/panel-management/panelist-profiler/add-questions'], { queryParams: { action: 'new' } });
  }

  from = 'name'

  tptCheck(type) {
    if (type === '1') {
      this.quetype = '1';
      this.getGlobalCategoryListFn();
      this.getGlobalQuestionListFn();
      this.from = 'name';
    } else {
      this.quetype = '2';
      this.getQuestionCategoryListFn();
      this.getPanelQuestionListFn();
      this.from = 'text';
      console.log(this.quetype);
    }
    this.filterByName = 'Filter By Category';
    this.hideShow = true;
  }

  onSubmit(f, imgid, lodimgid) {
    var t = Object.keys(f.form.controls).forEach(field => {
      const control = f.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (f.form.valid == true) {
      this.onSuccess(f.value, imgid, lodimgid);
    } else {
      return
    }
  }

  copy(obj, call) {
    this.payloadCopy = {};
    this.payloadCopy['question_level'] = this.quetype === '1' ? 'global' : 'panel';
    this.payloadCopy['source_panel_id'] = this.panelId;
    this.payloadCopy['target_panel_id'] = this.copyPanelId;
    if (call == 'i') {
      this.payloadCopy['source_questions'] = [obj.id];
      $('#copyModal').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#copyModal').modal('show');
        this.payloadCopy['source_questions'] = this.selectedDatas;
      } else {
        this.toastr.error('Please Select Question..!');
        this.disablelink = true;
      }
    }
  }

  onSubmitClik(formVal, imgid, lodimgid) {
    let dropChkArray = [];
    dropChkArray = [{
      value: formVal.value.target_panel_id,
      key: 'target_panel_id'
    }
    ];
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      if (formVal.form.valid == true) {
        this.copyData(formVal, imgid, lodimgid);
      }
    }
  }

  copyData(formVal, imgid, lodimgid) {
    if (formVal.value.target_panel_id == undefined) {
      return;
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.payloadCopy['target_panel_id'] = +formVal.value.target_panel_id;
    this.httpservice.postData(this.payloadCopy, requrls.copypanelquestion).subscribe(res => {
      let response = res;
      if (response.success) {
        if (this.quetype == '1') {
          this.payloadCopy['source_questions'].forEach(ele2 => {
            this.PanelQuestionList.forEach(ele1 => {
              ele1.questions.forEach(ele3 => {
                if (ele3.global_question_category_id === ele2) {
                  ele3.is_copied = 1;
                }
              });
            });
          });
        } else {
          this.payloadCopy['source_questions'].forEach(ele2 => {
            this.PanelQuestionList.forEach(ele1 => {
              if (ele1.id === ele2) {
                ele1.is_copied = 1;
              }
            });
          });
        }

        this.payloadCopy = {};
        this.toastr.success(response.message);
        // setTimeout(() => {
        //   this.router.navigate(['/panel']);
        // }, 1000)
      } else {
        this.toastr.error(res.message);
      }
      $('#copyModal').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  onSuccess(value, imgid, lodimgid) {
    let obj = {};
    obj = { ...value };
    obj['panel_id'] = this.panelId;
    let call;
    if (this.addCategoryCheck) {
      call = this.httpservice.postData(obj, requrls.addquestioncategory);
    } else {
      call = this.httpservice.postData(obj, requrls.editquestioncategory + this.catEdit.id);
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.cs.showError(this.errors, 'i');
    call.subscribe(res => {
      let response = res;
      if (response.success) {
        $('#addCategory').modal('hide');
        this.getQuestionCategoryListFn();
        this.toastr.success(response.message);
      } else {
        if (res.data != {} && Object.values(res.data).length > 0) {
          this.errors = res.data;
          this.cs.showError(this.errors, 'a');
        } else {
          this.toastr.error(res.message);
        }
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  panelListFn() {
    this.spinnerService.show();
    this.httpservice.getData(requrls.listpanel).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.panelLists = response;
        this.panelLists = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
      }
      this.spinnerService.hide();
    });
  }

  reverse: boolean = false;

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

  changeShortorder(obj, value) {
    obj.display_order = value;
    obj.panel_id = this.panelId;
    this.httpservice.postData(obj, requrls.editpanelquesion).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    })
  }

}
