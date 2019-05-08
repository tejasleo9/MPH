import { Action } from '@ngrx/store';

export const GETPROSTATS = '[Tgrp] Get Project Stats'; // Change
export const GETPROSTATS_SUCCESS = '[Tgrp] Get Project Stats Success'; // Change
export const  GETPROSTATS_FAILURE = '[Tgrp] Get Project Stats Failure'; // Change

export class getprojectstats implements Action { // Change
    readonly type = GETPROSTATS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getprojectstatsSuccess implements Action { // Change
    readonly type = GETPROSTATS_SUCCESS; // Change
    constructor(public payload: any) {}
  }
  
  export class getprojectstatsFailure implements Action { // Change
    readonly type = GETPROSTATS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getprojectstats  | getprojectstatsSuccess  | getprojectstatsFailure; // Change
