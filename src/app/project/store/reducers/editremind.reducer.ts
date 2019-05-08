import { Category } from '../../models/project';
import * as fromeditremind from '../actions/editremind.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface editremindState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: editremindState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromeditremind.All): editremindState {
  switch (action.type) {
    case fromeditremind.EDITREMIND: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromeditremind.EDITREMIND_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromeditremind.EDITREMIND_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const editremindLoading = (state: editremindState) => state.loading;
export const editremindLoaded = (state: editremindState) => state.loaded;
export const editremind = (state: editremindState) => state.category;

