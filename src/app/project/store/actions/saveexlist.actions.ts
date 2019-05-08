import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const SAVEEXLIST = '[Tgrp]Save Exlusion List'; // Change
export const SAVEEXLIST_SUCCESS = '[Tgrp]Save Exlusion List Success'; // Change
export const SAVEEXLIST_FAILURE = '[Tgrp]Save Exlusion List Failure'; // Change

export class saveexlist implements Action { // Change
  readonly type = SAVEEXLIST; // Change
  constructor(public payload: any) {
  }
}

export class saveexlistSuccess implements Action { // Change
  readonly type = SAVEEXLIST_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class saveexlistFailure implements Action { // Change
  readonly type = SAVEEXLIST_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = saveexlist | saveexlistSuccess | saveexlistFailure; // Change
