import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as addOrUpdateTgExclListEffect from '../actions/saveexlist.actions'
import * as fromServices from '../service';

@Injectable()
export class addOrUpdateTgExclListEffects {
    constructor(
        private actions$: Actions,
        private addOrUpdateTgExclList: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadaddOrUpdateTgExclList$ = this.actions$.ofType(addOrUpdateTgExclListEffect.SAVEEXLIST)
        .pipe(
            switchMap((action: any) => {
                return this.addOrUpdateTgExclList
                    .addOrUpdateTgExclusionList(action.payload)
                    .pipe(
                        map(tgroups => new addOrUpdateTgExclListEffect.saveexlistSuccess(tgroups)),
                        catchError(error => of(new addOrUpdateTgExclListEffect.saveexlistFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(addOrUpdateTgExclListEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}