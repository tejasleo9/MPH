import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETTGSTATS = '[Tgrp] Get TG Quota Stats'; // Change
export const GETTGSTATS_SUCCESS = '[Tgrp] Get TG Quota Stats Success'; // Change
export const  GETTGSTATS_FAILURE = '[Tgrp] Get TG Quota Stats Failure'; // Change

export class gettgquotastats implements Action { // Change
    readonly type = GETTGSTATS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class gettgquotastatsSuccess implements Action { // Change
    readonly type = GETTGSTATS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class gettgquotastatsFailure implements Action { // Change
    readonly type = GETTGSTATS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  gettgquotastats  | gettgquotastatsSuccess  | gettgquotastatsFailure; // Change
