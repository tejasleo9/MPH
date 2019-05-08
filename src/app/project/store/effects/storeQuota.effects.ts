import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as strQutEffect from '../actions/updatetgquota.actions'
import * as fromServices from '../service';

@Injectable()
export class strQutEffects {
    constructor(
        private actions$: Actions,
        private strQut: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadstrQut$ = this.actions$.ofType(strQutEffect.UPDATETGQUOTA)
        .pipe(
            switchMap((action: any) => {
                return this.strQut
                    .storeQuota(action.payload.target_group_id,
                        action.payload.quota,
                    )

                    .pipe(
                        map(tgroups => new strQutEffect.updatetgquotaSuccess(tgroups)),
                        catchError(error => of(new strQutEffect.updatetgquotaFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(strQutEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}