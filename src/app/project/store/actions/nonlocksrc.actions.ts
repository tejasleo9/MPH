import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const NONLOCKSRC = '[Tgrp] Non Lock Source'; // Change
export const NONLOCKSRC_SUCCESS = '[Tgrp] Non Lock Source Success'; // Change
export const  NONLOCKSRC_FAILURE = '[Tgrp] Non Lock Source Failure'; // Change

export class nonlocksrc implements Action { // Change
    readonly type = NONLOCKSRC; // Change
    constructor(public payload: any) {
    }
  }
  
  export class nonlocksrcSuccess implements Action { // Change
    readonly type = NONLOCKSRC_SUCCESS; // Change
    constructor(public payload: any) {}
  }
  
  export class nonlocksrcFailure implements Action { // Change
    readonly type = NONLOCKSRC_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  nonlocksrc  | nonlocksrcSuccess  | nonlocksrcFailure; // Change
