import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../store/requrl';

@Component({
  selector: 'app-copy-questions',
  templateUrl: './copy-questions.component.html',
  styleUrls: ['./copy-questions.component.css']
})
export class CopyQuestionsComponent implements OnInit {

  questionList: any = [];
  panelId;
  panelEdit;
  selectedDatas = [];
  disablelink = true;

  category;
  questions;
  qtName;
  answers;

  panelDtl;
  seachQues: any = {};


  order: string = '';
  reverse: boolean = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
  ) { }

  ngOnInit() {
    let panelDtl = this.localStoreService.getLocal('panel', 'panel-detail');
    if (panelDtl != undefined) {
      this.panelDtl = panelDtl;
      this.getQuestionsFn(panelDtl.id);
      this.panelId = panelDtl.id;
    }
  }

  getQuestionsFn(id) {
    const payload = {
      "panel_id": id
    };
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.getcopyquestion).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.questionList = response;
      } else {
        console.log(res);
      }
      this.spinnerService.hide();
    })

  }

  questionDet(qtName, cat) {
    this.qtName = qtName;
    this.category = cat;
    // this.questions = qt;
    this.answers = cat.global_question_variable;
  }

  payloadCopy: any = {};

  copy(obj, call) {
    this.payloadCopy = {};
    this.payloadCopy['question_level'] = 'global';
    this.payloadCopy['target_panel_id'] = +this.panelId;
    if (call == 'i') {
      this.payloadCopy['source_questions'] = [obj.global_question_country_id];
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

  copyData(imgid, lodimgid) {
    this.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payloadCopy, requrls.copyquestion).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payloadCopy['source_questions'].forEach(ele1 => {
          this.questionList.forEach(ele2 => {
            // ele2.questions.forEach(ele3 => {
              if (ele1 == ele2.global_question_country_id) {
                ele2.is_copied = 1;
              }
            // });
          });
        });
        this.selectedDatas = [];
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#copyModal').modal('hide');
      this.hideshowImge(imgid, lodimgid, 'i');
    })
  }

  hideshowImge(stimg, imgid, call) {
    if (call == 'a') {
      document.getElementById(stimg).style.display = 'none';
      document.getElementById(imgid).style.display = 'inline-block';
    } else {
      document.getElementById(stimg).style.display = 'inline-block';
      document.getElementById(imgid).style.display = 'none';
    }
  }

  val = 'name';

  selectData(obj, status) {
    if (status) {
      if (this.selectedDatas.indexOf(obj.global_question_country_id) != -1) {
      } else {
        this.selectedDatas.push(obj.global_question_country_id);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj.global_question_country_id);
      this.selectedDatas.splice(index, 1);
    }
    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  searchTxt(val) {
    this.seachQues[val] = val;
  }

  submit() {
    this.router.navigate(['/panel']);
    this.toastr.success("Panel created successfully");
  }

  sortData(sort) {
    if (this.order === sort) {
      this.reverse = !this.reverse;
    }
    this.order = sort;
  }

//   onlyAlphabets(e, t) {
//     try {
//       if (window.event) {
// // tslint:disable-next-line: no-var-keyword
//         var charCode = window.event.keyCode;
//       }
//       else if (e) {
// // tslint:disable-next-line: no-var-keyword
//         var charCode = e.which;
//       }
//       else { return true; }
// // tslint:disable-next-line: curly
//       if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 32)
//         return true;
// // tslint:disable-next-line: curly
//       else
//         return false;
//     }
// // tslint:disable-next-line: one-line
//     catch (err) {
//       alert(err.Description);
//     }
//   }

}
