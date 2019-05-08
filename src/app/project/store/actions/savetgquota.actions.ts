import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const SAVETGQUOTA = '[Tgrp] Save TG Quota'; // Change
export const SAVETGQUOTA_SUCCESS = '[Tgrp] Save TG Quota Success'; // Change
export const  SAVETGQUOTA_FAILURE = '[Tgrp] Save TG Quota Failure'; // Change

export class savetgquota implements Action { // Change
    readonly type = SAVETGQUOTA; // Change
    constructor(public payload: any) {
    }
  }
  
  export class savetgquotaSuccess implements Action { // Change
    readonly type = SAVETGQUOTA_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class savetgquotaFailure implements Action { // Change
    readonly type = SAVETGQUOTA_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  savetgquota  | savetgquotaSuccess  | savetgquotaFailure; // Change
