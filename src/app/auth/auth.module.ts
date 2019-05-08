import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AuthService } from './store/auth.service';
import { AuthEffects } from './store/auth.effects';
import { reducers } from './store/states';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule,
    CommonModule,
    BrowserModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
