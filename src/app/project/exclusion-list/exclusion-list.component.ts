import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderPipe } from 'ngx-order-pipe';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import * as panelStore from '../../panel/store';
import { getPanels } from '../../panel/store';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from '../store/requrl';

@Component({
  selector: 'app-exclusion-list',
  templateUrl: './exclusion-list.component.html',
  styleUrls: ['./exclusion-list.component.css']
})
export class ExclusionListComponent implements OnInit {

  exclusionList = [];
  exlFilter: any = {};
  order = '';
  selectedDatas = [];
  payload = {};
  popupMess: string = '';
  name;
  pulled_panelists_count;
  disablelink = true;
  panels;
  filterOption = '';
  panel_id = '';
  filter_optionn = '0';
  input_file = new FormData();
  addPayload: any = {};

  selectedFilter;
  include_exclude_type = '0';

  fileName = 'No file choosen';
  eventt;
  exList;

  constructor(
    private httpservice: HttpService,
    private orderPipe: OrderPipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private cs: CommonService,
    private panelstore: Store<panelStore.PanelsState>,
  ) { }


  getExcluionList() {
    this.spinnerService.show();
    this.httpservice.postData({}, requrls.exclusionlist).subscribe(res => {
      let response = res;
      if (response.success) {
        this.exclusionList = response.data.data;
        this.exclusionList.map(option => ({
          name: option.name,
          pulled_panelists_count: parseInt(option.pulled_panelists_count)
        }));
        this.exList = this.exclusionList.map(option => ({
          value: option.id,
          label: option.name
        }));
        console.log(this.exclusionList);
      } else {
        this.toastr.error(response.message);
      }
      this.spinnerService.hide();
    });
  }

  getPanels() {
    this.panelstore.select(panelStore.getAllPanelsLoaded).subscribe(state => {
      if (state) {
        this.panelstore.select(panelStore.getAllPanels).subscribe(state => {
          this.panels = state;
        });
      } else {
        this.panelstore.dispatch(new getPanels());
      }
    });
  }

  filterCat = [];

  selectOption(value) {
    const index = this.filterCat.indexOf(value);
    if (value !== undefined && value !== null && value != 0) {
      // this.selectedFilter += value + ' ';
      if (index === -1) {
        this.filterCat.push(value);
      } else {
        this.toastr.error('Already added!');
      }
    } else {
      this.toastr.error('Please select filter option!');
      // this.selectedFilter = value + ' ';
    }
    this.filter_optionn = '0';
  }

  removeCat(i) {
    this.filterCat.splice(i, 1);
  }

  onSubmit(formVal, imgid, lodimgid) {
    var t = Object.keys(formVal.form.controls).forEach(field => {
      const control = formVal.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.filterCat.length === 0) {
      document.getElementById('filtercate').style.display = 'block';
      return;
    }
    if (formVal.form.valid) {
      if (this.filterCat.length === 0) {
        (document.getElementById('include_exclude_list')as any).value = 'Input file is requred';
        return;
      } else {
        (document.getElementById('include_exclude_list')as any).value = 'Input file is requred';
      }
      this.addExclusion(formVal.value, imgid, lodimgid);
    } else {
      return;
    }
  }

  clearFilter() {
    // this.selectedFilter = null;
    this.filterCat = [];
  }

  sortData(sort) {
    if (this.order == sort) {
      this.order = sort + ': reverse';
    } else {
      this.order = sort;
    }
    this.orderPipe.transform(this.exclusionList, this.order);
  }

  selectAll(status) {
    this.selectedDatas = this.exclusionList.map(res => res.id);
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

  tptCheck(call) {
    console.log(call);
    if (call === 'tptOff') {
      this.include_exclude_type = '1';
    } else {
      this.include_exclude_type = '0';
    }
  }

  addExe() {
    $("#exampleModal").modal('show');
    this.eventt = null;
    this.fileName = null
  }

  getCsvFile(event) {
    console.log(event);
    this.eventt = event.target.value;
    if (event != null) {
      this.input_file.append('input_file', event.target.files[0], event.target.files[0].name);
      this.fileName = event.target.files[0].name;
      this.input_file.append('url_type', '0');
    }
  }

  getExFile() {
    if (this.filterCat.length === 0) {
      this.toastr.error('Please select Filter Option');
      return;
    }
    const payload = {
      'input_conditions': this.filterCat.join(' ')
    };
    this.httpservice.postData(payload, requrls.getexamplelistfile).subscribe(res => {
      let response = res;
      if (response.success) {
        window.location.href = response.data;
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  errors = [];
  req = false;

  addExclusion(value, imgid, lodimgid) {
    console.log(value)
    this.input_file.append('panel_id', value.panel_id);
    this.input_file.append('input_conditions', this.filterCat.join(' '));
    this.input_file.append('list_name', value.list_name);
    this.input_file.append('include_exclude_list_type', this.include_exclude_type);
    if (value.include_exclude_list !== undefined && value.include_exclude_list !== null) {
      // tslint:disable-next-line: max-line-length
      for (var i = 0; i < value.include_exclude_list.length; i++) {
        this.input_file.append('include_exclude_list['+i+']', value.include_exclude_list[i]);
      }
      // this.input_file.append('include_exclude_list', JSON.stringify(data));
    }
    if (this.addPayload.from_joining_date !== undefined) {
      this.input_file.append('from_joining_date', this.addPayload.from_joining_date);
    }
    if (this.addPayload.to_joining_date !== undefined) {
      this.input_file.append('to_joining_date', this.addPayload.to_joining_date);
    }
    if (this.eventt === undefined) {
      this.req = true;
      return;
    } else {
      this.req = false;
    }
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.cs.showError(this.errors, 'i');
    document.getElementById('filtercate').style.display = 'none';
    this.httpservice.postData(this.input_file, requrls.createexclusion).subscribe(res => {
      let response = res;
      if (response.success) {
        this.toastr.success(response.message);
        this.filterCat = [];
        (document.getElementById('datetimepicker1') as any).value = '';
        (document.getElementById('datetimepicker2') as any).value = '';
        this.getExcluionList();
        $('#exampleModal').modal('hide');
      } else {
        if (res.data !== {} && Object.values(res.data).length > 0) {
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

  delete(id, call) {
    this.payload = {};
    if (call == 'i') {
      this.payload['id'] = [id];
      $('#confirmBox').modal('show');
    } else {
      if (this.selectedDatas.length !== 0) {
        $('#confirmBox').modal('show');
        this.payload['id'] = this.selectedDatas;
      } else {
        this.toastr.error('Please Select Exclusion..!');
      }
    }
    this.popupMess = 'Are you sure want to delete.?';
  }

  deleteData(imgid, lodimgid) {
    this.cs.hideshowImge(imgid, lodimgid, 'a');
    this.httpservice.postData(this.payload, requrls.deleteexclusion).subscribe(res => {
      if (res.success) {
        this.payload['id'].forEach(ele2 => {
          this.exclusionList.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.exclusionList.indexOf(ele1);
              this.exclusionList.splice(index, 1);
            }
          });
        });
        if (this.selectedDatas.length > 0) {
          this.selectedDatas = [];
        }
        this.payload = {};
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, 'i');
      $('#confirmBox').modal('hide');
    });
  }

  downloadCsv(obj) {
    window.location.href = obj.url;
  }

  isShow = false;

  ngOnInit() {
    var self = this;
    this.getExcluionList();
    var myDate = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));
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
          self.addPayload['from_joining_date'] = self.cs.formatDate(e.date);
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
          self.addPayload['to_joining_date'] = self.cs.formatDate(e.date);
        });
      });
    }, 500);
    setTimeout(() => {
      this.isShow = true;
    }, 2000);
    this.getPanels();
  }
}
