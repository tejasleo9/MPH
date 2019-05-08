import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as tgroupActions from '../actions/getsurveylink.action'
import * as fromServices from '../service';

@Injectable()
export class getSurveyLnks {
    constructor(
        private actions$: Actions,
        private surveyLinks: fromServices.ProService,
    ) { }

    @Effect()
    getSurveyLink$ = this.actions$.ofType(tgroupActions.GETSURVEYLINK)
        .pipe(
            switchMap((action: any) => {
                return this.surveyLinks
                    .getSurveyLink(action.payload.target_group_id)
                    .pipe(
                        map(data => new tgroupActions.getSurveyLinksSuccess(data)),
                        catchError(error => of(new tgroupActions.getSurveyLinksFailure(error)))
                    )
            })
        )
}