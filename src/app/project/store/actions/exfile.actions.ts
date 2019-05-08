import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const EXFILE = '[Tgrp] Example File'; // Change
export const EXFILE_SUCCESS = '[Tgrp] Example File Success'; // Change
export const  EXFILE_FAILURE = '[Tgrp] Example File Failure'; // Change

export class exfile implements Action { // Change
    readonly type = EXFILE; // Change
    constructor(public payload: any) {
    }
  }
  
  export class exfileSuccess implements Action { // Change
    readonly type = EXFILE_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class exfileFailure implements Action { // Change
    readonly type = EXFILE_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  exfile  | exfileSuccess  | exfileFailure; // Change
