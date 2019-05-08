import { getLocMaster } from '../../models/project';
import * as fromCreate from '../actions/extsupstatus.actions';

export interface changeTrgGrpSuppSt {
    loading: boolean;
    loaded: boolean;
    message: [''];
}

export const initialState: changeTrgGrpSuppSt = {
    loading: false,
    loaded: false,
    message: [''],
}

export function reducer(state = initialState, action: fromCreate.All): changeTrgGrpSuppSt {
    switch (action.type) {
        case fromCreate.EXTSUPSTATUS: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromCreate.EXTSUPSTATUS_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                message: data
            };
        }

        case fromCreate.EXTSUPSTATUS_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }

    return state;
}

export const changeTrgGrpSuppStLoading = (state: changeTrgGrpSuppSt) => state.loading;
export const changeTrgGrpSuppStLoaded = (state: changeTrgGrpSuppSt) => state.loaded;
export const changeTrgGrpSuppSt = (state: changeTrgGrpSuppSt) => state.message;