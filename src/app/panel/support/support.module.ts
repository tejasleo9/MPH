import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { SupportRoutingModule } from './support-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { reducers, effects } from './../store';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { RecruitmentModule } from './../recruitment/recruitment.module';
import { ReportModule } from './../report/report.module';
import { PanelManageModule } from './../panel-management/panelmanage.module';
import { CustomFormsModule } from 'ng2-validation';
import { SupportComponent } from './support.component';
import { AdminSupportComponent } from './admin-support/admin-support.component';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    CoreModule,
    SupportRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('panels', reducers),
    EffectsModule.forFeature(effects),
    RecruitmentModule,
    FilterPipeModule,
    OrderModule,
    ReportModule,
    PanelManageModule,
    NgxPaginationModule,
    CustomFormsModule,
    TooltipModule
  ],
  declarations: [
    SupportComponent,
    AdminSupportComponent
  ],
  providers: []
})
export class SupportModule { }
