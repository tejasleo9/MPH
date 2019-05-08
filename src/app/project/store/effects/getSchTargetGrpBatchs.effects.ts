import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getSchTgGrpBatchsEffect from '../actions/schbyquota.actions'
import * as fromServices from '../service';

@Injectable()
export class getSchTgGrpBatchsEffects {
    constructor(
        private actions$: Actions,
        private getSchTgGrpBatchs: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetSchTgGrpBatchs$ = this.actions$.ofType(getSchTgGrpBatchsEffect.SCHBYQUOTA)
        .pipe(
            switchMap((action: any) => {
                return this.getSchTgGrpBatchs
                    .getSchTargetGrpBatchs(action.payload)
                    .pipe(
                        map(tgroups => new getSchTgGrpBatchsEffect.schbyquotaSuccess(tgroups)),
                        catchError(error => of(new getSchTgGrpBatchsEffect.schbyquotaFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getSchTgGrpBatchsEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}