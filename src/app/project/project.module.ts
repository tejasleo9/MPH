import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { NgDragDropModule } from 'ng-drag-drop';

import { ProjectRoutingModule } from './project-routing.module';
import { PDashboardComponent } from './dashboard/dashboard.component';
import { ExclusionListComponent } from './exclusion-list/exclusion-list.component';
import { ProjectComponent } from './project.component';
import { CoreModule } from '../core/core.module';
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
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';

import { ProService } from './store/service';
// import { ProEffects } from './store/effects';
import { reducers, effects } from './store';
import { LeftMenuComponent } from './target-groups/left-menu/left-menu.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FilterArrayPipe } from './pipes/filter-array.pipe';
import { MinValidatorDirective } from 'app/directive/min-validator.directive';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    CoreModule,
    SelectModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    FilterPipeModule,
    OrderModule,
    Ng5SliderModule,
    StoreModule.forFeature('projects', reducers),
    EffectsModule.forFeature(effects),
    NgDragDropModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PDashboardComponent,
    ExclusionListComponent,
    ProjectComponent,
    CreateComponent,
    TargetGroupsComponent,
    SchedulingComponent,
    OverviewComponent,
    RegionComponent,
    ProfileComponent,
    ExclusionComponent,
    QuotaComponent,
    SecureSetComponent,
    SurveyComponent,
    ScheduleComponent,
    ExtsupplyComponent,
    LeftMenuComponent,
    SummaryComponent,
    FilterArrayPipe,
    MinValidatorDirective
  ],
  exports: [],
  providers: [ProService]
})
export class ProjectModule { }
