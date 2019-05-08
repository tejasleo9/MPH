import { getLocValue } from '../../models/project';
import * as fromquosrc from '../actions/quosrc.actions';

interface Create {
    id: number,
    name: string,
}

export interface quosrcState {
    loading: boolean;
    loaded: boolean;
    lvalue: getLocValue[];
}

export const initialState: quosrcState = {
    loading: false,
    loaded: false,
    lvalue: [],
}

export function reducer(state = initialState, action: fromquosrc.All): quosrcState {
    switch (action.type) {
        case fromquosrc.GETQSRC: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromquosrc.GETQSRC_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                lvalue: data.data.data
            };
        }

        case fromquosrc.GETQSRC_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const quosrcLoading = (state: quosrcState) => state.loading;
export const quosrcLoaded = (state: quosrcState) => state.loaded;
export const quosrc = (state: quosrcState) => state.lvalue;