import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PDashboardComponent } from './dashboard/dashboard.component';
import { ExclusionListComponent } from './exclusion-list/exclusion-list.component';
import { ProjectComponent } from './project.component';
import { CreateComponent } from './create/create.component';
import { TargetGroupsComponent } from './target-groups/target-groups.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { OverviewComponent } from './target-groups/overview/overview.component';
import { RegionComponent } from './target-groups/region/region.component';
import { ProfileComponent } from './target-groups/profile/profile.component';
import { ExclusionComponent } from './target-groups/exclusion/exclusion.component';
import { QuotaComponent } from './target-groups/quota/quota.component';
import { SecureSetComponent } from './target-groups/secure-set/secure-set.component';
import { SurveyComponent } from './target-groups/survey/survey.component';
import { ScheduleComponent } from './target-groups/schedule/schedule.component';
import { ExtsupplyComponent } from './target-groups/extsupply/extsupply.component';
import { SummaryComponent } from './summary/summary.component';
import { AuthGuard } from 'app/authGurad/auth.guard';


const projectRoutes: Routes = [
	{ path: '', component: ProjectComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard', component: PDashboardComponent, canActivate: [AuthGuard] },
	{ path: 'exclusion', component: ExclusionListComponent, canActivate: [AuthGuard] },
	{ path: 'overview', component: CreateComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups', component: TargetGroupsComponent, canActivate: [AuthGuard] },
	{ path: 'scheduling', component: SchedulingComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/overview', component: OverviewComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/region', component: RegionComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/profile', component: ProfileComponent, canActivate: [AuthGuard]},
	{ path: 'target-groups/exclusion', component: ExclusionComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/quota', component: QuotaComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/security', component: SecureSetComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/survey', component: SurveyComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
	{ path: 'target-groups/external', component: ExtsupplyComponent, canActivate: [AuthGuard] },
	{ path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(projectRoutes)],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
