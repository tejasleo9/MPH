import { Action } from '@ngrx/store';

export const CHGTRGPSUPPST = '[Tgrp] CHGTRGPSUPPST';
export const CHGTRGPSUPPST_SUCCESS = '[Tgrp] CHGTRGPSUPPST_SUCCESS Success';
export const CHGTRGPSUPPST_FAILURE = '[Tgrp] CHGTRGPSUPPST_FAILURE Failure';

export class changeTargetGrpSuppStatus implements Action {
    readonly type = CHGTRGPSUPPST;
    constructor(public payload: any) {
    }
}

export class changeTargetGrpSuppStatusSuccess implements Action {
    readonly type = CHGTRGPSUPPST_SUCCESS;
    constructor(public payload: any) { }
}

export class changeTargetGrpSuppStatusFailure implements Action {
    readonly type = CHGTRGPSUPPST_FAILURE;
    constructor(public payload: any) { }
}

export type All = changeTargetGrpSuppStatus | changeTargetGrpSuppStatusSuccess | changeTargetGrpSuppStatusFailure;