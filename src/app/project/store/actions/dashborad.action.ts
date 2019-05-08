import { Action } from '@ngrx/store';

export const PROSTAT = '[Tgrp] PROSTAT';
export const PROSTAT_SUCCESS = '[Tgrp] PROSTAT Success';
export const PROSTAT_FAILURE = '[Tgrp] PROSTAT Failure';

export class projectState implements Action {
    readonly type = PROSTAT;
    constructor(public payload: any) {
    }
}

export class projectStateSuccess implements Action {
    readonly type = PROSTAT_SUCCESS;
    constructor(public payload: any) { }
}

export class projectStateFailure implements Action {
    readonly type = PROSTAT_FAILURE;
    constructor(public payload: any) { }
}

// project summery

export const PROSUMMERY = '[Tgrp] PROSUMMERY';
export const PROSUMMERY_SUCCESS = '[Tgrp] PROSUMMERY_SUCCESS Success';
export const PROSUMMERY_FAILURE = '[Tgrp] PROSUMMERY_FAILURE Failure';

export class projectSummery implements Action {
    readonly type = PROSUMMERY;
    constructor(public payload: any) {
    }
}

export class projectSummerySuccess implements Action {
    readonly type = PROSUMMERY_SUCCESS;
    constructor(public payload: any) { }
}

export class projectSummeryFailure implements Action {
    readonly type = PROSUMMERY_FAILURE;
    constructor(public payload: any) { }
}

// project time line

export const PROTIMELINE = '[Tgrp] PROTIMELINE';
export const PROTIMELINE_SUCCESS = '[Tgrp] PROTIMELINE_SUCCESS Success';
export const PROTIMELINE_FAILURE = '[Tgrp] PROTIMELINE_FAILURE Failure';

export class projectTimeline implements Action {
    readonly type = PROTIMELINE;
    constructor(public payload: any) {
    }
}

export class projectTimelineSuccess implements Action {
    readonly type = PROTIMELINE_SUCCESS;
    constructor(public payload: any) { }
}

export class projectTimelineFailure implements Action {
    readonly type = PROTIMELINE_FAILURE;
    constructor(public payload: any) { }
}

// project completes timeline

export const PROCOMTIMELINE = '[Tgrp] PROCOMTIMELINE';
export const PROCOMTIMELINE_SUCCESS = '[Tgrp] PROCOMTIMELINE_SUCCESS Success';
export const PROCOMTIMELINE_FAILURE = '[Tgrp] PROCOMTIMELINE_FAILURE Failure';

export class projectComTimeline implements Action {
    readonly type = PROCOMTIMELINE;
    constructor(public payload: any) {
    }
}

export class projectComTimelineSuccess implements Action {
    readonly type = PROCOMTIMELINE_SUCCESS;
    constructor(public payload: any) { }
}

export class projectComTimelineFailure implements Action {
    readonly type = PROCOMTIMELINE_FAILURE;
    constructor(public payload: any) { }
}


// project cost timeline

export const PROCOSTTIMELINE = '[Tgrp] PROCOSTTIMELINE';
export const PROCOSTTIMELINE_SUCCESS = '[Tgrp] PROCOSTTIMELINE_SUCCESS Success';
export const PROCOSTTIMELINE_FAILURE = '[Tgrp] PROCOSTTIMELINE_FAILURE Failure';

export class projectCostTimeline implements Action {
    readonly type = PROCOSTTIMELINE;
    constructor(public payload: any) {
    }
}

export class projectCostTimelineSuccess implements Action {
    readonly type = PROCOSTTIMELINE_SUCCESS;
    constructor(public payload: any) { }
}

export class projectCostTimelineFailure implements Action {
    readonly type = PROCOSTTIMELINE_FAILURE;
    constructor(public payload: any) { }
}

// my active projects

export const ACTIVEPROJECT = '[Tgrp] ACTIVEPROJECT';
export const ACTIVEPROJECT_SUCCESS = '[Tgrp] ACTIVEPROJECT_SUCCESS Success';
export const ACTIVEPROJECT_FAILURE = '[Tgrp] ACTIVEPROJECT_FAILURE Failure';

export class activeProject implements Action {
    readonly type = ACTIVEPROJECT;
    constructor(public payload: any) {
    }
}

export class activeProjectSuccess implements Action {
    readonly type = ACTIVEPROJECT_SUCCESS;
    constructor(public payload: any) { }
}

export class activeProjectFailure implements Action {
    readonly type = ACTIVEPROJECT_FAILURE;
    constructor(public payload: any) { }
}


export type All =
    projectState |
    projectStateSuccess |
    projectStateFailure |
    projectSummery |
    projectSummerySuccess |
    projectSummeryFailure |
    projectTimeline |
    projectTimelineSuccess |
    projectTimelineFailure |
    projectComTimeline |
    projectComTimelineSuccess |
    projectComTimelineFailure |
    projectCostTimeline |
    projectCostTimelineSuccess |
    projectCostTimelineFailure |
    activeProject |
    activeProjectSuccess |
    activeProjectFailure;