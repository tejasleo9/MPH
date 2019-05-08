import * as fromGetSurveyLink from '../actions/getsurveylink.action';

export interface surveyLink {
    loading: boolean;
    loaded: boolean;
    links: [''];
}

export const initialState: surveyLink = {
    loading: false,
    loaded: false,
    links: [''],
}

export function reducer(state = initialState, action: fromGetSurveyLink.All): surveyLink {
    switch (action.type) {
        case fromGetSurveyLink.GETSURVEYLINK: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromGetSurveyLink.GETSURVEYLINK_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                links: data.data
            };
        }

        case fromGetSurveyLink.GETSURVEYLINK_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const getSurveyLnkLoading = (state: surveyLink) => state.loading;
export const getSurveyLnkLoaded = (state: surveyLink) => state.loaded;
export const getSurveyLnk = (state: surveyLink) => state.links;