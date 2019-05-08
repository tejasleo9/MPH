import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users/users.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReportComponent } from './report/report.component';
import { AccountingRoutingModule } from './accounts.routing';
import { CoreModule } from 'app/core/core.module';
import {AccountsSubHeaderComponent} from './sub-header/sub-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SelectModule,
    AccountingRoutingModule,
    FilterPipeModule,
    NgxPaginationModule
    
  ],
  declarations: [UsersComponent, InvoiceComponent, ReportComponent,AccountsSubHeaderComponent],
  providers: []
})
export class AccountsModule { }
