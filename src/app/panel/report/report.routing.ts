import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoReportComponent } from './info-report/info-report.component';
import { RespondReportComponent } from './respond-report/respond-report.component';

const authRoutes: Routes = [
  {
    path: 'information',
    component: InfoReportComponent
  },
  {
    path: 'respondant',
    component: RespondReportComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
