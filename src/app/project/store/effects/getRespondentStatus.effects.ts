import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getResStatusEffect from '../actions/getrespstatus.actions'
import * as fromServices from '../service';

@Injectable()
export class getResStatusEffects {
    constructor(
        private actions$: Actions,
        private getResStatus: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetResStatus$ = this.actions$.ofType(getResStatusEffect.GETRESPSTATUS)
        .pipe(
            switchMap((action: any) => {
                return this.getResStatus
                    .getRespondentStatus()

                    .pipe(
                        map(tgroups => new getResStatusEffect.getrespstatusSuccess(tgroups)),
                        catchError(error => of(new getResStatusEffect.getrespstatusFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getResStatusEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}