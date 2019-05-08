import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as addExtSupplierEffect from '../actions/addextsup.actions'
import * as fromServices from '../service';

@Injectable()
export class addExtSupplierEffects {
    constructor(
        private actions$: Actions,
        private addExtSupplier: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadaddExtSupplier$ = this.actions$.ofType(addExtSupplierEffect.ADDEXTSUP)
        .pipe(
            switchMap((action: any) => {
                return this.addExtSupplier
                    .addExternalSupplier(action.payload)
                    .pipe(
                        map(tgroups => new addExtSupplierEffect.addextsupplySuccess(tgroups)),
                        catchError(error => of(new addExtSupplierEffect.addextsupplyFailure(error)))
                    )
            }) 
        )
    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(addExtSupplierEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}