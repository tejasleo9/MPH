import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const GETTGSET = '[Tgrp] Get TG Settings'; // Change
export const GETTGSET_SUCCESS = '[Tgrp] Get TG Settings Success'; // Change
export const GETTGSET_FAILURE = '[Tgrp] Get TG Settings Failure'; // Change

export class gettgsetting implements Action { // Change
  readonly type = GETTGSET; // Change
  constructor(public payload: any) {
  }
}

export class gettgsettingSuccess implements Action { // Change
  readonly type = GETTGSET_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class gettgsettingFailure implements Action { // Change
  readonly type = GETTGSET_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = gettgsetting | gettgsettingSuccess | gettgsettingFailure; // Change
