import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as setRoutngEffect from '../actions/eneroute.actions'
import * as fromServices from '../service';

@Injectable()
export class setRoutngEffects {
    constructor(
        private actions$: Actions,
        private setRoutng: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadsetRoutng$ = this.actions$.ofType(setRoutngEffect.ENEROUTE)
        .pipe(
            switchMap((action: any) => {
                return this.setRoutng
                    .setRouting(action.payload)
                    .pipe(
                        map(tgroups => new setRoutngEffect.enablerouteSuccess(tgroups)),
                        catchError(error => of(new setRoutngEffect.enablerouteFailure(error)))
                    )
            })
        )
}