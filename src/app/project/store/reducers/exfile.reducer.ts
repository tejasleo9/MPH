import { Category } from '../../models/project';
import * as fromExFile from '../actions/exfile.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface ExFileState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: ExFileState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromExFile.All): ExFileState {
  switch (action.type) {
    case fromExFile.EXFILE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromExFile.EXFILE_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromExFile.EXFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getExFileLoading = (state: ExFileState) => state.loading;
export const getExFileLoaded = (state: ExFileState) => state.loaded;
export const getExFile = (state: ExFileState) => state.category;

