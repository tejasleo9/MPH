import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETRESPREPORT = '[Tgrp] get Resp Report'; // Change
export const GETRESPREPORT_SUCCESS = '[Tgrp] get Resp Report Success'; // Change
export const  GETRESPREPORT_FAILURE = '[Tgrp] get Resp Report Failure'; // Change

export class getrespreport implements Action { // Change
    readonly type = GETRESPREPORT; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getrespreportSuccess implements Action { // Change
    readonly type = GETRESPREPORT_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getrespreportFailure implements Action { // Change
    readonly type = GETRESPREPORT_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getrespreport  | getrespreportSuccess  | getrespreportFailure; // Change
