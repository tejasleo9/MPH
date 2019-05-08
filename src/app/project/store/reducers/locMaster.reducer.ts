import { getLocMaster } from '../../models/project';
import * as fromCreate from '../actions/locatMaster.actions';

interface Create {
    id: number,
    name: string,
}

export interface locationMaster {
    loading: boolean;
    loaded: boolean;
    lmaster: getLocMaster[];
}

export const initialState: locationMaster = {
    loading: false,
    loaded: false,
    lmaster: [],
}

export function reducer(state = initialState, action: fromCreate.All): locationMaster {
    switch (action.type) {
        case fromCreate.LOCMAST: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromCreate.LOCMAST_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                lmaster: data.data.data
            };
        }

        case fromCreate.LOCMAST_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const locMasterLoading = (state: locationMaster) => state.loading;
export const locMasterLoaded = (state: locationMaster) => state.loaded;
export const locMaster = (state: locationMaster) => state.lmaster;