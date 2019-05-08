import { Action } from '@ngrx/store';

export const GETREGION = '[Tgrp] GETREGION';
export const GETREGION_SUCCESS = '[Tgrp] GETREGION Success';
export const GETREGION_FAILURE = '[Tgrp] GETREGION Failure';

export class getRegion implements Action {
    readonly type = GETREGION;
    constructor(public payload: any) {
    }
}

export class getRegionSuccess implements Action {
    readonly type = GETREGION_SUCCESS;
    constructor(public payload: any) { }
}

export class getRegionFailure implements Action {
    readonly type = GETREGION_FAILURE;
    constructor(public payload: any) { }
}

export type All = getRegion | getRegionSuccess | getRegionFailure;