import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of'
import { map, switchMap, catchError } from 'rxjs/operators';


import * as tgroupActions from '../actions/tgroup.actions'
import * as fromServices from '../service';

@Injectable()
export class TgroupEffects {
    constructor(private actions$: Actions, private tgroupService: fromServices.ProService) { }

    @Effect()
    loadTgroups$ = this.actions$.ofType(tgroupActions.TGROUPS)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .getTgroupList(action.payload)
                    .pipe(
                        map(tgroups => new tgroupActions.LoadTgroupsSuccess(tgroups)),
                        catchError(error => of(new tgroupActions.LoadTgroupsFailure(error)))
                    )
            })
        )


}