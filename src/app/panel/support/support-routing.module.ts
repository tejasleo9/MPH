import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportComponent } from './support.component';
import { AdminSupportComponent } from './admin-support/admin-support.component';

const appRoutes: Routes = [
  { path: '', component: SupportComponent },
  { path: 'admin-support', component: AdminSupportComponent },
  //note found
];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
