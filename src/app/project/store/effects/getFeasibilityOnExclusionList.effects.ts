import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getFeasOnExclListEffect from '../actions/getsrcex.actions'
import * as fromServices from '../service';

@Injectable()
export class getFeasOnExclListEffects {
    constructor(
        private actions$: Actions,
        private getFeasOnExclList: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetFeasOnExclList$ = this.actions$.ofType(getFeasOnExclListEffect.GETSRCEX)
        .pipe(
            switchMap((action: any) => {
                return this.getFeasOnExclList
                    .getFeasibilityOnExclusionList(action.payload.target_group_id,
                        action.payload.exclusion_list,
                    )

                    .pipe(
                        map(tgroups => new getFeasOnExclListEffect.getsrcexSuccess(tgroups)),
                        catchError(error => of(new getFeasOnExclListEffect.getsrcexFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getFeasOnExclListEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}