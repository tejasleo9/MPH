import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as projectActions from '../actions/project.actions'
import * as tgroupActions from '../actions/tgroup.actions'
import * as ctgroupActions from '../actions/createtgrp.actions'
import * as industryActions from '../actions/industry.actions'
import * as createActions from '../actions/create.actions'
import * as fromServices from '../service';
import { deleteProject } from '../reducers/reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states';

@Injectable()
export class ProjectEffects {
    constructor(
        private actions$: Actions,
        private projectService: fromServices.ProService,
        private tgroupService: fromServices.ProService,
        private router: Router, private actions: Actions,
        private store: Store<AppState>,
    ) { }

    // Get Project List
    @Effect()
    loadProjects$ = this.actions$.ofType(projectActions.PROJECTS)
        .pipe(
            switchMap((action: any) => {
                return this.projectService
                    .getList(action.payload)
                    .pipe(
                        map(projects => new projectActions.LoadProjectsSuccess(projects)),
                        catchError(error => of(new projectActions.LoadProjectsFailure(error)))
                    )
            })
        )

    // Get Country List
    @Effect()
    loadCountry$ = this.actions$.ofType(tgroupActions.COUNTRY)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .getCountry()
                    .pipe(
                        map(countries => new tgroupActions.LoadCountrySuccess(countries)),
                        catchError(error => of(new tgroupActions.LoadCountryFailure(error)))
                    )
            })
        )

    // Get Category List
    @Effect()
    loadCategory$ = this.actions$.ofType(industryActions.CATEGORY)
        .pipe(
            switchMap((action: any) => {
                return this.tgroupService
                    .getCategory(action.payload.industry_id)
                    .pipe(
                        map(category => new industryActions.LoadCategorySuccess(category)),
                        catchError(error => of(new industryActions.LoadCategoryFailure(error)))
                    )
            })
        )

    // Create Project
    @Effect()
    createProject$ = this.actions$.ofType(createActions.CREATEPRO)
        .pipe(
            switchMap((action: any) => {
                return this.projectService
                    .createProject(action.payload)
                    .pipe(
                        map(createpro => new createActions.CreateProjectSuccess(createpro)),
                        catchError(error => of(new createActions.CreateProjectFailure(error)))
                    )
            })
        )

    // Create Project Success 
    // @Effect({ dispatch: false })
    // createProjectSuccess$: Observable<any> = this.actions.pipe(
    //     ofType(createActions.CREATEPRO_SUCCESS),
    //     tap((cpro) => {
    //         if (cpro.payload.success == true) {
    //             localStorage.setItem('project-name', cpro.payload.data.name);
    //             localStorage.setItem('project_id', cpro.payload.data.id);
    //             this.router.navigateByUrl('project/create/target-groups');
    //         }
    //     })
    // );

    // Delete Project
    @Effect()
    deleteProject$ = this.actions$.ofType(projectActions.DELETE)
        .pipe(
            switchMap((action: any) => {
                return this.projectService
                    .deleteProject(action.payload.id)
                    .pipe(
                        map(message => new projectActions.DelProjectsSuccess(message)),
                        catchError(error => of(new projectActions.DelProjectsFailure(error)))
                    )
            })
        )

    // Delete Project Success 
    // @Effect()
    // deleteProjectSuccess$: Observable<any> = this.actions$.ofType(projectActions.DELETE_SUCCESS)
    // .pipe(
    //     switchMap(() => {
    //         return this.projectService
    //         .getList()
    //         .pipe(
    //             map(projects => new projectActions.LoadProjectsSuccess(projects)),
    //             catchError(error  => of(new projectActions.LoadProjectsFailure(error)))
    //         )
    //     })
    // )

    // Project Status
    @Effect()
    projectStatus$ = this.actions$.ofType(projectActions.STATUS)
        .pipe(
            switchMap((action: any) => {
                return this.projectService
                    .statusProject(action.payload)
                    .pipe(
                        map(message => new projectActions.StatusProjectsSuccess(message)),
                        catchError(error => of(new projectActions.StatusProjectsFailure(error)))
                    )
            })
        )

    // Project Status Success 
    // @Effect()
    // projectStatusSuccess$: Observable<any> = this.actions.pipe(
    //     ofType(projectActions.STATUS_SUCCESS),
    //     tap((cpro) => {
    //         if(cpro.payload.success == true){
    //             localStorage.setItem('success','true');
    //         }
    //     })
    // );


}