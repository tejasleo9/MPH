import { Category } from '../../models/project';
import * as fromgetcountresp from '../actions/getcountresp.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface getcountrespState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: getcountrespState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromgetcountresp.All): getcountrespState {
  switch (action.type) {
    case fromgetcountresp.GETCOUNTRESP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetcountresp.GETCOUNTRESP_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromgetcountresp.GETCOUNTRESP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getcountrespLoading = (state: getcountrespState) => state.loading;
export const getcountrespLoaded = (state: getcountrespState) => state.loaded;
export const getcountresp = (state: getcountrespState) => state.category;

