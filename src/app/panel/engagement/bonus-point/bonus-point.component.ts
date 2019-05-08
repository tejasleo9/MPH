import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../../shared/localstore.service';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/shared/common.service';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-bonus-point',
  templateUrl: './bonus-point.component.html',
  styleUrls: ['./bonus-point.component.css']
})
export class BonusPointComponent implements OnInit {

  panelDetail;
  bonusPoints;
  ifError: boolean = false;

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private cs: CommonService
  ) { }

  ngOnInit() {
    let pdetail = this.localStoreService.getLocal('panel', 'detail');
    if (pdetail != undefined || pdetail != null) {
      this.panelDetail = this.localStoreService.getLocal('panel', 'detail');
    }
    this.getBonusPoints();
  }

  getBonusPoints() {
    this.spinnerService.show();
    let payload = { 'panel_id': '' };
    payload['panel_id'] = this.panelDetail['id'];
    this.httpservice.postData(payload, requrls.viewbonuspoints).subscribe(res => {
      if (res.success) {
        let response = res.data;
        this.ifError = false;
        this.bonusPoints = response.map(option => ({
          'key': option.key.split('_').join(' '),
          'value': option.value,
          'keyname': option.key
        }));
      } else {
        this.ifError = true;
      }
      this.spinnerService.hide();
    });
  }

  onSubmit(f, imgid, lodimgid) {
    let payload = f.value;
    payload['panel_id'] = this.panelDetail['id'];
    this.cs.hideshowImge(imgid, lodimgid, "a");
    this.httpservice.postData(payload, requrls.editbonuspoints).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      this.cs.hideshowImge(imgid, lodimgid, "i");
    });
  }

}
