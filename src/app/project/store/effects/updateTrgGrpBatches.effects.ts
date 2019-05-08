import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as updateTgGrpBatchesEffect from '../actions/edittgsch.actions'
import * as fromServices from '../service';

@Injectable()
export class updateTgGrpBatchesEffects {
    constructor(
        private actions$: Actions,
        private updateTgGrpBatches: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadupdateTgGrpBatches$ = this.actions$.ofType(updateTgGrpBatchesEffect.EDITTGSCH)
        .pipe(
            // switchMap((action: any) => {
            //     return this.updateTgGrpBatches
            //         .getQuestion(action.payload.source_id,
            //             action.payload.category_id,
            //             action.payload.project_id,
            //             action.payload.target_group_id
            //         )

            //         .pipe(
            //             map(tgroups => new updateTgGrpBatchesEffect.edittgschSuccess(tgroups)),
            //             catchError(error => of(new updateTgGrpBatchesEffect.edittgschFailure(error)))
            //         )
            // })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(updateTgGrpBatchesEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}