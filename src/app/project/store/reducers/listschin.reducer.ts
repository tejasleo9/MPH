import { Industry } from '../../models/project';
import * as fromlistschin from '../actions/listschin.actions';

interface Ind {
  id: number;
  industry_name: string;
  status: number;
}

export interface listschinState {
  loading: boolean;
  loaded: boolean;
  schedule: [''];
}

export const initialState: listschinState = {
  loading: false,
  loaded: false,
  schedule: ['']
};

export function reducer(state = initialState, action: fromlistschin.All): listschinState {
  switch (action.type) {
    case fromlistschin.LISTSCHIN: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromlistschin.LISTSCHIN_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        schedule: data
      };
    }

    case fromlistschin.LISTSCHIN_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const listschinLoading = (state: listschinState) => state.loading;
export const listschinLoaded = (state: listschinState) => state.loaded;
export const listschin = (state: listschinState) => state.schedule;

