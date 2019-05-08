import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETSRCEX = '[Tgrp]Get Src Exlusion'; // Change
export const GETSRCEX_SUCCESS = '[Tgrp]Get Src Exlusion Success'; // Change
export const  GETSRCEX_FAILURE = '[Tgrp]Get Src Exlusion Failure'; // Change

export class getsrcex implements Action { // Change
    readonly type = GETSRCEX; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getsrcexSuccess implements Action { // Change
    readonly type = GETSRCEX_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getsrcexFailure implements Action { // Change
    readonly type = GETSRCEX_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getsrcex  | getsrcexSuccess  | getsrcexFailure; // Change
