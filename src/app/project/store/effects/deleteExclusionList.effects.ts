import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as deleteExclListEffect from '../actions/delexlist.actions'
import * as fromServices from '../service';

@Injectable()
export class deleteExclListEffects {
    constructor(
        private actions$: Actions,
        private deleteExclList: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loaddeleteExclList$ = this.actions$.ofType(deleteExclListEffect.DELEXLIST)
        .pipe(
            switchMap((action: any) => {
                return this.deleteExclList
                    .deleteExclusionList(action.payload)
                    .pipe(
                        map(tgroups => new deleteExclListEffect.delexlistSuccess(tgroups)),
                        catchError(error => of(new deleteExclListEffect.delexlistFailure(error)))
                    )
            })
        )
}