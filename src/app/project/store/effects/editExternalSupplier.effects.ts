import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as editExtSupEffect from '../actions/editextsup.actions'
import * as fromServices from '../service';

@Injectable()
export class editExtSupEffects {
    constructor(
        private actions$: Actions,
        private editExtSup: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadeditExtSup$ = this.actions$.ofType(editExtSupEffect.EDITEXTSUP)
        .pipe(
            switchMap((action: any) => {
                return this.editExtSup
                    .editExternalSupplier(action.payload)
                    .pipe(
                        map(tgroups => new editExtSupEffect.editextsupplySuccess(tgroups)),
                        catchError(error => of(new editExtSupEffect.editextsupplyFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(editExtSupEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}