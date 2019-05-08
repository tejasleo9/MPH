import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SettingsRoutingModule } from './settings.routing';

import { SettingOverviewComponent } from './setting-overview/setting-overview.component';
import { CommunicationTemplatesComponent } from './communication-templates/communication-templates.component';
import { IncentiveModelComponent } from './incentive-model/incentive-model.component';
import { EndPagesComponent } from './end-pages/end-pages.component';
import { CommTempEditComponent } from './communication-templates/comm-temp-edit/comm-temp-edit.component';
import { CoreModule } from 'app/core/core.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { SettingsComponent } from './settings.component';
import { AceEditorModule } from 'ng2-ace-editor';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CoreModule,
        SelectModule,
        HttpClientModule,
        FilterPipeModule,
        SettingsRoutingModule,
        ReactiveFormsModule,
        ClipboardModule,
        AceEditorModule
    ],
    declarations: [
        SettingsComponent,
        SettingOverviewComponent,
        CommunicationTemplatesComponent,
        IncentiveModelComponent,
        EndPagesComponent,
        CommTempEditComponent,
    ],
    providers: []
})
export class SettingsModule { }