import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelistsComponent } from './panelists/panelists.component';
import { PanelistsProfilerComponent } from './panelists-profiler/panelists-profiler.component';
import { ImportPanelistComponent } from './panelists/import-panelist/import-panelist.component';
import { ImportsComponent } from './panelists/imports/imports.component';
import { OverviewComponent } from './panelists/panelist-detail/overview/overview.component';
import { PointHistoryComponent } from './panelists/panelist-detail/point-history/point-history.component';
import { ProfileCompletionComponent } from './panelists/panelist-detail/profile-completion/profile-completion.component';
import { ProjectHistoryComponent } from './panelists/panelist-detail/project-history/project-history.component';
import { RedemptionHistoryComponent } from './panelists/panelist-detail/redemption-history/redemption-history.component';
import { ReferralHistoryComponent } from './panelists/panelist-detail/referral-history/referral-history.component';
import { AddQuestionsComponent } from './panelists-profiler/add-questions/add-questions.component';

const authRoutes: Routes = [
  {
    path: 'panelists',
    component: PanelistsComponent
  },
  {
    path: 'panelist-profiler',
    component: PanelistsProfilerComponent
  },
  {
    path: 'panelists/import-panelist',
    component: ImportPanelistComponent
  },
  {
    path: 'panelists/check-import',
    component: ImportsComponent
  },
  {
    path: 'panelists/overview',
    component: OverviewComponent
  },
  {
    path: 'panelists/point-history',
    component: PointHistoryComponent
  },
  {
    path: 'panelists/profile-completion',
    component: ProfileCompletionComponent
  },
  {
    path: 'panelists/project-history',
    component: ProjectHistoryComponent
  },
  {
    path: 'panelists/redemption-history',
    component: RedemptionHistoryComponent
  },
  {
    path: 'panelists/referral-history',
    component: ReferralHistoryComponent
  },
  {
    path: 'panelist-profiler/add-questions',
    component: AddQuestionsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class PanelManageRoutingModule { }