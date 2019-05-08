import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getSchInvEffect from '../actions/listschin.actions'
import * as fromServices from '../service';

@Injectable()
export class getSchInvEffects {
    constructor(
        private actions$: Actions,
        private getSchInv: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetSchInv$ = this.actions$.ofType(getSchInvEffect.LISTSCHIN)
        .pipe(
            switchMap((action: any) => {
                return this.getSchInv
                    .getSchInvites(action.payload)
                    .pipe(
                        map(tgroups => new getSchInvEffect.listschinviteSuccess(tgroups)),
                        catchError(error => of(new getSchInvEffect.listschinviteFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getSchInvEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}