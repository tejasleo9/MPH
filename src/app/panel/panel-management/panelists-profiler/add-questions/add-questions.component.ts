import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../../../shared/localstore.service';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from "ngx-order-pipe";
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../../store/requrl';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  payload = {};
  panelId;
  type;
  categories;
  quesobj: any = {};
  ansObj: any = {};
  errors = [];
  input_file = new FormData();


  answers = [];

  typeOptions = [
    { label: 'Single', value: 1 },
    { label: 'Multiple', value: 2 },
    { label: 'Open', value: 3 },
  ];

  questionCategoryList = [];

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private route: ActivatedRoute,
    private cs: CommonService
  ) { }

  textMeg = '';

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    let questiondtl = this.localStoreService.getLocal('panel', 'question');
    if (questiondtl != undefined) {
      this.textMeg = 'Edit';
      this.getQuestion(questiondtl.id);
    } else {
      this.textMeg = 'New';
    }
    if (pdetail != undefined) {
      this.panelId = pdetail.id
      this.getQuestionCategoryListFn(pdetail.id);
    }
  }

  getQuestion(id) {
    let payload = {
      'id': id
    }
    this.httpservice.postData(payload, requrls.panelquestion).subscribe(res => {
      if (res.success) {
        let response = res.data;
        response.panel_question_category_id = [response.panel_question_category_id];
        response.question_type = [response.question_type];
        this.quesobj = response;
        this.answers = response.panel_question_variable;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  getQuestionCategoryListFn(id) {
    let payload = {
      'panel_id': id
    }
    this.httpservice.getDataWithParams(payload, requrls.panelquestioncategory).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.questionCategoryList = response.map(option => ({
          value: option.id,
          label: option.name
        }));
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  onSubmit(f) {
    let action = this.route.snapshot.queryParamMap.get("action");
    var t = Object.keys(f.form.controls).forEach(field => {
      const control = f.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (f.form.valid == true) {
      this.uploadCsvFn(f);
    } else {
      return;
    }
  }

  fileName: any = 'No file choosen';
  eventData;

  getCsvFile(event) {
    this.input_file.set('file', event.target.files[0], event.target.files[0].name);
    this.fileName = event.target.files[0].name;
    this.eventData = event;
  }

  checkVideo() {
    if (this.answers.length > 0) {
      $('#discardModel').modal('show');
    } else {
      $("#exampleInputFile1").trigger("click");
    }
  }

  confirm() {
    if (this.fileName != 'No file choosen') {
      this.input_file = new FormData();
      this.fileName = 'No file choosen';
      $('#addAnswers').modal('show');
    } else {
      $("#exampleInputFile1").trigger("click");
      this.answers = [];
    }
    this.eventData = null;
    (document.getElementById("exampleInputFile1") as any).value = null;
    $('#discardModel').modal('hide');
  }

  addAnswer() {
    if (this.fileName != 'No file choosen') {
      $('#discardModel').modal('show');
    } else {
      $('#addAnswers').modal('show');
    }
  }

  uploadCsvFn(f) {
    var t = Object.keys(f.form.controls).forEach(field => {
      const control = f.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    let dropChkArray = [];
    dropChkArray = [{
      value: f.value.panel_question_category_id,
      key: 'panel_question_category_idd'
    }, {
      value: f.value.question_type,
      key: 'question_typee'
    }
    ];
    let dropChk = this.cs.dropChkFn(dropChkArray);
    if (dropChk.length != 0) {
    } else {
      if (f.form.valid == true) {
        let payload;
        if (this.fileName != 'No file choosen' && this.fileName != '') {
          this.input_file.set('display_order', f.value.display_order);
          this.input_file.set('name', f.value.name);
          this.input_file.set('native_text', f.value.native_text);
          this.input_file.set('panel_id', this.panelId);
          this.input_file.set('panel_question_category_id', f.value.panel_question_category_id);
          this.input_file.set('question_type', f.value.question_type);
          this.input_file.set('text', f.value.text);
          payload = this.input_file;
          this.answers = [];
        } else {
          this.fileName = "";
          this.input_file = new FormData();
          let obj = {};
          this.quesobj['panel_id'] = this.panelId;
          let is_men = this.quesobj.is_mandatory == null ? 0 : this.quesobj.is_mandatory;
          this.quesobj['is_mandatory'] = is_men;
          this.quesobj['variables'] = this.answers;
          obj = { ...this.quesobj };
          payload = obj;
        }
        this.cs.showError(this.errors, 'i');
        f.value['panel_id'] = this.panelId;
        let action = this.route.snapshot.queryParamMap.get("action");
        let questiondtl = this.localStoreService.getLocal('panel', 'question');
        let callTo;
        if (action == 'edit') {
          if (questiondtl != undefined) {
            payload.panel_question_category_id = typeof this.quesobj.panel_question_category_id == "object" ? +this.quesobj.panel_question_category_id[0] : +this.quesobj.panel_question_category_id;
            payload.question_type = typeof this.quesobj.question_type == "object" ? +this.quesobj.question_type[0] : +this.quesobj.question_type;
            callTo = this.httpservice.postData(payload, requrls.editpanelquesion);
          }
        } else {
          f.value.tracking_type == '0' ? delete f.value.tracking_type : f.value.tracking_type;
          callTo = this.httpservice.postData(payload, requrls.addpanelquestion);
        }
        this.spinnerService.show();
        callTo.subscribe(res => {
          let response = res;
          if (response.success) {
            this.toastr.success(res.message);
            this.router.navigate(['/panel/panel-management/panelist-profiler']);
          } else {
            if (res.data != {} && Object.values(res.data).length > 0) {
              this.errors = res.data;
              this.cs.showError(this.errors, 'a');
            } else {
              this.toastr.error(res.message);
            }
          }
          this.input_file = new FormData();
          this.spinnerService.hide();
        })
      } else {
        return;
      }
    }
  }

  remove(index) {
    this.answers.splice(index, 1);
  }

  close() {
    let action = this.route.snapshot.queryParamMap.get("action");
    if (action == 'edit') {
      let index = this.answers.indexOf(this.ansObj);
      this.answers[index] = this.cloneObj;
    }
    $('#addAnswers').modal('hide');
  }

  cloneObj: any = {};

  edit(editObj, f) {
    f.reset();
    this.ansObj = editObj;
    this.cloneObj = { ...editObj };
    $('#addAnswers').modal('show');
  }

  onSubmitFn(f) {
    var t = Object.keys(f.form.controls).forEach(field => {
      const control = f.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!f.valid) return;
    let obj = {
      'text': f.value.text,
      'native_text': f.value.native_text,
      'sort_order': f.value.sort_order,
      'is_exclusive': f.value.is_exclusive == true ? 1 : 0,
    }
    let action = this.route.snapshot.queryParamMap.get("action");
    if (action == 'edit') {
      let index = this.answers.indexOf(this.ansObj);
      this.answers[index] = this.ansObj;
    } else {
      this.answers.push(obj);
    }
    this.toastr.success("answer is added");
    f.reset();
    //
  }
}
