import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getPrjCompleteStatsEffect from '../actions/getcomstats.actions'
import * as fromServices from '../service';

@Injectable()
export class getPrjCompleteStatsEffects {
    constructor(
        private actions$: Actions,
        private getPrjCompleteStats: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetPrjCompleteStats$ = this.actions$.ofType(getPrjCompleteStatsEffect.GETPROCOMSTATS)
        .pipe(
            switchMap((action: any) => {
                return this.getPrjCompleteStats
                    .getProjectCompleteStats(action.payload.project_id,
                    )

                    .pipe(
                        map(tgroups => new getPrjCompleteStatsEffect.getprocomstatsSuccess(tgroups)),
                        catchError(error => of(new getPrjCompleteStatsEffect.getprocomstatsFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getPrjCompleteStatsEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}