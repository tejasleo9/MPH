import { Action } from "@ngrx/store";

export const AGENONLOCKSRC = "[Tgrp] Age Non Lock Source"; // Change
export const AGENONLOCKSRC_SUCCESS = "[Tgrp] Age Non Lock Source Success"; // Change
export const AGENONLOCKSRC_FAILURE = "[Tgrp] Age Non Lock Source Failure"; // Change

export class agenonlocksrc implements Action {
  // Change
  readonly type = AGENONLOCKSRC; // Change
  constructor(public payload: any) {}
}

export class agenonlocksrcSuccess implements Action {
  // Change
  readonly type = AGENONLOCKSRC_SUCCESS; // Change
  constructor(public payload: any) {}
}

export class agenonlocksrcFailure implements Action {
  // Change
  readonly type = AGENONLOCKSRC_FAILURE; // Change
  constructor(public payload: any) {}
}

export type All = agenonlocksrc | agenonlocksrcSuccess | agenonlocksrcFailure; // Change
