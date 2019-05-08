import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getQtEffect from '../actions/getproque.actions'
import * as fromServices from '../service';

@Injectable()
export class getQtEffects {
    constructor(
        private actions$: Actions,
        private getQt: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetQt$ = this.actions$.ofType(getQtEffect.GETPROQ)
        .pipe(
            switchMap((action: any) => {
                return this.getQt
                    .getQuestion(action.payload)
                    .pipe(
                        map(data => new getQtEffect.getproqSuccess(data)),
                        catchError(error => of(new getQtEffect.getproqFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getQtEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}