import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpService } from 'app/store/http/http.service';
import * as requrls from '../../store/requrl';
import { LocalstoreService } from 'app/shared/localstore.service';
import { ToastrService } from "ngx-toastr";
declare var $: any;
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  action;
  trgid;
  cUrl = '';
  temp = '';
  sub$;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpservice: HttpService,
    private localStoreService: LocalstoreService,
    private toastr: ToastrService,
  ) {
    this.cUrl = '';
    this.sub$ = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cUrl = event.url.substr(0, event.url.indexOf('?'));
      }
    });
  }


  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.action = params.get('action');
    });
  }

  getSources(call) {
    const action = this.route.snapshot.queryParamMap.get('action');
    const localStoreTgDetail = this.localStoreService.getLocal(
      'target-group',
      'detail'
    );
    const payload = {
      target_group_id: localStoreTgDetail.id
    };
    this.httpservice.postData(payload, requrls.schsource).subscribe(res => {
      const response = res;
      if (response.success) {
        if (response.data.length > 0) {
          $(this).addClass('active');
          console.log("1");
          console.log(this.cUrl);
          if (call === 1) {
            this.router.navigate(['/project/target-groups/exclusion'], { queryParams: { action: action } });
          } else if (call === 2) {
            this.router.navigate(['/project/target-groups/quota'], { queryParams: { action: action } });
          } else if (call === 3) {
            this.router.navigate(['/project/target-groups/security'], { queryParams: { action: action } });
          } else if (call === 4) {
            this.router.navigate(['/project/target-groups/survey'], { queryParams: { action: action } });
          } else if (call === 5) {
            this.router.navigate(['/project/target-groups/schedule'], { queryParams: { action: action } });
          } else if (call === 6) {
            this.router.navigate(['/project/target-groups/external'], { queryParams: { action: action } });
          }
        } else {
          this.toastr.error('Please select Source.!');
        }
      }
    });
  }

}
