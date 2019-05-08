import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingOverviewComponent } from './setting-overview/setting-overview.component';
import { CommunicationTemplatesComponent } from './communication-templates/communication-templates.component';
import { IncentiveModelComponent } from './incentive-model/incentive-model.component';
import { EndPagesComponent } from './end-pages/end-pages.component';
import { CommTempEditComponent } from './communication-templates/comm-temp-edit/comm-temp-edit.component';


const authRoutes: Routes = [
  {
    path: '',
    component: SettingOverviewComponent
  },
  {
    path: 'communication-template',
    component: CommunicationTemplatesComponent
  },
  {
    path: 'communication-template/edit',
    component: CommTempEditComponent
  },
  {
    path: 'incentive-model',
    component: IncentiveModelComponent
  },
  {
    path: 'endpage',
    component: EndPagesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
