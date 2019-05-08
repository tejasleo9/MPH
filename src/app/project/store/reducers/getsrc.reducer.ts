import { GetSource } from '../../models/project';
import * as fromSrc from '../actions/getsrc.actions';

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

export interface getsState {
  loading: boolean;
  loaded: boolean;
  source: GetSource[];
}

export const initialState: getsState = {
  loading: false,
  loaded: false,
  source: [],
}

export function reducer(state = initialState, action: fromSrc.All): getsState {
  switch (action.type) {
    case fromSrc.GETSGET: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromSrc.GETSGET_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data.data.data
      };
    }

    case fromSrc.GETSGET_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getscallLoading = (state: getsState) => state.loading;
export const getscallLoaded = (state: getsState) => state.loaded;
export const getscall = (state: getsState) => state.source;