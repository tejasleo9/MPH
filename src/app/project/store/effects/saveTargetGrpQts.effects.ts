import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as saveTargetGrpQtsEffect from '../actions/savetgque.actions'
import * as fromServices from '../service';

@Injectable()
export class saveTargetGrpQtsEffects {
    constructor(
        private actions$: Actions,
        private saveTargetGrpQts: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadsaveTargetGrpQts$ = this.actions$.ofType(saveTargetGrpQtsEffect.SAVETGQUE)
        .pipe(
            switchMap((action: any) => {
                return this.saveTargetGrpQts
                    .saveOrUpdateTrgWithVariables(action.payload)
                    .pipe(
                        map(tgroups => new saveTargetGrpQtsEffect.savetgqueSuccess(tgroups)),
                        catchError(error => of(new saveTargetGrpQtsEffect.savetgqueFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(saveTargetGrpQtsEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}