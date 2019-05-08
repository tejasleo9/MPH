import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETRESSTATUS = '[Tgrp] Get Response Status'; // Change
export const GETRESSTATUS_SUCCESS = '[Tgrp] Get Response Status Success'; // Change
export const  GETRESSTATUS_FAILURE = '[Tgrp] Get Response Status Failure'; // Change

export class getresstatus implements Action { // Change
    readonly type = GETRESSTATUS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getresstatusSuccess implements Action { // Change
    readonly type = GETRESSTATUS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getresstatusFailure implements Action { // Change
    readonly type = GETRESSTATUS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getresstatus  | getresstatusSuccess  | getresstatusFailure; // Change
