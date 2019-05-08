import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
// import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { ProService } from '../project/store/service';
// import { PanelService } from '../panel/store/service';
import * as prostore from '../project/store';
import { reducers, effects } from '../panel/store';
import { AuthService } from '../auth/store/auth.service';
import { SubHeaderComponent } from '@Panel/sub-header/sub-header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SubHeaderComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('panels', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    StoreModule.forFeature('projects', prostore.reducers),
    EffectsModule.forFeature(prostore.effects),
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SubHeaderComponent
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    // PanelService,
    ProService,
    AuthService
  ]
})
export class CoreModule {}
