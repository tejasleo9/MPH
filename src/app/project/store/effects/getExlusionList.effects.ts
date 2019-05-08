import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap, mapTo } from "rxjs/operators";
import { Router } from "@angular/router";

import * as getExclListEffect from "../actions/getexlist.actions";
import * as fromServices from "../service";

@Injectable()
export class getExclListEffects {
  constructor(
    private actions$: Actions,
    private getExclList: fromServices.ProService,
    private router: Router
  ) {}

  @Effect()
  loadgetExclList$ = this.actions$.ofType(getExclListEffect.GETEXLIST).pipe(
    switchMap((action: any) => {
      // console.log(action);
      return this.getExclList
        .getExlusionList(action.payload)
        .pipe(
          map(data => new getExclListEffect.getexlistSuccess(data)),
          catchError(error => of(new getExclListEffect.getexlistFailure(error)))
        );
    })
  );

  // Create Location Master Success
  // @Effect({ dispatch: false })
  // createProjectSuccess$: Observable<any> = this.actions$.pipe(
  //     ofType(getExclListEffect.LOCMAST_SUCCESS),
  //     tap((cpro) => {
  //         if (cpro.payload.success == true) {
  //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
  //             //this.router.navigateByUrl('project/create/target-groups');
  //         }
  //     })
  // );
}
