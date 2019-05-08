import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getfeasibilty from '../actions/nonlocksrc.actions'
import * as fromServices from '../service';

@Injectable()
export class getnonlockfeaEffects {
    constructor(
        private actions$: Actions,
        private tgroupService: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadlocMast$ = this.actions$.ofType(getfeasibilty.NONLOCKSRC)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .getNonLockFeasibility(action.payload.target_group_id,action.payload.source_id,action.payload.quota)
                    .pipe(
                        map(feasibilty => new getfeasibilty.nonlocksrcSuccess(feasibilty)),
                        catchError(error => of(new getfeasibilty.nonlocksrcFailure(error)))
                    )
            })
        )

}