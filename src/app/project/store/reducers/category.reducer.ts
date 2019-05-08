import { Category } from '../../models/project';
import * as fromCategory from '../actions/industry.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface CategoryState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: CategoryState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromCategory.All): CategoryState {
  switch (action.type) {
    case fromCategory.CATEGORY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCategory.CATEGORY_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromCategory.CATEGORY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getCategoryLoading = (state: CategoryState) => state.loading;
export const getCategoryLoaded = (state: CategoryState) => state.loaded;
export const getCategory = (state: CategoryState) => state.category;

