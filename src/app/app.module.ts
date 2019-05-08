import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SelectModule } from 'ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProjectModule } from './project/project.module';
import { PanelModule } from './panel/panel.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AuthEffects } from './auth/store/auth.effects';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates : true
    }), // ToastrModule added
    TooltipModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule,
    SelectModule,
    Ng5SliderModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule,
    BsDatepickerModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
