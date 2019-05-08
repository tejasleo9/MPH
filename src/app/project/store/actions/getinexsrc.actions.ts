import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETINEXSRC = '[Tgrp] Get In Ex Source'; // Change
export const GETINEXSRC_SUCCESS = '[Tgrp] Get In Ex Source Success'; // Change
export const  GETINEXSRC_FAILURE = '[Tgrp] Get In Ex Source Failure'; // Change

export class getinexsrc implements Action { // Change
    readonly type = GETINEXSRC; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getinexsrcSuccess implements Action { // Change
    readonly type = GETINEXSRC_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getinexsrcFailure implements Action { // Change
    readonly type = GETINEXSRC_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getinexsrc  | getinexsrcSuccess  | getinexsrcFailure; // Change
