import { Action } from '@ngrx/store';
import {TGroups} from '../../models/project';

export const TGROUPS = '[Tgrp] Tgroup';
export const TGROUPS_SUCCESS = '[Tgrp] Tgroup Success';
export const  TGROUPS_FAILURE = '[Tgrp] Tgroup Failure';

export const COUNTRY = '[Tgrp] Country';
export const COUNTRY_SUCCESS = '[Tgrp] Country Success';
export const  COUNTRY_FAILURE = '[Tgrp] Country Failure';

// Load Target Groups
export class LoadTgroups implements Action {
  readonly type = TGROUPS;
  constructor(public payload: any) {
  }
}

export class LoadTgroupsSuccess implements Action {
  readonly type = TGROUPS_SUCCESS;
  constructor(public payload: TGroups[]) {}
}

export class LoadTgroupsFailure implements Action {
  readonly type = TGROUPS_FAILURE;
  constructor(public payload: any) {}
}

// Load Countries

export class LoadCountry implements Action {
  readonly type = COUNTRY;
  constructor() {
  }
}

export class LoadCountrySuccess implements Action {
  readonly type = COUNTRY_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCountryFailure implements Action {
  readonly type = COUNTRY_FAILURE;
  constructor(public payload: any) {}
}

export type All =  LoadTgroups  | 
LoadTgroupsSuccess  | 
LoadTgroupsFailure | 
LoadCountry | 
LoadCountrySuccess | 
LoadCountryFailure;