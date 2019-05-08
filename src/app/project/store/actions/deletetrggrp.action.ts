import { Action } from '@ngrx/store';

export const DELTRGPST = '[Tgrp] DELTRGPST';
export const DELTRGPST_SUCCESS = '[Tgrp] DELTRGPST Success';
export const DELTRGPST_FAILURE = '[Tgrp] DELTRGPST Failure';

export class delTargetGrpStatus implements Action {
    readonly type = DELTRGPST;
    constructor(public payload: any) {
    }
}

export class delTargetGrpStatusSuccess implements Action {
    readonly type = DELTRGPST_SUCCESS;
    constructor(public payload: any) { }
}

export class delTargetGrpStatusFailure implements Action {
    readonly type = DELTRGPST_FAILURE;
    constructor(public payload: any) { }
}

export type All = delTargetGrpStatus | delTargetGrpStatusSuccess | delTargetGrpStatusFailure;