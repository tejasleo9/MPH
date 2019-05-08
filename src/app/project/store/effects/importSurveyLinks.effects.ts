import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap, mapTo } from "rxjs/operators";
import { Router } from "@angular/router";

import * as impSurveyLinksEffect from "../actions/importsur.actions";
import * as fromServices from "../service";

@Injectable()
export class impSurveyLinksEffects {
  constructor(
    private actions$: Actions,
    private impSurveyLinks: fromServices.ProService,
    private router: Router
  ) {}

  @Effect()
  loadimpSurveyLinks$ = this.actions$
    .ofType(impSurveyLinksEffect.IMPORTSURVEY)
    .pipe(
      switchMap((action: any) => {
        return this.impSurveyLinks
          .importSurveyLinks(
            action.payload)
          .pipe(
            map(
              tgroups => new impSurveyLinksEffect.importsurveySuccess(tgroups)
            ),
            catchError(error =>
              of(new impSurveyLinksEffect.importsurveyFailure(error))
            )
          );
      })
    );

  // Create Location Master Success
  // @Effect({ dispatch: false })
  // createProjectSuccess$: Observable<any> = this.actions$.pipe(
  //     ofType(impSurveyLinksEffect.LOCMAST_SUCCESS),
  //     tap((cpro) => {
  //         if (cpro.payload.success == true) {
  //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
  //             //this.router.navigateByUrl('project/create/target-groups');
  //         }
  //     })
  // );
}
