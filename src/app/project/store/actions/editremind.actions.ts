import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const EDITREMIND = '[Tgrp] Edit Reminder'; // Change
export const EDITREMIND_SUCCESS = '[Tgrp] Edit Reminder Success'; // Change
export const  EDITREMIND_FAILURE = '[Tgrp] Edit Reminder Failure'; // Change

export class editremind implements Action { // Change
    readonly type = EDITREMIND; // Change
    constructor(public payload: any) {
    }
  }
  
  export class editremindSuccess implements Action { // Change
    readonly type = EDITREMIND_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class editremindFailure implements Action { // Change
    readonly type = EDITREMIND_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  editremind  | editremindSuccess  | editremindFailure; // Change
