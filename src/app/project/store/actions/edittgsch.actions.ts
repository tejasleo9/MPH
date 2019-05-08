import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const EDITTGSCH = '[Tgrp] Edit TG Schedule'; // Change
export const EDITTGSCH_SUCCESS = '[Tgrp] Edit TG Schedule Success'; // Change
export const  EDITTGSCH_FAILURE = '[Tgrp] Edit TG Schedule Failure'; // Change

export class edittgsch implements Action { // Change
    readonly type = EDITTGSCH; // Change
    constructor(public payload: any) {
    }
  }
  
  export class edittgschSuccess implements Action { // Change
    readonly type = EDITTGSCH_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class edittgschFailure implements Action { // Change
    readonly type = EDITTGSCH_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  edittgsch  | edittgschSuccess  | edittgschFailure; // Change
