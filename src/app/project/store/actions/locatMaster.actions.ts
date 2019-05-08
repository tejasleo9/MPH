import { Action } from '@ngrx/store';
import { getLocMaster } from '../../models/project';

export const LOCMAST = '[Tgrp] LOCMAST';
export const LOCMAST_SUCCESS = '[Tgrp] LOCMAST Success';
export const LOCMAST_FAILURE = '[Tgrp] LOCMAST Failure';

export class locatMaster implements Action {
    readonly type = LOCMAST;
    constructor(public payload: any) {
    }
}

export class locatMasterSuccess implements Action {
    readonly type = LOCMAST_SUCCESS;
    constructor(public payload: getLocMaster) { }
}

export class locatMasterFailure implements Action {
    readonly type = LOCMAST_FAILURE;
    constructor(public payload: any) { }
}

export type All = locatMaster | locatMasterSuccess | locatMasterFailure;