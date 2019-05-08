import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETRESPSTATUS = '[Tgrp] Get Resp Status'; // Change
export const GETRESPSTATUS_SUCCESS = '[Tgrp] Get Resp Status Success'; // Change
export const  GETRESPSTATUS_FAILURE = '[Tgrp] Get Resp Status Failure'; // Change

export class getrespstatus implements Action { // Change
    readonly type = GETRESPSTATUS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getrespstatusSuccess implements Action { // Change
    readonly type = GETRESPSTATUS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getrespstatusFailure implements Action { // Change
    readonly type = GETRESPSTATUS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getrespstatus  | getrespstatusSuccess  | getrespstatusFailure; // Change
