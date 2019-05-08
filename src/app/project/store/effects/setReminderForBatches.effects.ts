import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as setRemForBatchesEffect from '../actions/setremind.actions'
import * as fromServices from '../service';

@Injectable()
export class setRemForBatchesEffects {
    constructor(
        private actions$: Actions,
        private setRemForBatches: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadsetRemForBatches$ = this.actions$.ofType(setRemForBatchesEffect.SETREMIND)
        .pipe(
            switchMap((action: any) => {
                return this.setRemForBatches
                    .setReminderForBatches(action.payload.target_group_batch_scheduler_id,
                        action.payload.taget_group_id,
                        action.payload.scheduled_at,
                        action.payload.is_now,
                        action.payload.no_of_schedule
                    )

                    .pipe(
                        map(tgroups => new setRemForBatchesEffect.setremindSuccess(tgroups)),
                        catchError(error => of(new setRemForBatchesEffect.setremindFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(setRemForBatchesEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}