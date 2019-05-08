import { Action } from '@ngrx/store';
import {CreatePro} from '../../models/project';

export const CREATEPRO = '[Tgrp] Create Project';
export const CREATEPRO_SUCCESS = '[Tgrp] Create Project Success';
export const  CREATEPRO_FAILURE = '[Tgrp] Create Project Failure';


export class CreateProject implements Action {
  readonly type = CREATEPRO;
  constructor(public payload: any) {
  }
}

export class CreateProjectSuccess implements Action {
  readonly type = CREATEPRO_SUCCESS;
  constructor(public payload: CreatePro[]) {}
}

export class CreateProjectFailure implements Action {
  readonly type = CREATEPRO_FAILURE;
  constructor(public payload: any) {}
}

export type All =  CreateProject  | CreateProjectSuccess  | CreateProjectFailure;