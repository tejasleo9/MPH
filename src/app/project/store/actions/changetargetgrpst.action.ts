import { Action } from '@ngrx/store';

export const CHGTRGPST = '[Tgrp] CHGTRGPST';
export const CHGTRGPST_SUCCESS = '[Tgrp] CHGTRGPST Success';
export const CHGTRGPST_FAILURE = '[Tgrp] CHGTRGPST Failure';

export class changeTargetGrpStatus implements Action {
    readonly type = CHGTRGPST;
    constructor(public payload: any) {
    }
}

export class changeTargetGrpStatusSuccess implements Action {
    readonly type = CHGTRGPST_SUCCESS;
    constructor(public payload: any) { }
}

export class changeTargetGrpStatusFailure implements Action {
    readonly type = CHGTRGPST_FAILURE;
    constructor(public payload: any) { }
}

export type All = changeTargetGrpStatus | changeTargetGrpStatusSuccess | changeTargetGrpStatusFailure;