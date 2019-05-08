import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getPrjCostDetailsEffect from '../actions/getprocost.actions'
import * as fromServices from '../service';

@Injectable()
export class getPrjCostDetailsEffects {
    constructor(
        private actions$: Actions,
        private getPrjCostDetails: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetPrjCostDetails$ = this.actions$.ofType(getPrjCostDetailsEffect.GETPROCOST)
        .pipe(
            switchMap((action: any) => {
                return this.getPrjCostDetails
                    .getProjctCostDetails(action.payload.project_id,
                    )

                    .pipe(
                        map(tgroups => new getPrjCostDetailsEffect.getprojectcostSuccess(tgroups)),
                        catchError(error => of(new getPrjCostDetailsEffect.getprojectcostFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getPrjCostDetailsEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}