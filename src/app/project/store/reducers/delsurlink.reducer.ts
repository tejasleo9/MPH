import { Category } from '../../models/project';
import * as fromDelSurLink from '../actions/delsurlink.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface DelSurLinkState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: DelSurLinkState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromDelSurLink.All): DelSurLinkState {
  switch (action.type) {
    case fromDelSurLink.DELSURLINKS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromDelSurLink.DELSURLINKS_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromDelSurLink.DELSURLINKS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const delSurLinkLoading = (state: DelSurLinkState) => state.loading;
export const delSurLinkLoaded = (state: DelSurLinkState) => state.loaded;
export const delSurLink = (state: DelSurLinkState) => state.category;

