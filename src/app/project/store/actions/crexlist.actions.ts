import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const CREXLIST = '[Tgrp] Create Exlusion'; // Change
export const CREXLIST_SUCCESS = '[Tgrp] Create Exlusion Success'; // Change
export const  CREXLIST_FAILURE = '[Tgrp] Create Exlusion Failure'; // Change

export class crexlist implements Action { // Change
    readonly type = CREXLIST; // Change
    constructor(public payload: any) {
    }
  }
  
  export class crexlistSuccess implements Action { // Change
    readonly type = CREXLIST_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class crexlistFailure implements Action { // Change
    readonly type = CREXLIST_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  crexlist  | crexlistSuccess  | crexlistFailure; // Change
