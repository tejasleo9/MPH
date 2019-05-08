import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getQutFeasibilityEffect from '../actions/getinexsrc.actions'
import * as fromServices from '../service';

@Injectable()
export class getQutFeasibilityEffects {
    constructor(
        private actions$: Actions,
        private getQutFeasibility: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetQutFeasibility$ = this.actions$.ofType(getQutFeasibilityEffect.GETINEXSRC)
        .pipe(
            switchMap((action: any) => {
                return this.getQutFeasibility
                    .getQuotaFeasibility(action.payload
                    )

                    .pipe(
                        map(tgroups => new getQutFeasibilityEffect.getinexsrcSuccess(tgroups)),
                        catchError(error => of(new getQutFeasibilityEffect.getinexsrcFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getQutFeasibilityEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}