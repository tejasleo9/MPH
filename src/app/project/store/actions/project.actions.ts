import { Action } from '@ngrx/store';
import { Project, StatusPro } from '../../models/project';

export const PROJECTS = '[Pro] Project';
export const PROJECTS_SUCCESS = '[Pro] Project Success';
export const PROJECTS_FAILURE = '[Pro] Project Failure';
export const DELETE = '[Pro] Delete Project';
export const DELETE_SUCCESS = '[Pro] Delete Project Success';
export const DELETE_FAILURE = '[Pro] Delete Project Failure';
export const STATUS = '[Pro] Project Status';
export const STATUS_SUCCESS = '[Pro] Project Status Success';
export const STATUS_FAILURE = '[Pro] Project Status Failure';

export const RESET = '[Pro] Project Reset';

export class LoadProjects implements Action {
  readonly type = PROJECTS;
  constructor(public payload: any) {
  }
}

export class LoadProjectsSuccess implements Action {
  readonly type = PROJECTS_SUCCESS;
  constructor(public payload: Project[]) { }
}

export class LoadProjectsFailure implements Action {
  readonly type = PROJECTS_FAILURE;
  constructor(public payload: any) { }
}

export class DelProjects implements Action {
  readonly type = DELETE;
  constructor(public payload: any) {
  }
}

export class DelProjectsSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: Project[]) { }
}

export class DelProjectsFailure implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: any) { }
}

export class StatusProjects implements Action {
  readonly type = STATUS;
  constructor(public payload: any) {
  }
}

export class StatusProjectsSuccess implements Action {
  readonly type = STATUS_SUCCESS;
  constructor(public payload: StatusPro) { }
}

export class StatusProjectsFailure implements Action {
  readonly type = STATUS_FAILURE;
  constructor(public payload: any) { }
}

export class ResetState implements Action {
  readonly type = RESET;
  constructor() { }
}

export type All =
  LoadProjects |
  LoadProjectsSuccess |
  LoadProjectsFailure |
  DelProjects |
  DelProjectsSuccess |
  DelProjectsFailure |
  StatusProjects |
  StatusProjectsSuccess |
  StatusProjectsFailure |
  ResetState;