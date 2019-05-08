import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as tgroupActions from '../actions/locatValue.actions'
import * as fromServices from '../service';

@Injectable()
export class locValEffects {
    constructor(
        private actions$: Actions,
        private tgroupService: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadlocVal$ = this.actions$.ofType(tgroupActions.LOCVAL)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .locatValue(action.payload)
                    .pipe(
                        map(tgroups => new tgroupActions.locatValueSuccess(tgroups)),
                        catchError(error => of(new tgroupActions.locatValueFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(tgroupActions.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}