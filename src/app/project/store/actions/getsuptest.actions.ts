import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETSUPTEST = '[Tgrp] Get Supply Test'; // Change
export const GETSUPTEST_SUCCESS = '[Tgrp] Get Supply Test Success'; // Change
export const  GETSUPTEST_FAILURE = '[Tgrp] Get Supply Test Failure'; // Change

export class getsupplytest implements Action { // Change
    readonly type = GETSUPTEST; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getsupplytestSuccess implements Action { // Change
    readonly type = GETSUPTEST_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getsupplytestFailure implements Action { // Change
    readonly type = GETSUPTEST_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getsupplytest  | getsupplytestSuccess  | getsupplytestFailure; // Change
