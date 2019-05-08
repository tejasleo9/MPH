import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecruitmentComponent } from './recruitment.component';
import { TrackingComponent } from './tracking/tracking.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AddNewCompaignComponent } from './campaign/add-new-compaign/add-new-compaign.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { AddNewAffiliateComponent } from './affiliate/add-new-affiliate/add-new-affiliate.component';
import { AffiliateTrackingComponent } from './affiliate/affiliate-tracking/affiliate-tracking.component';
import { CompaignTrackingComponent } from './campaign/compaign-tracking/compaign-tracking.component';
import { RecruitmentRoutingModule } from './recruitment.routing';
import { CoreModule } from 'app/core/core.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { CustomFormsModule } from 'ng2-validation';
import { OrderModule } from 'ngx-order-pipe';
// import { AppNoDblClickDirective } from 'app/shared/app-no-dbl-click.directive';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectModule,
        HttpClientModule,
        CoreModule,
        RecruitmentRoutingModule,
        FilterPipeModule,
        CustomFormsModule,
        OrderModule
    ],
    declarations: [
        RecruitmentComponent,
        TrackingComponent,
        CampaignComponent,
        AddNewCompaignComponent,
        AffiliateComponent,
        AddNewAffiliateComponent,
        AffiliateTrackingComponent,
        CompaignTrackingComponent,
        // AppNoDblClickDirective
    ],
    providers: [],
    exports: [
      FilterPipeModule,
      // AppNoDblClickDirective
    ]
})
export class RecruitmentModule { }
