import { GetSource } from '../../models/project';
import * as fromgetrespreport from '../actions/getrespreport.actions';

interface Qcat {
  country_id: number,
  estimated_ir: number,
  estimated_loi: number,
  completes_required: number,
  min_age: number,
  max_age: number,
  gender: number,
  project_id: number
}

export interface getrespreportState {
  loading: boolean;
  loaded: boolean;
  qcategory: GetSource[];
}

export const initialState: getrespreportState = {
  loading: false,
  loaded: false,
  qcategory: [],
}

export function reducer(state = initialState, action: fromgetrespreport.All): getrespreportState {
  switch (action.type) {
    case fromgetrespreport.GETRESPREPORT: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetrespreport.GETRESPREPORT_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        qcategory: data.data.data
      };
    }

    case fromgetrespreport.GETRESPREPORT_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getrespreportLoading = (state: getrespreportState) => state.loading;
export const getrespreportLoaded = (state: getrespreportState) => state.loaded;
export const getrespreport = (state: getrespreportState) => state.qcategory;