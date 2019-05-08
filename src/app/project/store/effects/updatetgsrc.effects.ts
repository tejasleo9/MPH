import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as updateTgGrpSrcEffect from '../actions/updatetgsrc.actions'
import * as fromServices from '../service';

@Injectable()
export class updateTgGrpSrcEffects {
    constructor(
        private actions$: Actions,
        private updateTgGrpBatches: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadupdateTgGrpBatches$ = this.actions$.ofType(updateTgGrpSrcEffect.UPDATETGSRC)
        .pipe(
            switchMap((action: any) => {
                return this.updateTgGrpBatches
                    .saveTGSources(action.payload)
                    .pipe(
                        map(tgroups => new updateTgGrpSrcEffect.updatetgsrcSuccess(tgroups)),
                        catchError(error => of(new updateTgGrpSrcEffect.updatetgsrcFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(updateTgGrpSrcEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}