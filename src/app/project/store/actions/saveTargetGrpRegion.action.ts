import { Action } from '@ngrx/store';

export const SAVETRGGRPREG = '[Tgrp] SAVETRGGRPREG';
export const SAVETRGGRPREG_SUCCESS = '[Tgrp] SAVETRGGRPREG Success';
export const SAVETRGGRPREG_FAILURE = '[Tgrp] SAVETRGGRPREG Failure';

export class saveTrgGrpRegion implements Action {
    readonly type = SAVETRGGRPREG;
    constructor(public payload: any) {
    }
}

export class saveTrgGrpRegionSuccess implements Action {
    readonly type = SAVETRGGRPREG_SUCCESS;
    constructor(public payload: any) { }
}

export class saveTrgGrpRegionFailure implements Action {
    readonly type = SAVETRGGRPREG_FAILURE;
    constructor(public payload: any) { }
}

export type All = saveTrgGrpRegion | saveTrgGrpRegionSuccess | saveTrgGrpRegionFailure;