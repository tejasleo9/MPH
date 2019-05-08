import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getListOfPrjEffect from '../actions/gettgstatus.actions'
import * as fromServices from '../service';

@Injectable()
export class getListOfPrjEffects {
    constructor(
        private actions$: Actions,
        private getListOfPrj: fromServices.ProService,
        private router: Router
    ) { }

    // @Effect()
    // loadgetListOfPrj$ = this.actions$.ofType(getListOfPrjEffect.GETTGSTATUS)
    //     .pipe(
    //         switchMap((action: any) => {
    //             return this.getListOfPrj
    //                 // .getListOfProjects(action.payload,)

    //                 // .pipe(
    //                 //     map(tgroups => new getListOfPrjEffect.gettgstatusSuccess(tgroups)),
    //                 //     catchError(error => of(new getListOfPrjEffect.gettgstatusFailure(error)))
    //                 // )
    //         })
    //     )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getListOfPrjEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}