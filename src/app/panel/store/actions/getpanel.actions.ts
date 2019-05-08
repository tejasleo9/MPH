import { Action } from '@ngrx/store';

export const GET_PANELS = '[Panel] Get Panels';
export const GET_PANELS_SUCCESS = '[Panel] Get Panels Success';
export const GET_PANELS_FAILURE = '[Panel] Get Panels Failure';

export class getPanels implements Action {
  readonly type = GET_PANELS;
  constructor() {
  }
}

export class getPanelsSuccess implements Action {
  readonly type = GET_PANELS_SUCCESS;
  constructor(public payload: any) { }
}

export class getPanelsFailure implements Action {
  readonly type = GET_PANELS_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  getPanels |
  getPanelsSuccess |
  getPanelsFailure;