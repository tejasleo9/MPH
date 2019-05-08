import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    CoreModule,

  ],
  declarations: [LandingComponent]
})
export class DashboardModule { }
