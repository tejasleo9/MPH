import * as fromChgTrgSt from '../actions/changetargetgrpst.action';

interface Create {
    id: number,
    name: string,
}

export interface changetggrpStatus {
    loading: boolean;
    loaded: boolean;
    message: [''];
}

export const initialState: changetggrpStatus = {
    loading: false,
    loaded: false,
    message: [''],
}

export function reducer(state = initialState, action: fromChgTrgSt.All): changetggrpStatus {
    switch (action.type) {
        case fromChgTrgSt.CHGTRGPST: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromChgTrgSt.CHGTRGPST_SUCCESS: {
            const data: any = action.payload;
            // console.log(data);
            return {
                ...state,
                loading: false,
                loaded: true,
                message: data.data.data
            };
        }

        case fromChgTrgSt.CHGTRGPST_FAILURE: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }
    return state;
}

export const chgTrgGrpStLoading = (state: changetggrpStatus) => state.loading;
export const chgTrgGrpStLoaded = (state: changetggrpStatus) => state.loaded;
export const chgTrgGrpSt = (state: changetggrpStatus) => state.message;