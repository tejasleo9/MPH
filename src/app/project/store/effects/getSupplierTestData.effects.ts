import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getSupTestDataEffect from '../actions/getsuptest.actions'
import * as fromServices from '../service';

@Injectable()
export class getSupTestDataEffects {
    constructor(
        private actions$: Actions,
        private getSupTestData: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetSupTestData$ = this.actions$.ofType(getSupTestDataEffect.GETSUPTEST)
        .pipe(
            switchMap((action: any) => {
                return this.getSupTestData
                    .getSupplierTestData(action.payload.id,
                    )

                    .pipe(
                        map(tgroups => new getSupTestDataEffect.getsupplytestSuccess(tgroups)),
                        catchError(error => of(new getSupTestDataEffect.getsupplytestFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getSupTestDataEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}