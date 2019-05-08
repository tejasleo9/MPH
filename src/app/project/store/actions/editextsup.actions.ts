import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const EDITEXTSUP = '[Tgrp] Edit Ext Supply'; // Change
export const EDITEXTSUP_SUCCESS = '[Tgrp] Edit Ext Supply Success'; // Change
export const  EDITEXTSUP_FAILURE = '[Tgrp] Edit Ext Supply Failure'; // Change

export class editextsupply implements Action { // Change
    readonly type = EDITEXTSUP; // Change
    constructor(public payload: any) {
    }
  }
  
  export class editextsupplySuccess implements Action { // Change
    readonly type = EDITEXTSUP_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class editextsupplyFailure implements Action { // Change
    readonly type = EDITEXTSUP_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  editextsupply  | editextsupplySuccess  | editextsupplyFailure; // Change
