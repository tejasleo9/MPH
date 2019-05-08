import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getTrgGrpExtlSupEffect from '../actions/listexpsup.actions'
import * as fromServices from '../service';

@Injectable()
export class getTrgGrpExtlSupEffects {
    constructor(
        private actions$: Actions,
        private getTrgGrpExtlSup: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetTrgGrpExtlSup$ = this.actions$.ofType(getTrgGrpExtlSupEffect.LISTEXTSUP)
        .pipe(
            switchMap((action: any) => {
                return this.getTrgGrpExtlSup
                    .getTargetGrpExternalSuppliers(action.payload.target_group_id,
                    )
                    .pipe(
                        map(tgroups => new getTrgGrpExtlSupEffect.listtextsupplySuccess(tgroups)),
                        catchError(error => of(new getTrgGrpExtlSupEffect.listtextsupplyFailure(error)))
                    )
            })
        )

}