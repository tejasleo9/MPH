import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalstoreService } from '../../../shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../shared/common.service';
import * as requrls from '../../store/requrl';
import { HttpService } from "app/store/http/http.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  getqcatData = [];
  getproQueData;
  questionsLoading;
  carShown = false;
  is_visible = false;

  constructor(
    private httpservice: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private localStoreService: LocalstoreService,
    private toastr: ToastrService,
    private cs: CommonService
  ) { }

  proname;
  project_id;
  target_grp_id;
  action;
  source = [];

  currIndex;
  toggle: boolean = false;

  saveQuestion = {};
  questionAns = [];
  veriable = []
  payload = {};
  srcloaded;
  sources = [];
  localSoruces = [];
  project_status;

  selectedLists = [];
  flag = true;
  lastAction = this.localStoreService.getLastAction('last-action');
  is_disabled = false;

  is_only_source_change = false;
  exQues = [];
  redirectFlag = false;


  ngOnInit() {
    let localStoreDetail = this.localStoreService.getLocal('project', 'detail');
    this.project_id = +localStoreDetail.id;
    this.project_status = localStoreDetail.status;
    this.proname = localStoreDetail.name;
    let action = this.route.snapshot.queryParamMap.get('action');
    this.action = action;
    let localStoreTgDetail = this.localStoreService.getLocal('target-group', 'detail'); // target group details
    let localStorageTgOverview = this.localStoreService.getLocal('target-group', 'overview');
    if (localStoreTgDetail == undefined) {
      setTimeout(() => {
        this.toastr.error('Please create Target group');
      }, 500);
      return;
    } else {
      this.target_grp_id = localStoreTgDetail.id;
    }
    let localStorageTgSource = this.localStoreService.getLocal('target-group', 'source');
    if (localStorageTgSource != undefined) {
      this.source = localStorageTgSource;
    }
    if (localStorageTgOverview.is_editable == 0) {
      this.is_disabled = true;
      this.carShown = true;
      this.getQuestionsCategories();
    } else {
      this.is_disabled = false;
      this.carShown = false;
    }

    setTimeout(() => {
      this.is_visible = true;
    }, 5000);
  }

  addToList(obj, status) {
    this.flag = true;
    this.is_only_source_change = false;
    if (this.source.length > 0) {
      const index = this.source.indexOf(obj);
      if (status) {
        this.source[index].is_selected = 1;
      } else {
        this.source[index].is_selected = 0;
      }
    }
  }

  resetall = false;

  selectSource() {
    this.carShown = false;
    this.redirectFlag = false;
    this.flag = false;
  }

  getQuestionsCategories() {
    const payload = {
      "target_group_id": this.target_grp_id,
      "project_id": this.project_id
    }
    let source = this.localStoreService.getLocal('target-group', 'profile-source');
    this.sources = source;
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.getprofileqescategories).subscribe(res => {
      let response = res;
      if (response.success) {
        if (response.data.length > 0) {
          this.questionAns = [];
          this.getqcatData = response.data[0].categories;
          let is_editable = response.data[0].is_editable;
          if (is_editable == 0) {
            this.is_disabled = true;
          } else {
            this.is_disabled = false;
          }
          let exeQuestion = response.data[0].questions;
          this.exQues = exeQuestion;
          this.final = exeQuestion;
          this.generateSource();//0 for single
          this.getqcatData.forEach(element => {
            element['value'] = [];
            element['count'] = [];
            element['exvalue'] = [];
            element['is_open'] = false;
          });
        } else {
          this.getqcatData.length = 0;
        }
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    })
  }

  catSelect(x, index, call) {
    this.toggle = !this.toggle;
    this.currIndex = index;
    const payload = {
      "category_id": x.category_id,
      "target_group_id": this.target_grp_id
    }
    if (x.value.length <= 0) {
      x.is_open = !x.is_open;
      this.questionsLoading = true;
      this.httpservice.postData(payload, requrls.getprofilequestions).subscribe(res => {
        let response = res;
        if (response.success) {
          this.getproQueData = response.data.questions;
          x.value = response.data.questions;
          x.value.forEach(element => {
            element.value = [];
          });
        } else {
          this.toastr.error(response.message);
        }
        this.questionsLoading = false;
      })
    } else {
      x.is_open = !x.is_open;
    }
  }

  is_click = false;

  selectAnswer(question, answer, status, category) {
    this.final = [];
    this.is_click = true;
    if (status) {
      question.is_selected = 1;
      answer.is_selected = 1;
    } else {
      answer.is_selected = 0;
    }
    category.number_of_questions = 0;
    category.value.forEach(res => {
      if (res.is_selected == 1) {
        category.number_of_questions++
      }
    })
    this.actionFun();
  }

  actionFun() {
    this.getqcatData.forEach(res => {
      res.value.forEach(res1 => {
        if (res1.is_selected == 1) {
          let i = this.questionAns.indexOf(res1);
          if (i != -1) {
          } else {
            this.questionAns.push(res1);
          }
        }
      })
    });
    let temp = this.questionAns.map(res1 => ({
      id: res1.question_id,
      variables: res1.variables.filter(res2 => {
        if (res2.is_selected == 1) {
          return res2;
        }
      }).map(res3 => ({
        id: res3.variable_id
      }))
    }))
    let temp2 = temp.filter(res => {
      if (res.variables.length > 0) {
        return res
      }
    }).map(res1 => {
      return res1;
    });
    if (this.exQues.length > 0) {
      this.exQues.forEach((res, index) => {
        temp2.forEach(res5 => {
          res5.variables.forEach(res6 => {
            res.variables.forEach(res4 => {
              if (res6.id == res4.id) {
                this.exQues.splice(index, 1);
              }
            })
          })
        })
      })
    }
    let extemp = [...this.exQues];
    this.final = temp2.concat(extemp);
    this.generateSource(); //0 for single
  }

  reset(item, call) {
    this.redirectFlag = true;
    this.is_click = true;
    item.number_of_questions = 0;
    item.value.forEach(ele3 => {
      ele3.is_selected = 0
      ele3.variables.forEach(ele4 => {
        ele4.is_selected = 0
      });
    });
    if (this.exQues.length > 0) {
      item.value.forEach(res5 => {
        this.exQues.forEach(res => {
          if (res5.question_id === res.id) {
            let index = this.exQues.indexOf(res);
            this.exQues.splice(index, 1);
          }
        })
      })
    }
    let extemp = [...this.exQues];
    this.final = extemp;
    if (call == 0) {
      this.generateSource();
    }
  }

  resetAll() {
    this.redirectFlag = true;
    this.resetall = true;
    this.final = [];
    this.exQues = [];
    this.is_click = true;
    this.getqcatData.forEach(all => {
      this.reset(all, 1);
      all.number_of_questions = 0;
      all.value.forEach(allvalue => {
        allvalue.value = [];
        allvalue.variables.forEach(allveriable => {
          allveriable.is_selected = 0;
        });
      });
    });
    this.questionAns = [];
    this.generateSource(); //1 for multiple
  }

  generateSource() {
    this.sources = [];
    this.srcloaded = true;
    let localStoreTgOverview = this.localStoreService.getLocal('target-group', 'overview');
    let reqData = { ...localStoreTgOverview }
    let source;
    let sel_source = this.source.filter(res => {
      if (res.is_selected == 1) {
        return res;
      }
    }).map(res => {
      return res.panel_id;
    })
    if (sel_source.length > 1) {
      source = 0;
    } else if (sel_source.length == 1) {
      source = sel_source[0];
    }
    let obj = {};
    if (this.final.length == 0) {
      obj[source] = [];
    } else {
      obj[source] = this.final;
    }
    reqData['questions'] = obj;
    this.httpservice.postData(reqData, requrls.quotafeasibility).subscribe(res => {
      let response = res;
      if (response.success) {
        let source = Object.values(response.data.data[0].feasible);
        if (source.length > 0) {
          this.source = source;
        }
        this.srcloaded = false;
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    })
  }

  previous() {
    let action = this.route.snapshot.queryParamMap.get('action');
    this.router.navigate(['/project/target-groups/region'], { queryParams: { action: action } });
  }

  final = [];

  next(txtId, imgId) {
    let count = this.source.filter(res => {
      if (res.is_selected === 1) {
        return res;
      }
    }).map(res => {
      return res;
    }).length;
    if (count === 0) {
      this.toastr.error('please select source');
      return;
    }
    let action = this.route.snapshot.queryParamMap.get('action');
    if (this.is_only_source_change) {
      const updatesourcepayload = {
        'target_group_id': this.target_grp_id,
        'sources': this.source.filter(res => {
          if (res.is_selected == 1) {
            return res;
          }
        }).map(res => {
          return res.panel_id;
        })
      };
      if (updatesourcepayload.sources.length == 0) {
        this.toastr.error('Please select source');
        return;
      }
      this.httpservice.postData(updatesourcepayload, requrls.updatesource).subscribe(res => {
        let response = res;
        if (response.success) {
          this.localStoreService.setLocal('target-group', 'source', this.source);
          this.router.navigate(['/project/target-groups/exclusion'], { queryParams: { action: action } });
        } else {
          this.toastr.error(response.message);
        }
      })
      return;
    }
    if (this.is_click) {
      this.actionFun();
      this.cs.hideshowImge(txtId, imgId, 'a');
      let payload = {
        'questions': this.final.length == 0 ? ["0"] : this.final,
        'target_group_id': this.target_grp_id
      }
      this.httpservice.postData(payload, requrls.savetargetgrpquestion).subscribe(res => {
        let response = res;
        if (response.success) {
          this.updateSourceWithQuestion();
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
        this.cs.hideshowImge(txtId, imgId, 'i');
      })
    } else {
      this.router.navigate(['/project/target-groups/exclusion'], { queryParams: { action: action } });
      return;
    }
  }

  updateSource() {
    this.is_only_source_change = false;
    const updatesourcepayload = {
      'target_group_id': this.target_grp_id,
      'sources': this.source.filter(res => {
        if (res.is_selected == 1) {
          return res;
        }
      }).map(res => {
        return res.panel_id;
      })
    };
    if (updatesourcepayload.sources.length == 0) {
      this.toastr.error('Please select source');
      return;
    }
    this.spinnerService.show();
    this.httpservice.postData(updatesourcepayload, requrls.updatesource).subscribe(res => {
      let response = res;
      if (response.success) {
        this.carShown = true;
        this.localStoreService.setLocal('target-group', 'source', this.source);
        this.getQuestionsCategories();
      } else {
        this.carShown = false;
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    })
  }

  updateSourceWithQuestion() {
    this.spinnerService.show();
    const updatesourcepayload = {
      'target_group_id': this.target_grp_id,
      'sources': this.source.filter(res => {
        if (res.is_selected == 1) {
          return res;
        }
      }).map(res => {
        return res.panel_id;
      })
    };
    this.httpservice.postData(updatesourcepayload, requrls.updatesource).subscribe(res => {
      let response = res;
      if (response.success) {
        this.carShown = true;
        setTimeout(() => {
          let action = this.route.snapshot.queryParamMap.get('action');
          this.router.navigate(['/project/target-groups/exclusion'], { queryParams: { action: action } });
        }, 1000);
        let questionAns = this.questionAns.map(res1 => ({
          question_id: res1.question_id,
          is_selected: res1.is_selected,
          question_sort_order: res1.question_sort_order,
          question_text: res1.question_text,
          value: res1.variables.filter(res2 => {
            if (res2.is_selected == 1) {
              return res2;
            }
          }).map(res3 => ({
            is_selected: res3.is_selected,
            variable_id: res3.variable_id,
            variable_sort_order: res3.variable_sort_order,
            variable_text: res3.variable_text,
          }))
        }))
        this.localStoreService.setLocal('target-group', 'profile', questionAns);
        this.localStoreService.setLocal('target-group', 'source', this.source);
        this.getQuestionsCategories();
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    })
  }


}

