import {Injectable} from '@angular/core';
import { Effect, Actions,ofType } from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { map, switchMap, catchError,tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as getsActions from '../actions/getsrc.actions'
import * as fromServices from '../service';

@Injectable()
export class getsEffects{
    constructor(
        private actions$: Actions,
        private tgroupService: fromServices.ProService,
        private router: Router
        ){}

    @Effect()
    loadTgroups$ = this.actions$.ofType(getsActions.GETSGET)
        .pipe(
            switchMap((action:any) => {
                return this.tgroupService
                .getSource(action.payload)
                .pipe(
                    map(source => new getsActions.getsgetGroupSuccess(source)),
                    catchError(error  => of(new getsActions.getsgetGroupFailure(error)))
                )
            })
        )

    
    // Get Source Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(getsActions.GETSGET_SUCCESS),
    //     tap((sources) => {
    //         if(sources.payload.success == true){
    //             // localStorage.setItem('target-group-id', sources.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}