import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getfeasibilty from '../actions/getFeasibility.action'
import * as fromServices from '../service';

@Injectable()
export class locMastEffects {
    constructor(
        private actions$: Actions,
        private tgroupService: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadlocMast$ = this.actions$.ofType(getfeasibilty.FEASIBILITY)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .locatMaster(action.payload.country_id)
                    .pipe(
                        map(feasibilty => new getfeasibilty.feasibilitySuccess(feasibilty)),
                        catchError(error => of(new getfeasibilty.feasibilityFailure(error)))
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