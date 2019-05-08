import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getTrgGrpSettingEffect from '../actions/gettgset.actions'
import * as fromServices from '../service';

@Injectable()
export class getTrgGrpSettingEffects {
    constructor(
        private actions$: Actions,
        private saveTrgGrpSetting: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadsaveTrgGrpSetting$ = this.actions$.ofType(getTrgGrpSettingEffect.GETTGSET)
        .pipe(
            switchMap((action: any) => {
                return this.saveTrgGrpSetting
                    .saveTargetGrpSetting(action.payload)
                    .pipe(
                        map(data => new getTrgGrpSettingEffect.gettgsettingSuccess(data)),
                        catchError(error => of(new getTrgGrpSettingEffect.gettgsettingFailure(error)))
                    )
            })
        )
}