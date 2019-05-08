import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const DELSURLINKS = '[Tgrp] Delete Survey Links'; // Change
export const DELSURLINKS_SUCCESS = '[Tgrp] Delete Survey Links Success'; // Change
export const  DELSURLINKS_FAILURE = '[Tgrp] Delete Survey Links Failure'; // Change

export class deletesurvey implements Action { // Change
    readonly type = DELSURLINKS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class deletesurveySuccess implements Action { // Change
    readonly type = DELSURLINKS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class deletesurveyFailure implements Action { // Change
    readonly type = DELSURLINKS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  deletesurvey  | deletesurveySuccess  | deletesurveyFailure; // Change
