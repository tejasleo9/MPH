import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getCountResReportEffect from '../actions/getcountresp.actions'
import * as fromServices from '../service';

@Injectable()
export class getCountResReportEffects {
    constructor(
        private actions$: Actions,
        private getCountResReport: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetCountResReport$ = this.actions$.ofType(getCountResReportEffect.GETCOUNTRESP)
        .pipe(
            switchMap((action: any) => {
                return this.getCountResReport
                    .getCountRespondentReport(action.payload.projects,
                        action.payload.respondent_status,
                    )

                    .pipe(
                        map(tgroups => new getCountResReportEffect.getcountrespSuccess(tgroups)),
                        catchError(error => of(new getCountResReportEffect.getcountrespFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getCountResReportEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}