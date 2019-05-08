import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const SAVETGQUE = '[Tgrp] Save TG Question'; // Change
export const SAVETGQUE_SUCCESS = '[Tgrp] Save TG Question Success'; // Change
export const  SAVETGQUE_FAILURE = '[Tgrp] Save TG Question Failure'; // Change

export class savetgque implements Action { // Change
    readonly type = SAVETGQUE; // Change
    constructor(public payload: any) {
    }
  }
  
  export class savetgqueSuccess implements Action { // Change
    readonly type = SAVETGQUE_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class savetgqueFailure implements Action { // Change
    readonly type = SAVETGQUE_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  savetgque  | savetgqueSuccess  | savetgqueFailure; // Change
