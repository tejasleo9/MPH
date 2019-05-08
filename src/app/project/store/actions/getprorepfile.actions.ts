import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETPROREPORTFILE = '[Tgrp] Get Project Report File'; // Change
export const GETPROREPORTFILE_SUCCESS = '[Tgrp] Get Project Report File Success'; // Change
export const  GETPROREPORTFILE_FAILURE = '[Tgrp] Get Project Report File Failure'; // Change

export class getproreportfile implements Action { // Change
    readonly type = GETPROREPORTFILE; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getproreportfileSuccess implements Action { // Change
    readonly type = GETPROREPORTFILE_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getproreportfileFailure implements Action { // Change
    readonly type = GETPROREPORTFILE_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getproreportfile  | getproreportfileSuccess  | getproreportfileFailure; // Change
