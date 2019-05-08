import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { CopyQuestionsComponent } from './copy-questions/copy-questions.component';
import { reducers, effects } from './store';
import { PipePipe } from './utility/pipe.pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { ReportModule } from './report/report.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PanelManageModule } from './panel-management/panelmanage.module';
import { AppNoDblClickDirective } from 'app/shared/app-no-dbl-click.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    CoreModule,
    PanelRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('panels', reducers),
    EffectsModule.forFeature(effects),
    RecruitmentModule,
    FilterPipeModule,
    OrderModule,
    ReportModule,
    TooltipModule,
    PanelManageModule,
    NgxPaginationModule
  ],
  declarations: [
    PanelComponent,
    DashboardComponent,
    CreateComponent,
    CopyQuestionsComponent,
    PipePipe,
    AppNoDblClickDirective
  ],
  providers: [],
  exports: [
    AppNoDblClickDirective
  ]
})
export class PanelModule { }
