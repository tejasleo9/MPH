import { getLocMaster } from '../../models/project';
import * as fromGetRegiom from '../actions/getRegionData.action';

export interface getRegionMaster {
    loading: boolean;
    loaded: boolean;
    regions: [''];
}

export const initialState: getRegionMaster = {
    loading: false,
    loaded: false,
    regions: [''],
}

export function reducer(state = initialState, action: fromGetRegiom.All): getRegionMaster {
    switch (action.type) {
        case fromGetRegiom.GETREGION: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromGetRegiom.GETREGION_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                regions: data
            };
        }

        case fromGetRegiom.GETREGION_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const getRegionLoading = (state: getRegionMaster) => state.loading;
export const getRegionLoaded = (state: getRegionMaster) => state.loaded;
export const getRegion = (state: getRegionMaster) => state.regions;