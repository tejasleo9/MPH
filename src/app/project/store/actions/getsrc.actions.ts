import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const GETSGET = '[Tgrp] Get Source'; // Change
export const GETSGET_SUCCESS = '[Tgrp] Get Source Success'; // Change
export const GETSGET_FAILURE = '[Tgrp] Get Source Failure'; // Change

export class getsgetGroup implements Action { // Change
  readonly type = GETSGET; // Change
  constructor(public payload: any) {
  }
}

export class getsgetGroupSuccess implements Action { // Change
  readonly type = GETSGET_SUCCESS; // Change
  constructor(public payload: GetSource) { }
}

export class getsgetGroupFailure implements Action { // Change
  readonly type = GETSGET_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = getsgetGroup | getsgetGroupSuccess | getsgetGroupFailure; // Change
