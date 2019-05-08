import { GetSource } from '../../models/project';
import * as fromgettgset from '../actions/gettgset.actions';

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

export interface gettgsetState {
  loading: boolean;
  loaded: boolean;
  source: [''];
}

export const initialState: gettgsetState = {
  loading: false,
  loaded: false,
  source: [''],
}

export function reducer(state = initialState, action: fromgettgset.All): gettgsetState {
  switch (action.type) {
    case fromgettgset.GETTGSET: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgettgset.GETTGSET_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data
      };
    }

    case fromgettgset.GETTGSET_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const gettgsetLoading = (state: gettgsetState) => state.loading;
export const gettgsetLoaded = (state: gettgsetState) => state.loaded;
export const gettgset = (state: gettgsetState) => state.source;