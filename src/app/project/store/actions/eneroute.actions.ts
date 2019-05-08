import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const ENEROUTE = '[Tgrp] Enable Routing'; // Change
export const ENEROUTE_SUCCESS = '[Tgrp] Enable Routing Success'; // Change
export const ENEROUTE_FAILURE = '[Tgrp] Enable Routing Failure'; // Change

export class enableroute implements Action { // Change
  readonly type = ENEROUTE; // Change
  constructor(public payload: any) {
  }
}

export class enablerouteSuccess implements Action { // Change
  readonly type = ENEROUTE_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class enablerouteFailure implements Action { // Change
  readonly type = ENEROUTE_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = enableroute | enablerouteSuccess | enablerouteFailure; // Change
