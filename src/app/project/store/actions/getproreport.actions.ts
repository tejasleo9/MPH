import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETPROREPORT = '[Tgrp] Get Project Report'; // Change
export const GETPROREPORT_SUCCESS = '[Tgrp] Get Project Report Success'; // Change
export const  GETPROREPORT_FAILURE = '[Tgrp] Get Project Report Failure'; // Change

export class getproreport implements Action { // Change
    readonly type = GETPROREPORT; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getproreportSuccess implements Action { // Change
    readonly type = GETPROREPORT_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getproreportFailure implements Action { // Change
    readonly type = GETPROREPORT_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getproreport  | getproreportSuccess  | getproreportFailure; // Change
