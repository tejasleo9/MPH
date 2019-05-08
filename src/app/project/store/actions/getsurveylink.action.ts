import { Action } from '@ngrx/store';

export const GETSURVEYLINK = '[Tgrp] GETSURVEYLINK';
export const GETSURVEYLINK_SUCCESS = '[Tgrp] GETSURVEYLINK Success';
export const GETSURVEYLINK_FAILURE = '[Tgrp] GETSURVEYLINK Failure';

export class getSurveyLinks implements Action {
    readonly type = GETSURVEYLINK;
    constructor(public payload: any) {
    }
}

export class getSurveyLinksSuccess implements Action {
    readonly type = GETSURVEYLINK_SUCCESS;
    constructor(public payload: any) { }
}

export class getSurveyLinksFailure implements Action {
    readonly type = GETSURVEYLINK_FAILURE;
    constructor(public payload: any) { }
}

export type All = getSurveyLinks | getSurveyLinksSuccess | getSurveyLinksFailure;