import { Category } from '../../models/project';
import * as fromDelList from '../actions/delexlist.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface DelExListState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: DelExListState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromDelList.All): DelExListState {
  switch (action.type) {
    case fromDelList.DELEXLIST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromDelList.DELEXLIST_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromDelList.DELEXLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const delExListLoading = (state: DelExListState) => state.loading;
export const delExListLoaded = (state: DelExListState) => state.loaded;
export const delExList = (state: DelExListState) => state.category;

