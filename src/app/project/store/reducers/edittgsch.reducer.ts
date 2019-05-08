import { Category } from '../../models/project';
import * as fromedittgsch from '../actions/edittgsch.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface edittgschState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: edittgschState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromedittgsch.All): edittgschState {
  switch (action.type) {
    case fromedittgsch.EDITTGSCH: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromedittgsch.EDITTGSCH_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromedittgsch.EDITTGSCH_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const edittgschLoading = (state: edittgschState) => state.loading;
export const edittgschLoaded = (state: edittgschState) => state.loaded;
export const edittgsch = (state: edittgschState) => state.category;

