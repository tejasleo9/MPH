import { getLocMaster } from '../../models/project';
import * as fromsaveTrgRegion from '../actions/saveTargetGrpRegion.action';

export interface saveTargetGroupRegion {
    loading: boolean;
    loaded: boolean;
    message: [''];
}

export const initialState: saveTargetGroupRegion = {
    loading: false,
    loaded: false,
    message: [''],
}

export function reducer(state = initialState, action: fromsaveTrgRegion.All): saveTargetGroupRegion {
    switch (action.type) {
        case fromsaveTrgRegion.SAVETRGGRPREG: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromsaveTrgRegion.SAVETRGGRPREG_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                message: data.data
            };
        }

        case fromsaveTrgRegion.SAVETRGGRPREG_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const saveTrgGrpRegionLoading = (state: saveTargetGroupRegion) => state.loading;
export const saveTrgGrpRegionLoaded = (state: saveTargetGroupRegion) => state.loaded;
export const saveTrgGrpRegion = (state: saveTargetGroupRegion) => state.message;