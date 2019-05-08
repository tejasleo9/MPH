import { Category } from '../../models/project';
import * as fromdeltgquota from '../actions/deltgquota.actions';

interface Cat {
  id: number;
  industry_name: string;
  status: number;
}

export interface DelTgQuotaState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: DelTgQuotaState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromdeltgquota.All): DelTgQuotaState {
  switch (action.type) {
    case fromdeltgquota.DELTGQUOTA: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromdeltgquota.DELTGQUOTA_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromdeltgquota.DELTGQUOTA_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const deltgquotaLoading = (state: DelTgQuotaState) => state.loading;
export const deltgquotaLoaded = (state: DelTgQuotaState) => state.loaded;
export const deltgquota = (state: DelTgQuotaState) => state.category;

