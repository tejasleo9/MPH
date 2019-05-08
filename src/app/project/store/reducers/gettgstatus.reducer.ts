import { GetSource } from '../../models/project';
import * as fromgettgstatus from '../actions/gettgstatus.actions';

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

export interface gettgstatusState {
  loading: boolean;
  loaded: boolean;
  source: GetSource[];
}

export const initialState: gettgstatusState = {
  loading: false,
  loaded: false,
  source: [],
}

export function reducer(state = initialState, action: fromgettgstatus.All): gettgstatusState {
  switch (action.type) {
    case fromgettgstatus.GETTGSTATUS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgettgstatus.GETTGSTATUS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data.data.data
      };
    }

    case fromgettgstatus.GETTGSTATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const gettgstatusLoading = (state: gettgstatusState) => state.loading;
export const gettgstatusLoaded = (state: gettgstatusState) => state.loaded;
export const gettgstatus = (state: gettgstatusState) => state.source;