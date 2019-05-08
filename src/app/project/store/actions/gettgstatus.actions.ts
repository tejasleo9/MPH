import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETTGSTATUS = '[Tgrp] Get TG Status'; // Change
export const GETTGSTATUS_SUCCESS = '[Tgrp] Get TG Status Success'; // Change
export const  GETTGSTATUS_FAILURE = '[Tgrp] Get TG Status Failure'; // Change

export class gettgstatus implements Action { // Change
    readonly type = GETTGSTATUS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class gettgstatusSuccess implements Action { // Change
    readonly type = GETTGSTATUS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class gettgstatusFailure implements Action { // Change
    readonly type = GETTGSTATUS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  gettgstatus  | gettgstatusSuccess  | gettgstatusFailure; // Change
