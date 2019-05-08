import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const EXTSUPSTATUS = '[Tgrp] Ext Supply Status'; // Change
export const EXTSUPSTATUS_SUCCESS = '[Tgrp] Ext Supply Status Success'; // Change
export const EXTSUPSTATUS_FAILURE = '[Tgrp] Ext Supply Status Failure'; // Change

export class extsupplystatus implements Action { // Change
  readonly type = EXTSUPSTATUS; // Change
  constructor(public payload: any) {
  }
}

export class extsupplystatusSuccess implements Action { // Change
  readonly type = EXTSUPSTATUS_SUCCESS; // Change
  constructor(public payload: GetSource) { }
}

export class extsupplystatusFailure implements Action { // Change
  readonly type = EXTSUPSTATUS_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = extsupplystatus | extsupplystatusSuccess | extsupplystatusFailure; // Change
