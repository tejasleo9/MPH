import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const SCHBYQUOTA = '[Tgrp] Schedule By Quota'; // Change
export const SCHBYQUOTA_SUCCESS = '[Tgrp] Schedule By Quota Success'; // Change
export const  SCHBYQUOTA_FAILURE = '[Tgrp] Schedule By Quota Failure'; // Change

export class schbyquota implements Action { // Change
    readonly type = SCHBYQUOTA; // Change
    constructor(public payload: any) {
    }
  }
  
  export class schbyquotaSuccess implements Action { // Change
    readonly type = SCHBYQUOTA_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class schbyquotaFailure implements Action { // Change
    readonly type = SCHBYQUOTA_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  schbyquota  | schbyquotaSuccess  | schbyquotaFailure; // Change
