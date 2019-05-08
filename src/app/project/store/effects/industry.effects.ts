import {Injectable} from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {of} from 'rxjs/observable/of'
import { map, switchMap, catchError } from 'rxjs/operators';


import * as industryActions from '../actions/industry.actions'
import * as fromServices from '../service';

@Injectable()
export class IndustryEffects{
    constructor(private actions$: Actions,private industryService: fromServices.ProService){}

    @Effect()
    loadIndustry$ = this.actions$.ofType(industryActions.INDUSTRY)
        .pipe(
            switchMap((action:any) => {
                return this.industryService
                .getIndustry()
                .pipe(
                    map(industry => new industryActions.LoadIndustrySuccess(industry)),
                    catchError(error  => of(new industryActions.LoadIndustryFailure(error)))
                )
            })
        )


}