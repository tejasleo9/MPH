import {Injectable} from '@angular/core';
import { Effect, Actions,ofType } from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import { map, switchMap, catchError,tap, mapTo } from 'rxjs/operators';

import * as viewgrpActions from '../actions/viewgrp.actions'
import * as fromServices from '../service';

@Injectable()
export class viewgrpEffects{
    constructor(private actions$: Actions,private tgroupService: fromServices.ProService){}

    @Effect()
    viewGRP$ = this.actions$.ofType(viewgrpActions.VIEWGRP)
        .pipe(
            switchMap((action:any) => {
                return this.tgroupService
                .viewTargetGroup(action.payload.target_group_id)
                .pipe(
                    map(viewgrp => new viewgrpActions.viewGroupSuccess(viewgrp)),
                    catchError(error  => of(new viewgrpActions.viewGroupFailure(error)))
                )
            })
        )

    @Effect({ dispatch: false })
     viewGRPSucess$: Observable<any> = this.actions$.pipe(
         ofType(viewgrpActions.VIEWGRP_SUCCESS),
         tap((vgrp) => {
             //console.log(vgrp);
            //  if(vgrp.payload.success == true){
            //      localStorage.setItem('target-group-detail', vgrp.payload.data);
            //      //this.router.navigateByUrl('project/target-groups/region');
            //  }
         })
     );


}