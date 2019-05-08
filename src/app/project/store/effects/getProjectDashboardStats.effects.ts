// import { Injectable } from '@angular/core';
// import { Effect, Actions, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
// import { Router } from '@angular/router';


// import * as getPrjDashboardStatsEffect from '../actions'
// import * as fromServices from '../service';

// @Injectable()
// export class getPrjDashboardStatsEffects {
//     constructor(
//         private actions$: Actions,
//         private getPrjDashboardStats: fromServices.ProService,
//         private router: Router
//     ) { }

//     @Effect()
//     loadgetPrjDashboardStats$ = this.actions$.ofType(getPrjDashboardStatsEffect.GETPROQ)
//         .pipe(
//             switchMap((action: any) => {
//                 return this.getPrjDashboardStats
//                     .getProjectDashboardStats(action.payload.from_date,
//                         action.payload.to_date,
//                     )

//                     .pipe(
//                         map(tgroups => new getPrjDashboardStatsEffect.getproqSuccess(tgroups)),
//                         catchError(error => of(new getPrjDashboardStatsEffect.getproqFailure(error)))
//                     )
//             })
//         )


//     // Create Location Master Success 
//     // @Effect({ dispatch: false })
//     // createProjectSuccess$: Observable<any> = this.actions$.pipe(
//     //     ofType(getPrjDashboardStatsEffect.LOCMAST_SUCCESS),
//     //     tap((cpro) => {
//     //         if (cpro.payload.success == true) {
//     //             // localStorage.setItem('target-group-id', cpro.payload.data.id);
//     //             //this.router.navigateByUrl('project/create/target-groups');
//     //         }
//     //     })
//     // );
// }