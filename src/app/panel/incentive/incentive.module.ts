import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IncentiveRoutingModule } from './incentive.routing';
import { RedeemRequestComponent } from './manual-payout/redeem-request/redeem-request.component';
import { RedemptionProcessingComponent } from './manual-payout/redemption-processing/redemption-processing.component';
import { DispatchedComponent } from './manual-payout/dispatched/dispatched.component';
import { PayoutMethodComponent } from './payout-method/payout-method.component';
import { InstantRedemptionComponent } from './instant-redemption/instant-redemption.component';
import { CoreModule } from 'app/core/core.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { IncentiveComponent } from './incentive.component';
import { ManualPayoutComponent } from './manual-payout/manual-payout.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectModule,
        HttpClientModule,
        IncentiveRoutingModule,
        CoreModule,
        FilterPipeModule,
        OrderModule,
        NgxPaginationModule
    ],
    declarations: [
        ManualPayoutComponent,
        IncentiveComponent,
        RedeemRequestComponent,
        RedemptionProcessingComponent,
        DispatchedComponent,
        PayoutMethodComponent,
        InstantRedemptionComponent,
    ],
    providers: []
})
export class IncentiveModule { }