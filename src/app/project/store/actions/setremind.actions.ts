import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const SETREMIND = '[Tgrp] Set Reminder'; // Change
export const SETREMIND_SUCCESS = '[Tgrp] Set Reminder Success'; // Change
export const  SETREMIND_FAILURE = '[Tgrp] Set Reminder Failure'; // Change

export class setremind implements Action { // Change
    readonly type = SETREMIND; // Change
    constructor(public payload: any) {
    }
  }
  
  export class setremindSuccess implements Action { // Change
    readonly type = SETREMIND_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class setremindFailure implements Action { // Change
    readonly type = SETREMIND_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  setremind  | setremindSuccess  | setremindFailure; // Change
