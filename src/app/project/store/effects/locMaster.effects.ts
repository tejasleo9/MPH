import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as tgroupActions from '../actions/locatMaster.actions'
import * as fromServices from '../service';

@Injectable()
export class locMastEffects {
    constructor(
        private actions$: Actions,
        private tgroupService: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadlocMast$ = this.actions$.ofType(tgroupActions.LOCMAST)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .locatMaster(action.payload)
                    .pipe(
                        map(tgroups => new tgroupActions.locatMasterSuccess(tgroups)),
                        catchError(error => of(new tgroupActions.locatMasterFailure(error)))
                    )
            })
        )
}