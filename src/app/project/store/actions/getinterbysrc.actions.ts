import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETINTERBYSRC = '[Tgrp] Get Interlock Quota By Src'; // Change
export const GETINTERBYSRC_SUCCESS = '[Tgrp] Get Interlock Quota By Src Success'; // Change
export const  GETINTERBYSRC_FAILURE = '[Tgrp] Get Interlock Quota By Src Failure'; // Change

export class getinterquotabysrc implements Action { // Change
    readonly type = GETINTERBYSRC; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getinterquotabysrcSuccess implements Action { // Change
    readonly type = GETINTERBYSRC_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getinterquotabysrcFailure implements Action { // Change
    readonly type = GETINTERBYSRC_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getinterquotabysrc  | getinterquotabysrcSuccess  | getinterquotabysrcFailure; // Change
