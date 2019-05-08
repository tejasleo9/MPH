import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';


import * as showResReportFilesEffect from '../actions/showrespfile.actions'
import * as fromServices from '../service';

@Injectable()
export class showResReportFilesEffects {
    constructor(
        private actions$: Actions,
        private showResReportFiles: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadshowResReportFiles$ = this.actions$.ofType(showResReportFilesEffect.SHOWRESPFILE)
        .pipe(
            switchMap((action: any) => {
                return this.showResReportFiles
                    .showRespondentReportFiles()

                    .pipe(
                        map(tgroups => new showResReportFilesEffect.showrespfilesSuccess(tgroups)),
                        catchError(error => of(new showResReportFilesEffect.showrespfilesFailure(error)))
                    )
            })
        )


    // Create Location Master Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions$.pipe(
    //     ofType(showResReportFilesEffect.LOCMAST_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
    //             //this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );
}