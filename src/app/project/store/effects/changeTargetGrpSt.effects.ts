import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as chgTrgGrpSt from '../actions/changetargetgrpst.action'
import * as fromServices from '../service';

@Injectable()
export class changeTrgGrpStEffets {
    constructor(
        private actions$: Actions,
        private changeTrgGrpSt: fromServices.ProService,
    ) { }

    @Effect()
    changeTrgGrpSt$ = this.actions$.ofType(chgTrgGrpSt.CHGTRGPST)
        .pipe(
            switchMap((action: any) => {
                return this.changeTrgGrpSt
                    .changeTargetGrpStatus(action.payload)
                    .pipe(
                        map(tgroups => new chgTrgGrpSt.changeTargetGrpStatusSuccess(tgroups)),
                        catchError(error => of(new chgTrgGrpSt.changeTargetGrpStatusFailure(error)))
                    )
            })
        )
}