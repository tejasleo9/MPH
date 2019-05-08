import { GetSource } from '../../models/project';
import * as fromgettgstats from '../actions/gettgstats.actions';

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

export interface gettgstatsState {
  loading: boolean;
  loaded: boolean;
  source: GetSource[];
}

export const initialState: gettgstatsState = {
  loading: false,
  loaded: false,
  source: [],
}

export function reducer(state = initialState, action: fromgettgstats.All): gettgstatsState {
  switch (action.type) {
    case fromgettgstats.GETTGSTATS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgettgstats.GETTGSTATS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data.data.data
      };
    }

    case fromgettgstats.GETTGSTATS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const gettgstatsLoading = (state: gettgstatsState) => state.loading;
export const gettgstatsLoaded = (state: gettgstatsState) => state.loaded;
export const gettgstats = (state: gettgstatsState) => state.source;