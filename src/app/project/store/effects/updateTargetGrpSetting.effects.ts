import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as updTrgGrpSettingEffect from '../actions/updatetgset.actions'
import * as fromServices from '../service';

@Injectable()
export class updTrgGrpSettingEffects {
    constructor(
        private actions$: Actions,
        private updTrgGrpSetting: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadupdTrgGrpSetting$ = this.actions$.ofType(updTrgGrpSettingEffect.UPDATETGSET)
        .pipe(
            switchMap((action: any) => {
                return this.updTrgGrpSetting
                    .updateTargetGrpSetting(action.payload)
                    .pipe(
                        map(data => new updTrgGrpSettingEffect.updatetgsettingSuccess(data)),
                        catchError(error => of(new updTrgGrpSettingEffect.updatetgsettingFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(updTrgGrpSettingEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}