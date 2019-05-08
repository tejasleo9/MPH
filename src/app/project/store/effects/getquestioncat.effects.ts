import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getQtCatEffect from '../actions/getqcat.actions'
import * as fromServices from '../service';

@Injectable()
export class getQtCatEffects {
    constructor(
        private actions$: Actions,
        private getQtCat: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetQtCat$ = this.actions$.ofType(getQtCatEffect.GETQCAT)
        .pipe(
            switchMap((action: any) => {
                return this.getQtCat
                    .getQuestionCat(action.payload)
                    .pipe(
                        map(tgroups => new getQtCatEffect.getqcatSuccess(tgroups)),
                        catchError(error => of(new getQtCatEffect.getqcatFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getQtCatEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}