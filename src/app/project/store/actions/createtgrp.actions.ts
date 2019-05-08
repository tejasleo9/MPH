import { Action } from '@ngrx/store';
import {CreateTgrp} from '../../models/project';

export const CREATE = '[Tgrp] CREATE';
export const CREATE_SUCCESS = '[Tgrp] CREATE Success';
export const  CREATE_FAILURE = '[Tgrp] CREATE Failure';

export class createGroup implements Action {
    readonly type = CREATE;
    constructor(public payload: any) {
    }
  }
  
  export class createGroupSuccess implements Action {
    readonly type = CREATE_SUCCESS;
    constructor(public payload: CreateTgrp) {}
  }
  
  export class createGroupFailure implements Action {
    readonly type = CREATE_FAILURE;
    constructor(public payload: any) {}
  }

  export type All =  createGroup  | createGroupSuccess  | createGroupFailure;