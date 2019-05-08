import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as tgroupActions from '../actions/createtgrp.actions'
import * as fromServices from '../service';

@Injectable()
export class CreateTgrpEffects {
    constructor(
        private actions$: Actions,
        private tgroupService: fromServices.ProService,
        private router: Router
    ) { }

    // Create Target Group 
    @Effect()
    CreateTgroups$ = this.actions$.ofType(tgroupActions.CREATE)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .createTgroup(action.payload)
                    .pipe(
                        map(tgroups => new tgroupActions.createGroupSuccess(tgroups)),
                        catchError(error => of(new tgroupActions.createGroupFailure(error)))
                    )
            })
        )
}