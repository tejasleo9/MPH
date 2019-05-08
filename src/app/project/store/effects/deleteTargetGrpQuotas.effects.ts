import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as delTrgGrpQuotasEffect from '../actions/deltgquota.actions'
import * as fromServices from '../service';

@Injectable()
export class delTrgGrpQuotasEffects {
    constructor(
        private actions$: Actions,
        private delTrgGrpQuotas: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loaddelTrgGrpQuotas$ = this.actions$.ofType(delTrgGrpQuotasEffect.DELTGQUOTA)
        .pipe(
            switchMap((action: any) => {
                return this.delTrgGrpQuotas
                    .deleteTargetGrpQuotas(action.payload.target_group_id,
                    )

                    .pipe(
                        map(tgroups => new delTrgGrpQuotasEffect.deltgquotaSuccess(tgroups)),
                        catchError(error => of(new delTrgGrpQuotasEffect.deltgquotaFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(delTrgGrpQuotasEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}