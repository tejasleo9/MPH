import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonusPointComponent } from './bonus-point/bonus-point.component';
import { PromotionalActivitiesComponent } from './promotional-activities/promotional-activities.component';
import { TemplatesComponent } from './templates/templates.component';
import { AddTemplatesComponent } from './templates/add-templates/add-templates.component';
import { AddActivityComponent } from './promotional-activities/add-activity/add-activity.component';


const authRoutes: Routes = [
  {
    path: 'bonus-points',
    component: BonusPointComponent
  },
  {
    path: 'promotional-activity',
    component: PromotionalActivitiesComponent
  },
  {
    path: 'promotional-activity/add-edit',
    component: AddActivityComponent
  },
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: '',
    component: TemplatesComponent
  },
  {
    path: 'templates/add-template',
    component: AddTemplatesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class EngagementRoutingModule { }
