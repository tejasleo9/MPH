import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as updTrgGrpQutEffect from '../actions/updatetgquota.actions'
import * as fromServices from '../service';

@Injectable()
export class updTrgGrpQutEffects {
    constructor(
        private actions$: Actions,
        private updTrgGrpQut: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadupdTrgGrpQut$ = this.actions$.ofType(updTrgGrpQutEffect.UPDATETGQUOTA)
        .pipe(
            switchMap((action: any) => {
                return this.updTrgGrpQut
                    .updateTargetGrpQuota(action.payload.target_group_id,
                        action.payload.quota,
                        action.payload.is_update_quota,
                    )

                    .pipe(
                        map(tgroups => new updTrgGrpQutEffect.updatetgquotaSuccess(tgroups)),
                        catchError(error => of(new updTrgGrpQutEffect.updatetgquotaFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(updTrgGrpQutEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}