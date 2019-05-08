import { Category } from '../../models/project';
import * as fromCrexList from '../actions/crexlist.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface CrexListState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: CrexListState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromCrexList.All): CrexListState {
  switch (action.type) {
    case fromCrexList.CREXLIST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCrexList.CREXLIST_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromCrexList.CREXLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getCrexListLoading = (state: CrexListState) => state.loading;
export const getCrexListLoaded = (state: CrexListState) => state.loaded;
export const getCrexList = (state: CrexListState) => state.category;

