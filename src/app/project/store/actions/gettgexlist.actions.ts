import { Action } from "@ngrx/store";
import { getExlList } from "../../models/project"; // Change

export const GETTGEXLIST = "[Tgrp] Get TG Exlusion List"; // Change
export const GETTGEXLIST_SUCCESS = "[Tgrp] Get TG Exlusion List Success"; // Change
export const GETTGEXLIST_FAILURE = "[Tgrp] Get TG Exlusion List Failure"; // Change

export class gettgexlist implements Action {
  // Change
  readonly type = GETTGEXLIST; // Change
  constructor(public payload: any) {}
}

export class gettgexlistSuccess implements Action {
  // Change
  readonly type = GETTGEXLIST_SUCCESS; // Change
  constructor(public payload: any) {}
}

export class gettgexlistFailure implements Action {
  // Change
  readonly type = GETTGEXLIST_FAILURE; // Change
  constructor(public payload: any) {}
}

export type All = gettgexlist | gettgexlistSuccess | gettgexlistFailure; // Change