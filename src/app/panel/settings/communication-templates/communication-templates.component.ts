import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/shared/common.service';
import { Router } from '@angular/router';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl';

@Component({
  selector: 'app-communication-templates',
  templateUrl: './communication-templates.component.html',
  styleUrls: ['./communication-templates.component.css']
})
export class CommunicationTemplatesComponent implements OnInit {

  constructor(
    private httpservice: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStoreService: LocalstoreService,
    private router: Router,
    public cs: CommonService
  ) { }

  panelId;
  commTemplateList = [];
  commTemp: any = {};

  getCommunicationTemplate(id) {
    let payload = {
      'reference_id' : id
    }
    this.httpservice.getDataWithParams(payload, requrls.listtemplates).subscribe(res => {      
      let response = res;
      if (response.status_code == 200) {
        this.commTemplateList = response.data
      }
    })
  }

  editTemplate(data) {
    if (data != null) {
      this.localStoreService.setLocal('panel', 'sett-comm-temp', data);
      this.router.navigate(['/panel/settings/communication-template/edit']);
    }
  }

  ngOnInit() {
    let panelDtl = this.localStoreService.getLocal('panel', 'detail');
    if (panelDtl != undefined) {
      this.panelId = panelDtl.id;
      this.getCommunicationTemplate(panelDtl.id)
    }
  }


}
