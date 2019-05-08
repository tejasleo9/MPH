import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const ADDEXTSUP = '[Tgrp] Add Ext Supply'; // Change
export const ADDEXTSUP_SUCCESS = '[Tgrp] Add Ext Supply Success'; // Change
export const  ADDEXTSUP_FAILURE = '[Tgrp] Add Ext Supply Failure'; // Change

export class addextsupply implements Action { // Change
    readonly type = ADDEXTSUP; // Change
    constructor(public payload: any) {
    }
  }
  
  export class addextsupplySuccess implements Action { // Change
    readonly type = ADDEXTSUP_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class addextsupplyFailure implements Action { // Change
    readonly type = ADDEXTSUP_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  addextsupply  | addextsupplySuccess  | addextsupplyFailure; // Change
