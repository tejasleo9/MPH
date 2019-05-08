import { Action } from "@ngrx/store";
import { GetSource } from "../../models/project"; // Change

export const LISTEXTSUP = "[Tgrp] List Ext Supply"; // Change
export const LISTEXTSUP_SUCCESS = "[Tgrp] List Ext Supply Success"; // Change
export const LISTEXTSUP_FAILURE = "[Tgrp] List Ext Supply Failure"; // Change
export const RESET = "Reset"; // Change

export class listtextsupply implements Action {
  // Change
  readonly type = LISTEXTSUP; // Change
  constructor(public payload: any) {}
}

export class listtextsupplySuccess implements Action {
  // Change
  readonly type = LISTEXTSUP_SUCCESS; // Change
  constructor(public payload: GetSource) {}
}

export class listtextsupplyFailure implements Action {
  // Change
  readonly type = LISTEXTSUP_FAILURE; // Change
  constructor(public payload: any) {}
}

export class resetState implements Action {
  // Change
  readonly type = RESET; // Change
  constructor() {}
}

export type All =
  | listtextsupply
  | listtextsupplySuccess
  | listtextsupplyFailure
  | resetState; // Change
