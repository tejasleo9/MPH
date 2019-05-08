import { Category } from '../../models/project';
import * as fromAddExtSup from '../actions/addextsup.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface fromAddExtSupState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: fromAddExtSupState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromAddExtSup.All): fromAddExtSupState {
  switch (action.type) {
    case fromAddExtSup.ADDEXTSUP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromAddExtSup.ADDEXTSUP_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromAddExtSup.ADDEXTSUP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const addExpSupLoading = (state: fromAddExtSupState) => state.loading;
export const addExpSupLoaded = (state: fromAddExtSupState) => state.loaded;
export const addExpSup = (state: fromAddExtSupState) => state.category;

