import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { BonusPointComponent } from './bonus-point/bonus-point.component';
import { PromotionalActivitiesComponent } from './promotional-activities/promotional-activities.component';
import { TemplatesComponent } from './templates/templates.component';
import { AddTemplatesComponent } from './templates/add-templates/add-templates.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { EngagementRoutingModule } from './engagement.routing';
import { AddActivityComponent } from './promotional-activities/add-activity/add-activity.component';
import { OrderModule } from 'ngx-order-pipe';
import { EngagementComponent } from './engagement.component';
import { AceEditorModule } from 'ng2-ace-editor';
// import { QuillModule } from 'ngx-quill'

// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CoreModule,
        SelectModule,
        HttpClientModule,
        EngagementRoutingModule,
        FilterPipeModule,
        OrderModule,
        AceEditorModule,
        // FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
        // QuillModule
    ],
    declarations: [
        EngagementComponent,
        BonusPointComponent,
        PromotionalActivitiesComponent,
        TemplatesComponent,
        AddTemplatesComponent,
        AddActivityComponent,
    ],
    providers: []
})
export class EngagementModule { }