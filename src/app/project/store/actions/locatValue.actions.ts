import { Action } from '@ngrx/store';
import { getLocValue } from '../../models/project';

export const LOCVAL = '[Tgrp] LOCVAL';
export const LOCVAL_SUCCESS = '[Tgrp] LOCVAL Success';
export const LOCVAL_FAILURE = '[Tgrp] LOCVAL Failure';

export class locatValue implements Action {
    readonly type = LOCVAL;
    constructor(public payload: any) {
    }
}

export class locatValueSuccess implements Action {
    readonly type = LOCVAL_SUCCESS;
    constructor(public payload: getLocValue) { }
}

export class locatValueFailure implements Action {
    readonly type = LOCVAL_FAILURE;
    constructor(public payload: any) { }
}

export type All = locatValue | locatValueSuccess | locatValueFailure;