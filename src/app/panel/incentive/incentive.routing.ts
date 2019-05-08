import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedeemRequestComponent } from './manual-payout/redeem-request/redeem-request.component';
import { RedemptionProcessingComponent } from './manual-payout/redemption-processing/redemption-processing.component';
import { DispatchedComponent } from './manual-payout/dispatched/dispatched.component';
import { PayoutMethodComponent } from './payout-method/payout-method.component';
import { InstantRedemptionComponent } from './instant-redemption/instant-redemption.component';

const authRoutes: Routes = [
  {
    path: 'redeem-request',
    component: RedeemRequestComponent
  },
  {
    path: 'redemption-processing',
    component: RedemptionProcessingComponent
  },
  {
    path: 'dispatched',
    component: DispatchedComponent
  },
  {
    path: 'payout-method',
    component: PayoutMethodComponent
  },
  {
    path: 'instant-redemption',
    component: InstantRedemptionComponent
  }
  // ,
  // {
  //   path: 'endpage',
  //   component: InstantRedemptionComponent
  // },
  // {
  //   path: 'endpage',
  //   component: InstantRedemptionComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class IncentiveRoutingModule { }
