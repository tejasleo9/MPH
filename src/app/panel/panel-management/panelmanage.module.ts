import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { PanelManageRoutingModule } from './panelmanage.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
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
import { PanelManagementComponent } from './panel-management.component';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectModule,
        HttpClientModule,
        PanelManageRoutingModule,
        CoreModule,
        OrderModule,
        FilterPipeModule,
        TooltipModule,
        BsDatepickerModule,
        NgxPaginationModule,
        CustomFormsModule
    ],
    declarations: [
        PanelManagementComponent,
        PanelistsComponent,
        PanelistsProfilerComponent,
        ImportPanelistComponent,
        ImportsComponent,
        OverviewComponent,
        PointHistoryComponent,
        ProfileCompletionComponent,
        ProjectHistoryComponent,
        RedemptionHistoryComponent,
        ReferralHistoryComponent,
        AddQuestionsComponent,
        // CustomFormsModule
    ],
    providers: [],
})
export class PanelManageModule { }
