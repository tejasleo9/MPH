import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getFeasibilityOnQuestionEffect from '../actions/getproque.actions'
import * as fromServices from '../service';

@Injectable()
export class getFeasibilityOnQuestionEffects {
    constructor(
        private actions$: Actions,
        private getFeasibilityOnQt: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetFeasibilityOnQt$ = this.actions$.ofType(getFeasibilityOnQuestionEffect.GETPROQ)
        .pipe(
            switchMap((action: any) => {
                return this.getFeasibilityOnQt
                    .getFeasibilityOnQuestion(action.payload.country_id,
                        action.payload.estimated_ir,
                        action.payload.estimated_loi,
                        action.payload.completes_required,
                        action.payload.min_age,
                        action.payload.max_age,
                        action.payload.gender,
                        action.payload.questions,
                        action.payload.project_id,
                    )

                    .pipe(
                        map(tgroups => new getFeasibilityOnQuestionEffect.getproqSuccess(tgroups)),
                        catchError(error => of(new getFeasibilityOnQuestionEffect.getproqFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getFeasibilityOnQuestionEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}