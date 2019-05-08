import { Action } from "@ngrx/store";
import { getFeasibility } from "../../models/project";

export const FEASIBILITY = "[Tgrp] FEASIBILITY";
export const FEASIBILITY_SUCCESS = "[Tgrp] FEASIBILITY Success";
export const FEASIBILITY_FAILURE = "[Tgrp] FEASIBILITY Failure";

export class feasibility implements Action {
  readonly type = FEASIBILITY;
  constructor(public payload: any) {}
}

export class feasibilitySuccess implements Action {
  readonly type = FEASIBILITY_SUCCESS;
  constructor(public payload: getFeasibility) {}
}

export class feasibilityFailure implements Action {
  readonly type = FEASIBILITY_FAILURE;
  constructor(public payload: any) {}
}

export type All = feasibility | feasibilitySuccess | feasibilityFailure;
