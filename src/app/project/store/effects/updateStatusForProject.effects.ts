import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as updateStsForPrjEffect from '../actions/savetgstatus.actions'
import * as fromServices from '../service';

@Injectable()
export class updateStsForPrjEffects {
    constructor(
        private actions$: Actions,
        private updateStsForPrj: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadupdateStsForPrj$ = this.actions$.ofType(updateStsForPrjEffect.SAVETGSTATUS)
        .pipe(
            switchMap((action: any) => {
                return this.updateStsForPrj
                    .updateStatusForProject(action.payload)
                    .pipe(
                        map(tgroups => new updateStsForPrjEffect.savetgstatusSuccess(tgroups)),
                        catchError(error => of(new updateStsForPrjEffect.savetgstatusFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(updateStsForPrjEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}