import { Action } from '@ngrx/store';

export const GETQCAT = '[Tgrp] Question Category'; // Change
export const GETQCAT_SUCCESS = '[Tgrp] Question Category Success'; // Change
export const GETQCAT_FAILURE = '[Tgrp] Question Category Failure'; // Change

export class getqcat implements Action { // Change
  readonly type = GETQCAT; // Change
  constructor(public payload: any) {
  }
}

export class getqcatSuccess implements Action { // Change
  readonly type = GETQCAT_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class getqcatFailure implements Action { // Change
  readonly type = GETQCAT_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = getqcat | getqcatSuccess | getqcatFailure; // Change
