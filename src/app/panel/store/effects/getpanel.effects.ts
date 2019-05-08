import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as getPanelAction from '../actions/getpanel.actions'
import { HttpService } from 'app/store/http/http.service';
import * as requrls from './../../store/requrl'
@Injectable()
export class getPanelsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private httpservice: HttpService,
    ) { }

    @Effect()
    getPanels$ = this.actions$.ofType(getPanelAction.GET_PANELS)
        .pipe(
            switchMap((action: any) => {
                return this.httpservice.getData(requrls.listpanel)
                    .pipe(
                        map(panelslist => new getPanelAction.getPanelsSuccess(panelslist)),
                        catchError(error => of(new getPanelAction.getPanelsFailure(error)))
                    )
            })
        )
}