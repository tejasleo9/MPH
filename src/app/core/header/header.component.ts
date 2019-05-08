import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../project/store';
import * as panelStore from '../../panel/store';
import { LoadProjects } from '../../project/store/actions/project.actions';
import { getPanels } from '../../panel/store/actions/getpanel.actions';
import { ShareDataService } from '../../shared/share-data.service';
import { LocalstoreService } from '../../shared/localstore.service';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from '../../auth/store/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  projects: any = [''];
  panels: any = [''];
  action;
  modname = "Project";

  constructor(private router: Router,
    private store: Store<fromStore.ProjectsState>,
    private panelstore: Store<panelStore.PanelsState>,
    private _shareData: ShareDataService,
    private route: ActivatedRoute,
    private localStoreService: LocalstoreService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.store.select(fromStore.getAllProjects).subscribe(state => {
      this.projects = state['data'];
    });
    this.getProjects();
    this.getAllPanels();
    this.action = 'edit';
    this.modname = this.router.url.split('/')[1];
  }

  editProject(id, name) {
    let obj = {
      'id': id,
      'name': name
    }
    this.localStoreService.removeLocal('project');
    this.localStoreService.removeLocal('target-group');
    this.localStoreService.setLocal('project', 'detail', obj)
    this._shareData.filter('Register click');
    this.router.navigate(['project/overview'], { queryParams: { action: this.action } });
  }

  editPanel(id,name){
    let obj = {
      'id': id,
      'name': name
    }
    this.localStoreService.removeLocal('panel');
    this.localStoreService.setLocal('panel', 'detail', obj)
    this.router.navigate(['panel/dashboard']);
  }

  allPanels() {
    this.router.navigate(['panel']);
  }

  allProjects(){
    this.router.navigate(['project']);
  }

  getProjects() {
    const payload = { "select_fields": "id,name,start_date,completes_required,company_id,status,completion_rate" }
    this.store.select(fromStore.getProjectsLoaded).subscribe(state => {
      if (state) {
        this.store.select(fromStore.getAllProjects).subscribe(state => {
          // console.log(state);
          if(state['status_code'] == 200){
            this.projects = state['data']['data'];
          }else if(state['status_code'] == 400){
            this.authService.logout();
          }
        });
      } else {
        this.store.dispatch(new LoadProjects(payload));
      }
    });
  }

  getAllPanels() {
    // this.panelservice.getPanels().subscribe(res => {
    //   console.log(res);
    //   this.panels = res.data;
    // })
    this.panelstore.select(panelStore.getAllPanelsLoaded).subscribe(state => {
      if (state) {
        this.panelstore.select(panelStore.getAllPanels).subscribe(state => {
          this.panels = state;
          // console.log(this.panels);
        });
      } else {
        this.panelstore.dispatch(new getPanels());
      }
    });
  }

  logout(){
    this.authService.logout();
  }

}
