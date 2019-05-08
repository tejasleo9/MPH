import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getPrjReportEffect from '../actions/getproreport.actions'
import * as fromServices from '../service';

@Injectable()
export class getPrjReportEffects {
    constructor(
        private actions$: Actions,
        private getPrjReport: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetPrjReport$ = this.actions$.ofType(getPrjReportEffect.GETPROREPORT)
        .pipe(
            switchMap((action: any) => {
                return this.getPrjReport
                    .getProjectReport(action.payload.projects,
                        action.payload.panel_id,
                    )

                    .pipe(
                        map(tgroups => new getPrjReportEffect.getproreportSuccess(tgroups)),
                        catchError(error => of(new getPrjReportEffect.getproreportFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getPrjReportEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}