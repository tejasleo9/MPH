import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const UPDATETGSRC = '[Tgrp] Update TG Source'; // Change
export const UPDATETGSRC_SUCCESS = '[Tgrp] Update TG Source Success'; // Change
export const  UPDATETGSRC_FAILURE = '[Tgrp] Update TG Source Failure'; // Change

export class updatetgsrc implements Action { // Change
    readonly type = UPDATETGSRC; // Change
    constructor(public payload: any) {
    }
  }
  
  export class updatetgsrcSuccess implements Action { // Change
    readonly type = UPDATETGSRC_SUCCESS; // Change
    constructor(public payload: any) {}
  }
  
  export class updatetgsrcFailure implements Action { // Change
    readonly type = UPDATETGSRC_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  updatetgsrc  | updatetgsrcSuccess  | updatetgsrcFailure; // Change
