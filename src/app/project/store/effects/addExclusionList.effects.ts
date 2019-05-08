import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as addExclListEffect from '../actions/crexlist.actions'
import * as fromServices from '../service';

@Injectable()
export class addExclListEffects {
    constructor(
        private actions$: Actions,
        private addExclList: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadaddExclList$ = this.actions$.ofType(addExclListEffect.CREXLIST)
        .pipe(
            switchMap((action: any) => { 
                return this.addExclList
                    .addExclusionList(action.payload)

                    .pipe(
                        map(tgroups => new addExclListEffect.crexlistSuccess(tgroups)),
                        catchError(error => of(new addExclListEffect.crexlistFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(addExclListEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}