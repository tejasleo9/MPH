import { Category } from '../../models/project';
import * as fromgetcomstats from '../actions/getcomstats.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface getcomstatsState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: getcomstatsState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromgetcomstats.All): getcomstatsState {
  switch (action.type) {
    case fromgetcomstats.GETPROCOMSTATS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetcomstats.GETPROCOMSTATS_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromgetcomstats.GETPROCOMSTATS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getcomstatsLoading = (state: getcomstatsState) => state.loading;
export const getcomstatsLoaded = (state: getcomstatsState) => state.loaded;
export const getcomstats = (state: getcomstatsState) => state.category;

