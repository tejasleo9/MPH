import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const DELTGQUOTA = '[Tgrp] Del TG Quota'; // Change
export const DELTGQUOTA_SUCCESS = '[Tgrp] Del TG Quota Success'; // Change
export const  DELTGQUOTA_FAILURE = '[Tgrp] Del TG Quota Failure'; // Change

export class deltgquota implements Action { // Change
    readonly type = DELTGQUOTA; // Change
    constructor(public payload: any) {
    }
  }
  
  export class deltgquotaSuccess implements Action { // Change
    readonly type = DELTGQUOTA_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class deltgquotaFailure implements Action { // Change
    readonly type = DELTGQUOTA_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  deltgquota  | deltgquotaSuccess  | deltgquotaFailure; // Change
