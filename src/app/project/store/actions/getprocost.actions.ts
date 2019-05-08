import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETPROCOST = '[Tgrp] Get Project Cost'; // Change
export const GETPROCOST_SUCCESS = '[Tgrp] Get Project Cost Success'; // Change
export const  GETPROCOST_FAILURE = '[Tgrp] Get Project Cost Failure'; // Change

export class getprojectcost implements Action { // Change
    readonly type = GETPROCOST; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getprojectcostSuccess implements Action { // Change
    readonly type = GETPROCOST_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getprojectcostFailure implements Action { // Change
    readonly type = GETPROCOST_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getprojectcost  | getprojectcostSuccess  | getprojectcostFailure; // Change
