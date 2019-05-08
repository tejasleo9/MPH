import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap, mapTo } from "rxjs/operators";
import { Router } from "@angular/router";

import * as dashboardAction from "../actions/dashborad.action";
import * as fromServices from "../service";

@Injectable()
export class getDashboardEffect {
    constructor(
        private actions$: Actions,
        private getProjetSummery: fromServices.ProService,
        private getProjetStates: fromServices.ProService,
        private getProjectTimeline: fromServices.ProService,
        private getComTimeline: fromServices.ProService,
        private getProCostTimeline: fromServices.ProService,
        private getMyActivePro: fromServices.ProService,
        private router: Router
    ) { }

    @Effect()
    loadProjectStates$ = this.actions$.ofType(dashboardAction.PROSTAT).pipe(
        switchMap((action: any) => {
            // console.log(action);
            return this.getProjetStates
                .getDashboardState(action.payload.from_date, action.payload.to_date)
                .pipe(
                    map(data => new dashboardAction.projectStateSuccess(data)),
                    catchError(error => of(new dashboardAction.projectStateFailure(error)))
                );
        })
    );

    @Effect()
    loadProjectSummery$ = this.actions$.ofType(dashboardAction.PROSUMMERY).pipe(
        switchMap((action: any) => {
            // console.log(action);
            return this.getProjetSummery
                .getDashboardProjectSummery(action.payload.from_date, action.payload.to_date)
                .pipe(
                    map(data => new dashboardAction.projectSummerySuccess(data)),
                    catchError(error => of(new dashboardAction.projectSummeryFailure(error)))
                );
        })
    );

    @Effect()
    loadProjectTimeline$ = this.actions$.ofType(dashboardAction.PROTIMELINE).pipe(
        switchMap((action: any) => {
            // console.log(action);
            return this.getProjectTimeline
                .getDashboardProjectTimeline(action.payload.from_date, action.payload.to_date)
                .pipe(
                    map(data => new dashboardAction.projectTimelineSuccess(data)),
                    catchError(error => of(new dashboardAction.projectTimelineFailure(error)))
                );
        })
    );

    @Effect()
    loadProjectComTimeline$ = this.actions$.ofType(dashboardAction.PROCOMTIMELINE).pipe(
        switchMap((action: any) => {
            // console.log(action);
            return this.getComTimeline
                .getDashboardProjectCompletesTimeline(action.payload.from_date, action.payload.to_date)
                .pipe(
                    map(data => new dashboardAction.projectComTimelineSuccess(data)),
                    catchError(error => of(new dashboardAction.projectComTimelineFailure(error)))
                );
        })
    );

    @Effect()
    loadProjectCostTimeline$ = this.actions$.ofType(dashboardAction.PROCOSTTIMELINE).pipe(
        switchMap((action: any) => {
            // console.log(action);
            return this.getProCostTimeline
                .getDashboardProjectCostTimeline(action.payload.from_date, action.payload.to_date)
                .pipe(
                    map(data => new dashboardAction.projectCostTimelineSuccess(data)),
                    catchError(error => of(new dashboardAction.projectCostTimelineFailure(error)))
                );
        })
    );

    @Effect()
    loadMyActiveProject$ = this.actions$.ofType(dashboardAction.ACTIVEPROJECT).pipe(
        switchMap((action: any) => {
            // console.log(action);
            return this.getMyActivePro
                .getDashboardMyActiveProject(action.payload.from_date, action.payload.to_date)
                .pipe(
                    map(data => new dashboardAction.activeProjectSuccess(data)),
                    catchError(error => of(new dashboardAction.activeProjectFailure(error)))
                );
        })
    );
}
