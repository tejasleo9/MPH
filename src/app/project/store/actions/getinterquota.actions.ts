import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const GETINTERQUOTA = '[Tgrp] Get Interlock Quota'; // Change
export const GETINTERQUOTA_SUCCESS = '[Tgrp] Get Interlock Quota Success'; // Change
export const GETINTERQUOTA_FAILURE = '[Tgrp] Get Interlock Quota Failure'; // Change

export class getinterquota implements Action { // Change
  readonly type = GETINTERQUOTA; // Change
  constructor(public payload: any) {
  }
}

export class getinterquotaSuccess implements Action { // Change
  readonly type = GETINTERQUOTA_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class getinterquotaFailure implements Action { // Change
  readonly type = GETINTERQUOTA_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = getinterquota | getinterquotaSuccess | getinterquotaFailure; // Change
