import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { InfoReportComponent } from './info-report/info-report.component';
import { RespondReportComponent } from './respond-report/respond-report.component';
import { ReportRoutingModule } from './report.routing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportComponent } from './report.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectModule,
        HttpClientModule,
        ReportRoutingModule,
        CoreModule,
        FilterPipeModule,
        TooltipModule,
        BsDatepickerModule
    ],
    declarations: [
        ReportComponent,
        InfoReportComponent,
        RespondReportComponent,
    ],
    providers: []
})
export class ReportModule { }