import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const IMPORTSURVEY = '[Tgrp] Import Survey Links'; // Change
export const IMPORTSURVEY_SUCCESS = '[Tgrp] Import Survey Links Success'; // Change
export const IMPORTSURVEY_FAILURE = '[Tgrp] Import Survey Links Failure'; // Change

export class importsurvey implements Action { // Change
  readonly type = IMPORTSURVEY; // Change
  constructor(public payload: any) {
  }
}

export class importsurveySuccess implements Action { // Change
  readonly type = IMPORTSURVEY_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class importsurveyFailure implements Action { // Change
  readonly type = IMPORTSURVEY_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = importsurvey | importsurveySuccess | importsurveyFailure; // Change
