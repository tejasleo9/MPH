import * as fromDelTrgSt from '../actions/deletetrggrp.action';

interface Create {
    id: number,
    name: string,
}

export interface deltggrpStatus {
    loading: boolean;
    loaded: boolean;
    message: [''];
}

export const initialState: deltggrpStatus = {
    loading: false,
    loaded: false,
    message: [''],
}

export function reducer(state = initialState, action: fromDelTrgSt.All): deltggrpStatus {
    switch (action.type) {
        case fromDelTrgSt.DELTRGPST: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromDelTrgSt.DELTRGPST_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                message: data.data.data
            };
        }

        case fromDelTrgSt.DELTRGPST_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }
    return state;
}

export const delTrgGrpStLoading = (state: deltggrpStatus) => state.loading;
export const delTrgGrpStLoaded = (state: deltggrpStatus) => state.loaded;
export const delTrgGrp = (state: deltggrpStatus) => state.message;