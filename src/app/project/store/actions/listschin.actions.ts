import { Action } from '@ngrx/store';
import { GetSource } from '../../models/project'; // Change

export const LISTSCHIN = '[Tgrp] List Schedule Invite'; // Change
export const LISTSCHIN_SUCCESS = '[Tgrp] List Schedule Invite Success'; // Change
export const LISTSCHIN_FAILURE = '[Tgrp] List Schedule Invite Failure'; // Change

export class listschinvite implements Action { // Change
  readonly type = LISTSCHIN; // Change
  constructor(public payload: any) {
  }
}

export class listschinviteSuccess implements Action { // Change
  readonly type = LISTSCHIN_SUCCESS; // Change
  constructor(public payload: any) { }
}

export class listschinviteFailure implements Action { // Change
  readonly type = LISTSCHIN_FAILURE; // Change
  constructor(public payload: any) { }
}

export type All = listschinvite | listschinviteSuccess | listschinviteFailure; // Change
