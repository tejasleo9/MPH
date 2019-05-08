import { Action } from "@ngrx/store";
import { getExlList } from "../../models/project"; // Change

export const GETEXLIST = "[Tgrp] Get Exlusion List"; // Change
export const GETEXLIST_SUCCESS = "[Tgrp] Get Exlusion List Success"; // Change
export const GETEXLIST_FAILURE = "[Tgrp] Get Exlusion List Failure"; // Change

export class getexlist implements Action {
  // Change
  readonly type = GETEXLIST; // Change
  constructor(public payload: any) {}
}

export class getexlistSuccess implements Action {
  // Change
  readonly type = GETEXLIST_SUCCESS; // Change
  constructor(public payload: getExlList) {}
}

export class getexlistFailure implements Action {
  // Change
  readonly type = GETEXLIST_FAILURE; // Change
  constructor(public payload: any) {}
}

export type All = getexlist | getexlistSuccess | getexlistFailure; // Change
