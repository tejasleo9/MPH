import { Action } from '@ngrx/store';
import { updateSecure } from '../../models/project'; // Change

export const UPDATETGSET = '[Tgrp] Update TG Settings'; // Change
export const UPDATETGSET_SUCCESS = '[Tgrp] Update TG Settings Success'; // Change
export const UPDATETGSET_FAILURE = '[Tgrp] Update TG Settings Failure'; // Change

export class updatetgsetting implements Action { // Change
  readonly type = UPDATETGSET; // Change
  constructor(public payload: any) {
  }
}

export class updatetgsettingSuccess implements Action { // Change
  readonly type = UPDATETGSET_SUCCESS; // Change
  constructor(public payload: updateSecure) { }
}

export class updatetgsettingFailure implements Action { // Change
  readonly type = UPDATETGSET_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = updatetgsetting | updatetgsettingSuccess | updatetgsettingFailure; // Change
