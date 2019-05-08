import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruitmentComponent } from './recruitment.component';
import { TrackingComponent } from './tracking/tracking.component';
import { CampaignComponent } from './campaign/campaign.component';
import { AddNewCompaignComponent } from './campaign/add-new-compaign/add-new-compaign.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { AddNewAffiliateComponent } from './affiliate/add-new-affiliate/add-new-affiliate.component';
import { AffiliateTrackingComponent } from './affiliate/affiliate-tracking/affiliate-tracking.component';
import { CompaignTrackingComponent } from './campaign/compaign-tracking/compaign-tracking.component';


const authRoutes: Routes = [
    { path: '', component: RecruitmentComponent },
    { path: 'tracking', component: TrackingComponent },
    { path: 'compaingn', component: CampaignComponent },
    { path: 'compaingn/add-edit', component: AddNewCompaignComponent },
    { path: 'compaingn/tracking', component: CompaignTrackingComponent },
    { path: 'affiliate', component: AffiliateComponent },
    { path: 'affiliate/add-edit', component: AddNewAffiliateComponent },
    { path: 'affiliate/tracking', component: AffiliateTrackingComponent },
  ];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
