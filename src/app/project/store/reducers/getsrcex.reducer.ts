import { GetSource } from '../../models/project';
import * as fromgetsrcex from '../actions/getsrcex.actions';

interface gets {
  country_id: number,
  estimated_ir: number,
  estimated_loi: number,
  completes_required: number,
  min_age: number,
  max_age: number,
  gender: number,
  project_id: number
}

export interface getsrcexState {
  loading: boolean;
  loaded: boolean;
  source: GetSource[];
}

export const initialState: getsrcexState = {
  loading: false,
  loaded: false,
  source: [],
}

export function reducer(state = initialState, action: fromgetsrcex.All): getsrcexState {
  switch (action.type) {
    case fromgetsrcex.GETSRCEX: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetsrcex.GETSRCEX_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data.data.data
      };
    }

    case fromgetsrcex.GETSRCEX_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getsrcexLoading = (state: getsrcexState) => state.loading;
export const getsrcexLoaded = (state: getsrcexState) => state.loaded;
export const getsrcex = (state: getsrcexState) => state.source;