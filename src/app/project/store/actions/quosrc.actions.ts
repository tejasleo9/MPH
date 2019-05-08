import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETQSRC = '[Tgrp] Quota Source'; // Change
export const GETQSRC_SUCCESS = '[Tgrp] Quota Source Success'; // Change
export const  GETQSRC_FAILURE = '[Tgrp] Quota Source Failure'; // Change

export class getqsrc implements Action { // Change
    readonly type = GETQSRC; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getqsrcSuccess implements Action { // Change
    readonly type = GETQSRC_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getqsrcFailure implements Action { // Change
    readonly type = GETQSRC_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getqsrc  | getqsrcSuccess  | getqsrcFailure; // Change
