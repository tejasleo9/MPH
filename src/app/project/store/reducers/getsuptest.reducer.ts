import { GetSource } from '../../models/project';
import * as fromgetsuptest from '../actions/getsuptest.actions';

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

export interface getsuptestState {
  loading: boolean;
  loaded: boolean;
  source: GetSource[];
}

export const initialState: getsuptestState = {
  loading: false,
  loaded: false,
  source: [],
}

export function reducer(state = initialState, action: fromgetsuptest.All): getsuptestState {
  switch (action.type) {
    case fromgetsuptest.GETSUPTEST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetsuptest.GETSUPTEST_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data.data.data
      };
    }

    case fromgetsuptest.GETSUPTEST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getsuptestLoading = (state: getsuptestState) => state.loading;
export const getsuptestLoaded = (state: getsuptestState) => state.loaded;
export const getsuptest = (state: getsuptestState) => state.source;