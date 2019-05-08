import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../store/states';
import { LogIn } from '../store/auth.actions';
import { AuthEffects } from '../store/auth.effects';
import { CommonService } from '../../shared/common.service';
import { Observable } from 'rxjs';
import { LoadProjects } from '@Project/store';
import { getPanels } from '@Panel/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  getState: Observable<any>;
  ifError: boolean = false;
  ifSucc: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private store: Store<AppState>,
    private cs: CommonService
  ) {
    this.getState = this.store.select(selectAuthState);
    // console.log(this.getState);
  }

  ngOnInit() {

  }

  onSubmit(formval, txtid, imgid): void {
    const payload = {
      email: formval.value.email,
      password: formval.value.password
    };
    // console.log(payload);
    this.store.dispatch(new LogIn(payload));
    this.cs.hideshowImge(txtid, imgid, 'a');
    this.getState.subscribe((state) => {
      if (state.isAuthenticated) {
        this.store.dispatch(new LoadProjects(payload));
        this.store.dispatch(new getPanels());
      } else {
        // console.log(state);
        if (state.errorMessage != null) {
          this.ifError = true;
          this.cs.hideshowImge(txtid, imgid, 'i');
          this.errorMessage = state.errorMessage;          
          setTimeout(() => { this.ifSucc = false; this.ifError = false; state.errorMessage = null}, 5000);
        }
      }
    });
  }

}
