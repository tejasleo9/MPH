import { Action } from '@ngrx/store';
import {GetSource} from '../../models/project'; // Change

export const GETPROCOMSTATS = '[Tgrp] Get Pro Come Stats'; // Change
export const GETPROCOMSTATS_SUCCESS = '[Tgrp] Get Pro Come Stats Success'; // Change
export const  GETPROCOMSTATS_FAILURE = '[Tgrp] Get Pro Come Stats Failure'; // Change

export class getprocomstats implements Action { // Change
    readonly type = GETPROCOMSTATS; // Change
    constructor(public payload: any) {
    }
  }
  
  export class getprocomstatsSuccess implements Action { // Change
    readonly type = GETPROCOMSTATS_SUCCESS; // Change
    constructor(public payload: GetSource) {}
  }
  
  export class getprocomstatsFailure implements Action { // Change
    readonly type = GETPROCOMSTATS_FAILURE; // Change
    constructor(public payload: any) {}
  }

  export type All =  getprocomstats  | getprocomstatsSuccess  | getprocomstatsFailure; // Change
