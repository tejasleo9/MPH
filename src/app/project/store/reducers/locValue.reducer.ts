import { getLocValue } from '../../models/project';
import * as fromCreate from '../actions/locatValue.actions';

interface Create {
    id: number,
    name: string,
}

export interface locationValue {
    loading: boolean;
    loaded: boolean;
    lvalue: getLocValue[];
}

export const initialState: locationValue = {
    loading: false,
    loaded: false,
    lvalue: [],
}

export function reducer(state = initialState, action: fromCreate.All): locationValue {
    switch (action.type) {
        case fromCreate.LOCVAL: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromCreate.LOCVAL_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                lvalue: data.data
            };
        }

        case fromCreate.LOCVAL_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const locValueLoading = (state: locationValue) => state.loading;
export const locValueLoaded = (state: locationValue) => state.loaded;
export const locValue = (state: locationValue) => state.lvalue;