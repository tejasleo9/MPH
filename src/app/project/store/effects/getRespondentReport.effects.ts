import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getResReportEffect from '../actions/getrespreport.actions'
import * as fromServices from '../service';

@Injectable()
export class getResReportEffects {
    constructor(
        private actions$: Actions,
        private getResReport: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetResReport$ = this.actions$.ofType(getResReportEffect.GETRESPREPORT)
        .pipe(
            switchMap((action: any) => {
                return this.getResReport
                    .getRespondentReport(action.payload.projects,
                        action.payload.respondent_status,
                    )

                    .pipe(
                        map(tgroups => new getResReportEffect.getrespreportSuccess(tgroups)),
                        catchError(error => of(new getResReportEffect.getrespreportFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getResReportEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}