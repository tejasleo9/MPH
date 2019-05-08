import { Category } from '../../models/project';
import * as fromdisroute from '../actions/disroute.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface disrouteState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: disrouteState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromdisroute.All): disrouteState {
  switch (action.type) {
    case fromdisroute.DISROUTE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromdisroute.DISROUTE_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromdisroute.DISROUTE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const disrouteLoading = (state: disrouteState) => state.loading;
export const disrouteLoaded = (state: disrouteState) => state.loaded;
export const disroute = (state: disrouteState) => state.category;

