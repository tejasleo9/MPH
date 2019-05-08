import { GetSource } from '../../models/project';
import * as fromgetresstatus from '../actions/getresstatus.action';

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

export interface getresstatusState {
  loading: boolean;
  loaded: boolean;
  qcategory: GetSource[];
}

export const initialState: getresstatusState = {
  loading: false,
  loaded: false,
  qcategory: [],
}

export function reducer(state = initialState, action: fromgetresstatus.All): getresstatusState {
  switch (action.type) {
    case fromgetresstatus.GETRESSTATUS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetresstatus.GETRESSTATUS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        qcategory: data.data.data
      };
    }

    case fromgetresstatus.GETRESSTATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getresstatusLoading = (state: getresstatusState) => state.loading;
export const getresstatusLoaded = (state: getresstatusState) => state.loaded;
export const getresstatus = (state: getresstatusState) => state.qcategory;