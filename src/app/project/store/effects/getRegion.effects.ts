import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getRegionAction from '../actions/getRegionData.action'
import * as fromServices from '../service';

@Injectable()
export class getRegionsEffects {
    constructor(
        private actions$: Actions,
        private getRegions: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadGetRegions$ = this.actions$.ofType(getRegionAction.GETREGION)
        .pipe(
            switchMap((action: any) => {
                return this.getRegions
                    .getRegionData(action.payload)
                    .pipe(
                        map(data => new getRegionAction.getRegionSuccess(data)),
                        catchError(error => of(new getRegionAction.getRegionFailure(error)))
                    )
            })
        )
}