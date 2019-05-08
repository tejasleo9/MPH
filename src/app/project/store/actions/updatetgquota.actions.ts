import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const UPDATETGQUOTA = '[Tgrp] Update TG Quota'; // Change
export const UPDATETGQUOTA_SUCCESS = '[Tgrp] Update TG Quota Success'; // Change
export const  UPDATETGQUOTA_FAILURE = '[Tgrp] Update TG Quota Failure'; // Change

export class updatetgquota implements Action { // Change
    readonly type = UPDATETGQUOTA; // Change
    constructor(public payload: any) {
    }
  }
  
  export class updatetgquotaSuccess implements Action { // Change
    readonly type = UPDATETGQUOTA_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class updatetgquotaFailure implements Action { // Change
    readonly type = UPDATETGQUOTA_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  updatetgquota  | updatetgquotaSuccess  | updatetgquotaFailure; // Change
