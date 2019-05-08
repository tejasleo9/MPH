import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap, mapTo } from "rxjs/operators";
import { Router } from "@angular/router";

import * as viewExtSupDtlEffect from "../actions/viewextsup.actions";
import * as fromServices from "../service";

@Injectable()
export class viewExtSupDtlEffects {
  constructor(
    private actions$: Actions,
    private viewExtSupDtl: fromServices.ProService,
    private router: Router
  ) {}

  @Effect()
  loadviewExtSupDtl$ = this.actions$
    .ofType(viewExtSupDtlEffect.VIEWEXTSUP)
    .pipe(
      switchMap((action: any) => {
        return this.viewExtSupDtl
          .viewExtrnalSupplierDtl(action.payload.id)
          .pipe(
            map(
              data => new viewExtSupDtlEffect.viewextsupplySuccess(data)
            ),
            catchError(error =>
              of(new viewExtSupDtlEffect.viewextsupplyFailure(error))
            )
          );
      })
    );
}
