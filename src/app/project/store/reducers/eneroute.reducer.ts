// import { Category } from '../../models/project';
import * as fromeneroute from '../actions/eneroute.actions';

interface Cat {
  id: number;
  industry_name: string;
  status: number;
}

export interface enerouteState {
  loading: boolean;
  loaded: boolean;
  message: [''];
}

export const initialState: enerouteState = {
  loading: false,
  loaded: false,
  message: ['']
};

export function reducer(state = initialState, action: fromeneroute.All): enerouteState {
  switch (action.type) {
    case fromeneroute.ENEROUTE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromeneroute.ENEROUTE_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data
      };
    }

    case fromeneroute.ENEROUTE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const enerouteLoading = (state: enerouteState) => state.loading;
export const enerouteLoaded = (state: enerouteState) => state.loaded;
export const eneroute = (state: enerouteState) => state.message;

