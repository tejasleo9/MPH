import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as delSurveyLinksEffect from '../actions/delsurlink.actions'
import * as fromServices from '../service';

@Injectable()
export class delSurveyLinksEffects {
    constructor(
        private actions$: Actions,
        private delSurveyLinks: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loaddelSurveyLinks$ = this.actions$.ofType(delSurveyLinksEffect.DELSURLINKS)
        .pipe(
            switchMap((action: any) => {
                return this.delSurveyLinks
                    .deleteSurveyLinks(action.payload.target_group_id,
                    )

                    .pipe(
                        map(tgroups => new delSurveyLinksEffect.deletesurveySuccess(tgroups)),
                        catchError(error => of(new delSurveyLinksEffect.deletesurveyFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(delSurveyLinksEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}