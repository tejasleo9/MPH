import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const DELEXLIST = '[Tgrp] Del Exlusion List'; // Change
export const DELEXLIST_SUCCESS = '[Tgrp] Del Exlusion List Success'; // Change
export const DELEXLIST_FAILURE = '[Tgrp] Del Exlusion List Failure'; // Change

export class delexlist implements Action { // Change
  readonly type = DELEXLIST; // Change
  constructor(public payload: any) {
  }
}

export class delexlistSuccess implements Action { // Change
  readonly type = DELEXLIST_SUCCESS; // Change
  constructor(public payload: GetSource) { }
}

export class delexlistFailure implements Action { // Change
  readonly type = DELEXLIST_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = delexlist | delexlistSuccess | delexlistFailure; // Change
