import { Action } from '@ngrx/store';
import {Industry,Category} from '../../models/project';

export const INDUSTRY = '[Pro] Industry';
export const INDUSTRY_SUCCESS = '[Pro] Industry Success';
export const  INDUSTRY_FAILURE = '[Pro] Industry Failure';

export const CATEGORY = '[Pro] Category';
export const CATEGORY_SUCCESS = '[Pro] Category Success';
export const  CATEGORY_FAILURE = '[Pro] Category Failure';


export class LoadIndustry implements Action {
  readonly type = INDUSTRY;
  constructor() {
  }
}

export class LoadIndustrySuccess implements Action {
  readonly type = INDUSTRY_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadIndustryFailure implements Action {
  readonly type = INDUSTRY_FAILURE;
  constructor(public payload: any) {}
}

export class LoadCategory implements Action {
  readonly type = CATEGORY;
  constructor(public payload: any) {
  }
}

export class LoadCategorySuccess implements Action {
  readonly type = CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCategoryFailure implements Action {
  readonly type = CATEGORY_FAILURE;
  constructor(public payload: any) {}
}

export type All =  
LoadIndustry  | 
LoadIndustrySuccess  | 
LoadIndustryFailure | 
LoadCategory | 
LoadCategorySuccess | 
LoadCategoryFailure;