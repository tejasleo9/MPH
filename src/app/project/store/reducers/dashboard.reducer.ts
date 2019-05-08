import { getLocMaster } from '../../models/project';
import * as fromDshboard from '../actions/dashborad.action';

//projecr states

export interface projectStates {
    loading: boolean;
    loaded: boolean;
    states: [''];
}

export const projectStateinitialState: projectStates = {
    loading: false,
    loaded: false,
    states: [''],
}

export function projectstatereducer(state = projectStateinitialState, action: fromDshboard.All): projectStates {
    switch (action.type) {
        case fromDshboard.PROSTAT: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDshboard.PROSTAT_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                states: data.data
            };
        }

        case fromDshboard.PROSTAT_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const lproStatLoading = (state: projectStates) => state.loading;
export const proStatLoaded = (state: projectStates) => state.loaded;
export const proStat = (state: projectStates) => state.states;

//project summery

export interface projectSummery {
    loading: boolean;
    loaded: boolean;
    summery: [''];
}

export const projectSummeryinitialState: projectSummery = {
    loading: false,
    loaded: false,
    summery: [''],
}

export function projectsummeyreducer(state = projectSummeryinitialState, action: fromDshboard.All): projectSummery {
    switch (action.type) {
        case fromDshboard.PROSUMMERY: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDshboard.PROSUMMERY_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                summery: data.data
            };
        }

        case fromDshboard.PROSUMMERY_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const proSummeryLoading = (state: projectSummery) => state.loading;
export const proSummeryLoaded = (state: projectSummery) => state.loaded;
export const proSummery = (state: projectSummery) => state.summery;


//project timeline

export interface projectTimeline {
    loading: boolean;
    loaded: boolean;
    timeline: [''];
}

export const projectyimelineinitialState: projectTimeline = {
    loading: false,
    loaded: false,
    timeline: [''],
}

export function projecttimelinereducer(state = projectyimelineinitialState, action: fromDshboard.All): projectTimeline {
    switch (action.type) {
        case fromDshboard.PROTIMELINE: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDshboard.PROTIMELINE_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                timeline: data.data
            };
        }

        case fromDshboard.PROTIMELINE_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const proTimelineLoading = (state: projectTimeline) => state.loading;
export const proTimelineLoaded = (state: projectTimeline) => state.loaded;
export const proTimeline = (state: projectTimeline) => state.timeline;

//project complete timeline

export interface projectCompleteTimeline {
    loading: boolean;
    loaded: boolean;
    comtimeline: [''];
}

export const projectcomTimelineinitialState: projectCompleteTimeline = {
    loading: false,
    loaded: false,
    comtimeline: [''],
}


export function projectcomtimelinereducer(state = projectcomTimelineinitialState, action: fromDshboard.All): projectCompleteTimeline {
    switch (action.type) {
        case fromDshboard.PROTIMELINE: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDshboard.PROCOMTIMELINE_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                comtimeline: data.data
            };
        }

        case fromDshboard.PROCOMTIMELINE_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}


export const proComTimelineLoading = (state: projectCompleteTimeline) => state.loading;
export const proComTimelineLoaded = (state: projectCompleteTimeline) => state.loaded;
export const proComTimeline = (state: projectCompleteTimeline) => state.comtimeline;


//project cost timeline

export interface projectCostTimeline {
    loading: boolean;
    loaded: boolean;
    costtimeline: [''];
}

export const projectcomimelineinitialState: projectCostTimeline = {
    loading: false,
    loaded: false,
    costtimeline: [''],
}


export function projectcosttimelinereducer(state = projectcomimelineinitialState, action: fromDshboard.All): projectCostTimeline {
    switch (action.type) {
        case fromDshboard.PROCOSTTIMELINE: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDshboard.PROCOSTTIMELINE_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                costtimeline: data.data
            };
        }

        case fromDshboard.PROCOSTTIMELINE_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}


export const proCostTimelineLoading = (state: projectCostTimeline) => state.loading;
export const proCostTimelineLoaded = (state: projectCostTimeline) => state.loaded;
export const proCostTimeline = (state: projectCostTimeline) => state.costtimeline;


//my active projects

export interface myActiveProject {
    loading: boolean;
    loaded: boolean;
    activepro: [''];
}

export const myactiveproinitialState: myActiveProject = {
    loading: false,
    loaded: false,
    activepro: [''],
}


export function myactiveproreducer(state = myactiveproinitialState, action: fromDshboard.All): myActiveProject {
    switch (action.type) {
        case fromDshboard.PROCOSTTIMELINE: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDshboard.PROCOSTTIMELINE_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                activepro: data.data
            };
        }

        case fromDshboard.PROCOSTTIMELINE_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}


export const myActiveProLoading = (state: myActiveProject) => state.loading;
export const myActiveProLoaded = (state: myActiveProject) => state.loaded;
export const myActivePro = (state: myActiveProject) => state.activepro;