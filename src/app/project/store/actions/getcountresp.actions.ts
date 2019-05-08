import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETCOUNTRESP = '[Tgrp] Get Count Resp'; // Change
export const GETCOUNTRESP_SUCCESS = '[Tgrp] Get Count Resp Success'; // Change
export const  GETCOUNTRESP_FAILURE = '[Tgrp] Get Count Resp Failure'; // Change

export class getcountresp implements Action { // Change
    readonly type = GETCOUNTRESP; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getcountrespSuccess implements Action { // Change
    readonly type = GETCOUNTRESP_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getcountrespFailure implements Action { // Change
    readonly type = GETCOUNTRESP_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getcountresp  | getcountrespSuccess  | getcountrespFailure; // Change
