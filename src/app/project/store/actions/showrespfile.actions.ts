import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const SHOWRESPFILE = '[Tgrp] Show Resp Files'; // Change
export const SHOWRESPFILE_SUCCESS = '[Tgrp] Show Resp Files Success'; // Change
export const  SHOWRESPFILE_FAILURE = '[Tgrp] Show Resp Files Failure'; // Change

export class showrespfiles implements Action { // Change
    readonly type = SHOWRESPFILE; // Change
    constructor(public payload: any) {
    }
  }
  
  export class showrespfilesSuccess implements Action { // Change
    readonly type = SHOWRESPFILE_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class showrespfilesFailure implements Action { // Change
    readonly type = SHOWRESPFILE_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  showrespfiles  | showrespfilesSuccess  | showrespfilesFailure; // Change
