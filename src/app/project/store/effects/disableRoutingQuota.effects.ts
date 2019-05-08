import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as disRoutingQuotaEffect from '../actions/disroute.actions'
import * as fromServices from '../service';

@Injectable()
export class disRoutingQuotaEffects {
    constructor(
        private actions$: Actions,
        private disRoutingQuota: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loaddisRoutingQuota$ = this.actions$.ofType(disRoutingQuotaEffect.DISROUTE)
        .pipe(
            switchMap((action: any) => {
                return this.disRoutingQuota
                    .disableRoutingQuota(action.payload.target_group_id,
                        action.payload.quotas,
                    )

                    .pipe(
                        map(tgroups => new disRoutingQuotaEffect.disablerouteSuccess(tgroups)),
                        catchError(error => of(new disRoutingQuotaEffect.disablerouteFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(disRoutingQuotaEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}