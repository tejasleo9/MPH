import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const DISROUTE = '[Tgrp] Disable Routing'; // Change
export const DISROUTE_SUCCESS = '[Tgrp] Disable Routing Success'; // Change
export const  DISROUTE_FAILURE = '[Tgrp] Disable Routing Failure'; // Change

export class disableroute implements Action { // Change
    readonly type = DISROUTE; // Change
    constructor(public payload: any) {
    }
  }
  
  export class disablerouteSuccess implements Action { // Change
    readonly type = DISROUTE_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class disablerouteFailure implements Action { // Change
    readonly type = DISROUTE_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  disableroute  | disablerouteSuccess  | disablerouteFailure; // Change
