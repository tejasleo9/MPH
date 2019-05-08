import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getPrjStatesEffect from '../actions/getprostats.actions'
import * as fromServices from '../service';

@Injectable()
export class getPrjStatesEffects {
    constructor(
        private actions$: Actions,
        private getPrjStates: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetPrjStates$ = this.actions$.ofType(getPrjStatesEffect.GETPROSTATS)
        .pipe(
            switchMap((action: any) => {
                return this.getPrjStates
                    .getProjectStates(action.payload.project_id)

                    .pipe(
                        map(tgroups => new getPrjStatesEffect.getprojectstatsSuccess(tgroups)),
                        catchError(error => of(new getPrjStatesEffect.getprojectstatsFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getPrjStatesEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}