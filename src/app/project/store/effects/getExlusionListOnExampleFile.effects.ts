import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getExlusionListOnExampleFileEffect from '../actions/getexlist.actions'
import * as fromServices from '../service';

@Injectable()
export class getExlusionListOnExampleFileEffects {
    constructor(
        private actions$: Actions,
        private getExlusionListOnExampleFile: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadgetExlusionListOnExampleFile$ = this.actions$.ofType(getExlusionListOnExampleFileEffect.GETEXLIST)
        .pipe(
            switchMap((action: any) => {
                return this.getExlusionListOnExampleFile
                    .getExlusionListOnExampleFile(action.payload.input_conditions)

                    .pipe(
                        map(tgroups => new getExlusionListOnExampleFileEffect.getexlistSuccess(tgroups)),
                        catchError(error => of(new getExlusionListOnExampleFileEffect.getexlistFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getExlusionListOnExampleFileEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}