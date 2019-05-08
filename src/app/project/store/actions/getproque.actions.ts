import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const GETPROQ = '[Tgrp] Profile Question'; // Change
export const GETPROQ_SUCCESS = '[Tgrp] Profile Question Success'; // Change
export const GETPROQ_FAILURE = '[Tgrp] Profile Question Failure'; // Change

export class getproq implements Action { // Change
  readonly type = GETPROQ; // Change
  constructor(public payload: any) {
  }
}

export class getproqSuccess implements Action { // Change
  readonly type = GETPROQ_SUCCESS; // Change
  constructor(public payload: GetSource) { }
}

export class getproqFailure implements Action { // Change
  readonly type = GETPROQ_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = getproq | getproqSuccess | getproqFailure; // Change
