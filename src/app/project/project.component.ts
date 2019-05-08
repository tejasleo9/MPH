import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../core/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { LoadProjects } from './store/actions/project.actions';
import { OrderPipe } from 'ngx-order-pipe';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProService } from './store/service';
import { LocalstoreService } from '../shared/localstore.service';
import { CommonService } from '../shared/common.service';
declare var $: any;
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './store/requrl';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [HeaderComponent]
})
export class ProjectComponent implements OnInit {

  products: any = [];
  sendData;
  isAuthenticated: false;
  projects: any = [];
  proFilter: any = {};
  order: string = '-name';
  projectsLoaded = false;
  selectedDatas = [];
  selectedStatus = [];
  payload: any = {};
  popupMess: string = '';
  pageSize = 10;
  cPage = 1;
  total = 15;
  path: string;
  perpage = 20;
  statusdrop = [{ 'label': 'Activated', 'value': 1 }, { 'label': 'Paused', 'value': 2 }, { 'label': 'Closed', 'value': 4 }]
  name;
  status = '';
  completes_required;
  disablelink = true;
  sort = '';
  activedis;
  pausedis;
  closedis;
  deletedis;
  getpro;

  constructor(
    private router: Router,
    private httpservice: HttpService,
    private store: Store<fromStore.ProjectsState>,
    private orderPipe: OrderPipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService,
  ) { }

  ngOnInit() {
    const payload = { "select_fields": "id,name,start_date,completes_required,company_id,status,completion_rate" }
    this.getProjects(payload);
    var self = this;
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
    self.payload['from_start_date'] = undefined;
    self.payload['to_start_date'] = undefined;
    setTimeout(() => {
      $(function () {
        $('#datetimepicker1').datetimepicker({
          format: 'DD-MM-YYYY',
          // defaultDate: myDate,
          icons: {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            next: "fa fa-arrow-right",
            previous: "fa fa-arrow-left"
          },
        });
        $("#datetimepicker1").on("dp.change", function (e) {
          if (!e.date) {
            self.payload['from_start_date'] = undefined;
          } else {
            self.payload['from_start_date'] = e.date;
          }
        });

        $('#datetimepicker2').datetimepicker({
          format: 'DD-MM-YYYY',
          useCurrent: true,
          // defaultDate: new Date(),
          icons: {
            time: "fa fa-clock",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down",
            next: "fa fa-arrow-right",
            previous: "fa fa-arrow-left"
          },
        });
        $("#datetimepicker2").on("dp.change", function (e) {
          console.log(e.date);
          if (!e.date) {
            self.payload['to_start_date'] = undefined;
          } else {
            self.payload['to_start_date'] = e.date;
          }
        });
      });
    }, 500);
  }

  getProjects(payload) {
    this.spinnerService.show();
    this.store.select(fromStore.getProjectsLoaded).subscribe(state => {
      if (state) {
        this.store.select(fromStore.getAllProjects).subscribe(state => {
          if (state['success']) {
            this.projects = state['data']['data'];
            this.pageSize = state['data']['per_page'];
            this.cPage = state['data']['current_page'];
            this.total = state['data']['total'];
            this.path = state['data']['path'];
            this.perpage = state['data']['per_page'];
            this.spinnerService.hide();
          } else {
            this.projects = [];
          }
          this.spinnerService.hide();
        });
      } else {
        this.store.dispatch(new LoadProjects(payload));
      }
    });
  }

  pageChanged(e) {
    const payload = {
      "select_fields": "id,name,start_date,completes_required,company_id,status,completion_rate",
      "page": +e,
      'per_page': +this.perpage
    }
    this.cPage = e;
    this.pageSize = this.perpage;
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listproject).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.projects = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
  }

  perPage(pagesize) {
    this.perpage = +pagesize;
    this.pageSize = pagesize;
    const payload = {
      "select_fields": "id,name,start_date,completes_required,company_id,status,completion_rate",
      "per_page": +this.perpage,
      "page": this.cPage
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.listproject).subscribe(res => {
      let responce = res;
      if (res.success) {
        this.projects = responce.data.data;
        this.total = responce.data.total;
      }
      this.spinnerService.hide();
    });
  }

  sortpayload: any = {};

  sortData(sort) {
    let sdir;
    if (this.sort != sort) {
      sdir = 'asc';
      this.sort = sort;
    } else {
      sdir = 'desc';
      this.sort = '';
    }
    this.spinnerService.show();
    this.sortpayload['order_by'] = sort;
    this.sortpayload['order_dir'] = sdir;
    let payload = this.sortpayload;
    this.httpservice.postData(payload, requrls.listproject).subscribe(res => {
      this.projects = res.data.data;
      this.pageSize = this.perpage;
      this.total = res.data.total;
    });
    this.spinnerService.hide();
  }

  selectAll(status) {
    this.selectedDatas = this.projects.map(res => res.id);
    if (status) {
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

      if (this.selectedStatus.indexOf(obj.status) != -1) {
      } else {
        this.selectedStatus.push(obj.status);
      }
    } else {
      let index = this.selectedDatas.indexOf(obj.id);
      let statusindex = this.selectedStatus.indexOf(obj.status);
      this.selectedDatas.splice(index, 1);
      this.selectedStatus.splice(statusindex, 1);
    }
    if (this.selectedDatas.length > 0) {
      this.disablelink = false;
    } else {
      this.disablelink = true;
    }
  }

  delete(obj, call) {
    this.payload = {};
    if (call == 'i') {
      this.payload['id'] = [obj.id];
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        $('#confirmBox').modal('show');
        this.payload['id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deleteproject).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload['id'].forEach(ele2 => {
          this.projects.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.projects.indexOf(ele1);
              this.projects.splice(index, 1);
            }
          });
        });
        this.selectedDatas = [];
        this.payload = {};
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.cs.afterreset();
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  async changeStatus(pObj, stat, call, imgid, lodimgid) {
    if (pObj != null) {
      if (pObj.status == 1 && stat == 1) {
        this.toastr.error("Project is already Active");
        return;
      } else if (pObj.status == 2 && stat == 2) {
        this.toastr.error("Project is already Pause");
        return;
      } else if (pObj.status == 4 && stat == 4) {
        this.toastr.error("Project is already Close");
        return;
      }
    }
    const payload = { "status": stat };
    if (call == 'i') {
      payload['project_id'] = [pObj.id];
    } else {
      if (this.selectedDatas.length != 0) {
        this.disablelink = false;
        payload['project_id'] = this.selectedDatas;
      } else {
        this.disablelink = true;
        return;
      }
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(payload, requrls.updateprojectstatus).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
        this.projects.map(ele1 => {
          payload['project_id'].forEach(ele2 => {
            if (ele1.id == ele2) {
              ele1.status = +stat;
            }
          });
        });
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    })
    this.cs.afterreset();
  }

  editProject(id, name, status) {
    let obj = {
      'id': id,
      'name': name,
      'status': status
    }
    this.localStoreService.removeLocal('project');
    this.localStoreService.removeLocal('target-group');
    this.localStoreService.removeLocal('regions');
    this.localStoreService.removeLocal('project-exclusion');
    this.localStoreService.removeLocal('changed');
    this.localStoreService.setLocal('project', 'detail', obj)
    this.localStoreService.lastAction('last-action', 'edit');
    this.router.navigate(['/project/overview'], { queryParams: { action: 'edit' } });
  }

  addNew() {
    this.localStoreService.removeLocal('project');
    this.localStoreService.removeLocal('target-group');
    this.localStoreService.removeLocal('regions');
    this.localStoreService.removeLocal('project-exclusion');
    this.localStoreService.removeLocal('changed');
    this.localStoreService.lastAction('last-action', 'new');
    this.router.navigate(['/project/overview'], { queryParams: { action: 'new' } });
  }

  search(f, txtId, lodimgid) {
    let payload: any = {};
    if (
      (f.value.name === undefined || f.value.name === "") &&
      (f.value.status === undefined || f.value.status === "") &&
      this.payload.from_start_date === undefined &&
      this.payload.to_start_date === undefined
    ) {
      return;
    } else {
      if (f.value.name !== undefined && f.value.name != "" && f.value.name !==  null) {
        payload['name'] = f.value.name;
      } else {
        delete payload.name;
      }
      if (f.value.status !== undefined && f.value.status != "" && f.value.status !==  null) {
        payload['status'] = f.value.status;
      } else {
        delete payload.status;
      }
      if (this.payload.from_start_date !== undefined) {
        payload['from_start_date'] = this.cs.formatDate(this.payload.from_start_date);
      }
      if (this.payload.to_start_date !== undefined) {
        payload['to_start_date'] = this.cs.formatDate(this.payload.to_start_date);
      }
      this.sortpayload = payload;
      console.log(payload);
      this.cs.hideshowImge(txtId, lodimgid, 'a');
      this.httpservice.postData(payload, requrls.listproject).subscribe(res => {
        if (res.success) {
          this.projects = res.data.data;
          this.pageSize = this.perpage;
          this.total = res.data.total;
        } else {
          this.projects = [];
        }
        this.cs.hideshowImge(txtId, lodimgid, 'i');
        this.cs.afterreset();
      });
    }
  }

  searchname(v) {
    if (this.getpro) {
      this.getpro.unsubscribe();
    }
    let payload = {
      'name': v == '' ? undefined : v,
      'select_fields': 'id,name,start_date,completes_required,company_id,status,completion_rate'
    }
    this.spinnerService.show();
    this.getpro = this.httpservice.postData(payload, requrls.listproject).subscribe(res => {
      if (res.status_code === 2068) {
        this.projects = [''];
        this.spinnerService.hide();
      }
      if (res.status_code === 200) {
        this.projects = res.data.data;
        this.pageSize = this.perpage;
        this.total = res.data.total;
        this.spinnerService.hide();
      }
    });
  }

  reset() {
    const payload = { "select_fields": "id,name,start_date,completes_required,company_id,status,completion_rate" };
    this.name = '';
    this.status = '';
    this.completes_required = '';
    this.getProjects(payload);
    this.sortpayload = {};
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
    this.payload['from_start_date'] = undefined;
    this.payload['to_start_date'] = undefined;
    (document.getElementById('datetimepicker1') as any).value = ' ';
    (document.getElementById('datetimepicker2') as any).value = ' ';
    var self = this;
    this.cs.afterreset();
  }

}

// let payload = {
//   'name': f.value.name == "" ? undefined : f.value.name,
//   'status': f.value.status == '' ? undefined : f.value.status,
//   'completes_required': f.value.completes_required == '' ? undefined : f.value.completes_required,
//   'from_start_date': this.payload.from_start_date == undefined ? undefined : this.cs.formatDate(this.payload.from_start_date),
//   'to_start_date': this.payload.to_start_date == undefined ? undefined : this.cs.formatDate(this.payload.to_start_date),
// }
