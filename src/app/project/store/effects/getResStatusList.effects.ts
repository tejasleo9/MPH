import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getResStsListEffect from '../actions/getrespstatus.actions'
import * as fromServices from '../service';

@Injectable()
export class getResStsListEffects {
    constructor(
        private actions$: Actions,
        private getResStsList: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetResStsList$ = this.actions$.ofType(getResStsListEffect.GETRESPSTATUS)
        .pipe(
            switchMap((action: any) => {
                return this.getResStsList
                    .getResStatusList()

                    .pipe(
                        map(tgroups => new getResStsListEffect.getrespstatusSuccess(tgroups)),
                        catchError(error => of(new getResStsListEffect.getrespstatusFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getResStsListEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}