import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { UsersComponent } from './users/users.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReportComponent } from './report/report.component';


const authRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }