import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from '@Panel/panel.component';
import { DashboardComponent } from '@Panel/dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { CopyQuestionsComponent } from './copy-questions/copy-questions.component';

const appRoutes: Routes = [
  { path: '', component: PanelComponent },
  { path: 'add-edit', component: CreateComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'questions', component: CopyQuestionsComponent },
  {
    path: 'recruitment',
    loadChildren: './recruitment/recruitment.module#RecruitmentModule'
  }, {
    path: 'engagement',
    loadChildren: './engagement/engagement.module#EngagementModule'
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  }, {
    path: 'incentive',
    loadChildren: './incentive/incentive.module#IncentiveModule'
  }, {
    path: 'report',
    loadChildren: './report/report.module#ReportModule'
  }, {
    path: 'panel-management',
    loadChildren: './panel-management/panelmanage.module#PanelManageModule'
  }, {
    path: 'support',
    loadChildren: './support/support.module#SupportModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
