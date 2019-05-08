import { getLocValue } from '../../models/project';
import * as fromnonlocksrc from '../actions/nonlocksrc.actions';

interface Create {
    id: number,
    name: string,
}

export interface nonlocksrcState {
    loading: boolean;
    loaded: boolean;
    nonlock: any[];
}

export const initialState: nonlocksrcState = {
    loading: false,
    loaded: false,
    nonlock: [],
}

export function reducer(state = initialState, action: fromnonlocksrc.All): nonlocksrcState {
    switch (action.type) {
        case fromnonlocksrc.NONLOCKSRC: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromnonlocksrc.NONLOCKSRC_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                nonlock: data.data.data
            };
        }

        case fromnonlocksrc.NONLOCKSRC_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const nonlocksrcLoading = (state: nonlocksrcState) => state.loading;
export const nonlocksrcLoaded = (state: nonlocksrcState) => state.loaded;
export const nonlocksrc = (state: nonlocksrcState) => state.nonlock;