import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETLOCKSRC = '[Tgrp] Get Lock Source'; // Change
export const GETLOCKSRC_SUCCESS = '[Tgrp] Get Lock Source Success'; // Change
export const  GETLOCKSRC_FAILURE = '[Tgrp] Get Lock Source Failure'; // Change

export class getlocksrc implements Action { // Change
    readonly type = GETLOCKSRC; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getlocksrcSuccess implements Action { // Change
    readonly type = GETLOCKSRC_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getlocksrcFailure implements Action { // Change
    readonly type = GETLOCKSRC_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getlocksrc  | getlocksrcSuccess  | getlocksrcFailure; // Change
