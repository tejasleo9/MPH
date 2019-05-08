import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getQutDetEffect from '../actions/getinterquota.actions'
import * as fromServices from '../service';

@Injectable()
export class getQutDetEffects {
    constructor(
        private actions$: Actions,
        private getQutDet: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetQutDet$ = this.actions$.ofType(getQutDetEffect.GETINTERQUOTA)
        .pipe(
            switchMap((action: any) => {
                return this.getQutDet
                    .getQuotasDetails(action.payload)
                    .pipe(
                        map(tgroups => new getQutDetEffect.getinterquotaSuccess(tgroups)),
                        catchError(error => of(new getQutDetEffect.getinterquotaFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getQutDetEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}