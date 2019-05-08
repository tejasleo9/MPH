import { getFeasibility } from "../../models/project";
import * as fromgetinterquota from "../actions/getinterquota.actions";

interface Create {
  id: number;
  name: string;
}

export interface getinterquotaState {
  loading: boolean;
  loaded: boolean;
  quotas: [''];
}

export const initialState: getinterquotaState = {
  loading: false,
  loaded: false,
  quotas: ['']
};

export function reducer(
  state = initialState,
  action: fromgetinterquota.All
): getinterquotaState {
  switch (action.type) {
    case fromgetinterquota.GETINTERQUOTA: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetinterquota.GETINTERQUOTA_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        quotas: data
      };
    }

    case fromgetinterquota.GETINTERQUOTA_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getinterquotaLoading = (state: getinterquotaState) => state.loading;
export const getinterquotaLoaded = (state: getinterquotaState) => state.loaded;
export const getinterquota = (state: getinterquotaState) => state.quotas;
