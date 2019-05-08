import { getLocValue } from '../../models/project';
import * as fromnonlocksrc from '../actions/agenonlock.actions';

interface Create {
    id: number,
    name: string,
}

export interface nonlocksrcState {
    loading: boolean;
    loaded: boolean;
    agenonlock: any[];
}

export const initialState: nonlocksrcState = {
    loading: false,
    loaded: false,
    agenonlock: [],
}

export function reducer(state = initialState, action: fromnonlocksrc.All): nonlocksrcState {
    switch (action.type) {
        case fromnonlocksrc.AGENONLOCKSRC: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromnonlocksrc.AGENONLOCKSRC_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                agenonlock: data.data.data
            };
        }

        case fromnonlocksrc.AGENONLOCKSRC_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const agenonlocksrcLoading = (state: nonlocksrcState) => state.loading;
export const agenonlocksrcLoaded = (state: nonlocksrcState) => state.loaded;
export const agenonlocksrc = (state: nonlocksrcState) => state.agenonlock;