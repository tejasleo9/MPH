import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const SAVETGSTATUS = '[Tgrp] Save TG Status'; // Change
export const SAVETGSTATUS_SUCCESS = '[Tgrp] Save TG Status Success'; // Change
export const  SAVETGSTATUS_FAILURE = '[Tgrp] Save TG Status Failure'; // Change

export class savetgstatus implements Action { // Change
    readonly type = SAVETGSTATUS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class savetgstatusSuccess implements Action { // Change
    readonly type = SAVETGSTATUS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class savetgstatusFailure implements Action { // Change
    readonly type = SAVETGSTATUS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  savetgstatus  | savetgstatusSuccess  | savetgstatusFailure; // Change
