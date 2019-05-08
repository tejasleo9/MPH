import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstoreService } from 'app/shared/localstore.service';
import { Router } from '@angular/router';
import { CommonService } from 'app/shared/common.service';
import { Observable, fromEvent } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { debounceTime, map } from 'rxjs/operators';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {

  payload:any = {};
  selectedDatas = [];
  disablelink = true;
  popupMess: string = '';
  affiliateLists: any = [];
  panelId;
  reverse: boolean = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    private cs: CommonService
  ) { }

  ngOnInit() {
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
    }
    this.affiliateListFn();
    var self = this;
    var myDate = new Date();
    self.payload['created_at'] = new Date();
    setTimeout(() => {
      $(function () {
        $('#datetimepicker1').datetimepicker({
          format: 'DD-MM-YYYY',
          defaultDate: myDate,
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
          self.payload['created_at'] = e.date;
        });
      });
    }, 500);
  }

  affiliateListFn() {
    let payload = {
      'panel_id': this.panelId
    }
    this.spinnerService.show();
    this.httpservice.postData(payload, requrls.affiliatelist).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.affiliateLists = response;
      } else {
      }
      this.spinnerService.hide();
    });
  }

  selectAll(status) {
    this.selectedDatas = this.affiliateLists.map(res => res.id);
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

  delete(obj, call) {
    if (obj != null && obj.registrations > 0) return;
    this.payload = {};
    this.payload['panel_id'] = this.panelId;
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
    this.httpservice.postData(this.payload, requrls.deleteaffiliate).subscribe(res => {
      let response = res;
      if (response.success) {
        this.payload['id'].forEach(ele2 => {
          this.affiliateLists.forEach(ele1 => {
            if (ele1.id === ele2) {
              let index = this.affiliateLists.indexOf(ele1);
              this.affiliateLists.splice(index, 1);
            }
          });
        });
        this.payload = {};
        this.toastr.success(response.message);
        this.selectedDatas = [];
      } else {
        this.toastr.error(response.message);
      }
      $('#confirmBox').modal('hide');
      this.cs.hideshowImge(imgid, lodimgid, 'i');
    });
  }

  addAffiliateFn() {
    localStorage.setItem('affiliateId', null);
    localStorage.setItem('affiliateEdit', 'false');
  }

  editAffiliate(obj) {
    if (obj != null) {
      this.localStoreService.setLocal('panel', 'affi-detail', obj);
      this.router.navigate(['/panel/affiliate/add-edit'], { queryParams: { action: 'edit' } });
    }
  }

  newAffiliate() {
    this.localStoreService.removeLocalStorageObj('panel', 'affi-detail');
    this.router.navigate(['/panel/affiliate/add-edit'], { queryParams: { action: 'new' } });
  }

  @ViewChild('questionInput') questionInput: ElementRef;
  public input$: Observable<string>;

  ngAfterViewInit() {
    this.input$ = fromEvent(this.questionInput.nativeElement, 'input')
      .pipe(
        debounceTime(1500),
        map((e: KeyboardEvent) => e.target['value'])
      );
    this.input$.subscribe((val: string) => {
      let payload = {
        'name': val == '' ? undefined : val,
        'panel_id': this.panelId
      }
      this.spinnerService.show();
      this.httpservice.postData(payload, requrls.affiliatelist)
        .subscribe(res => {
          if (res.success) {
            let response = res.data;
            this.affiliateLists = response;
          } else {
            this.affiliateLists = [];
          }
          this.spinnerService.hide();
        });
    });
  }

  reset(){
    this.affiliateListFn();
    document.getElementById('headname').click();
  }

  search(f, txtId, lodimgid) {
    let payload = {
      'panel_id': this.panelId,
      'created_at': this.cs.formatDate(this.payload.created_at),
    }
    if (this.payload.created_at == undefined) {
      return;
    } else {
      this.cs.hideshowImge(txtId, lodimgid, 'a');
      this.httpservice.postData(payload, requrls.affiliatelist).subscribe(res => {
        if (res.success) {
          let response = res.data;
          this.affiliateLists = response;
        } else {
          this.affiliateLists = [];
        }
        this.cs.hideshowImge(txtId, lodimgid, 'i');
      });
    }
  }

  order = "";

  sortData(sort) {
    if (this.order == sort) {
      this.order = sort + ": reverse";
    } else {
      this.order = sort;
    }
  }


}
