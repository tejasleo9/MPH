import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getTgExclListEffect from '../actions/gettgexlist.actions'
import * as fromServices from '../service';

@Injectable()
export class getTgExclListEffects {
    constructor(
        private actions$: Actions,
        private getTgExclList: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetTgExclList$ = this.actions$.ofType(getTgExclListEffect.GETTGEXLIST)
        .pipe(
            switchMap((action: any) => {
                return this.getTgExclList
                    .getTgExclusionList(action.payload)
                    .pipe(
                        map(tgroups => new getTgExclListEffect.gettgexlistSuccess(tgroups)),
                        catchError(error => of(new getTgExclListEffect.gettgexlistFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getTgExclListEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}