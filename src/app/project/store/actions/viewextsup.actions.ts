import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const VIEWEXTSUP = '[Tgrp] View Ext Supply'; // Change
export const VIEWEXTSUP_SUCCESS = '[Tgrp] View Ext Supply Success'; // Change
export const  VIEWEXTSUP_FAILURE = '[Tgrp] View Ext Supply Failure'; // Change

export class viewextsupply implements Action { // Change
    readonly type = VIEWEXTSUP; // Change
    constructor(public payload: any) {
    }
  }
  
  export class viewextsupplySuccess implements Action { // Change
    readonly type = VIEWEXTSUP_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class viewextsupplyFailure implements Action { // Change
    readonly type = VIEWEXTSUP_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  viewextsupply  | viewextsupplySuccess  | viewextsupplyFailure; // Change
