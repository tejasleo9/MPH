import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getTrgGrpQuotasStatsEffect from '../actions/gettgstats.actions'
import * as fromServices from '../service';

@Injectable()
export class getTrgGrpQuotasStatsEffects {
    constructor(
        private actions$: Actions,
        private getTrgGrpQuotasStats: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetTrgGrpQuotasStats$ = this.actions$.ofType(getTrgGrpQuotasStatsEffect.GETTGSTATS)
        .pipe(
            switchMap((action: any) => {
                return this.getTrgGrpQuotasStats
                    .getTargetGrpQuotasStats(action.payload.project_id,
                    )

                    .pipe(
                        map(tgroups => new getTrgGrpQuotasStatsEffect.gettgquotastatsSuccess(tgroups)),
                        catchError(error => of(new getTrgGrpQuotasStatsEffect.gettgquotastatsFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getTrgGrpQuotasStatsEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}