import { Action } from '@ngrx/store';
import {ViewTargetGroup} from '../../models/project';

export const VIEWGRP = '[Tgrp] View Target Group';
export const VIEWGRP_SUCCESS = '[Tgrp] View Target Group Success';
export const  VIEWGRP_FAILURE = '[Tgrp] View Target Group Failure';


export class viewGroup implements Action {
  readonly type = VIEWGRP;
  constructor(public payload: any) {
  }
}

export class viewGroupSuccess implements Action {
  readonly type = VIEWGRP_SUCCESS;
  constructor(public payload: ViewTargetGroup) {}
}

export class viewGroupFailure implements Action {
  readonly type = VIEWGRP_FAILURE;
  constructor(public payload: any) {}
}

export type All =  viewGroup  | viewGroupSuccess  | viewGroupFailure;