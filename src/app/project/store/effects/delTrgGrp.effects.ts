import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as delTrgGrpSt from '../actions/deletetrggrp.action'
import * as fromServices from '../service';

@Injectable()
export class delTrgGrpStEffets {
    constructor(
        private actions$: Actions,
        private deleteTrgGrpSt: fromServices.ProService,
    ) { }

    @Effect()
    delTrgGrpSt$ = this.actions$.ofType(delTrgGrpSt.DELTRGPST)
        .pipe(
            switchMap((action: any) => {
                return this.deleteTrgGrpSt
                    .deleteTargetGrp(action.payload.id)
                    .pipe(
                        map(tgroups => new delTrgGrpSt.delTargetGrpStatusSuccess(tgroups)),
                        catchError(error => of(new delTrgGrpSt.delTargetGrpStatusFailure(error)))
                    )
            })
        )
}