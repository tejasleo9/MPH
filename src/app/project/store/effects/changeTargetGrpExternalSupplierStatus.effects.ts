import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as chgTrgGrpExtSupStatusEffect from '../actions/extsupstatus.actions'
import * as fromServices from '../service';

@Injectable()
export class chgTrgGrpExtSupStatusEffects {
    constructor(
        private actions$: Actions,
        private chgTrgGrpExtSupStatus: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadchgTrgGrpExtSupStatus$ = this.actions$.ofType(chgTrgGrpExtSupStatusEffect.EXTSUPSTATUS)
        .pipe(
            switchMap((action: any) => {
                return this.chgTrgGrpExtSupStatus
                    .changeTargetGrpExternalSupplierStatus(action.payload)
                    .pipe(
                        map(tgroups => new chgTrgGrpExtSupStatusEffect.extsupplystatusSuccess(tgroups)),
                        catchError(error => of(new chgTrgGrpExtSupStatusEffect.extsupplystatusFailure(error)))
                    )
            })
        )
}