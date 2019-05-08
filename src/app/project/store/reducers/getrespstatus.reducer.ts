import { GetSource } from '../../models/project';
import * as fromgetrespstatus from '../actions/getrespstatus.actions';

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

export interface getrespstatusState {
  loading: boolean;
  loaded: boolean;
  qcategory: GetSource[];
}

export const initialState: getrespstatusState = {
  loading: false,
  loaded: false,
  qcategory: [],
}

export function reducer(state = initialState, action: fromgetrespstatus.All): getrespstatusState {
  switch (action.type) {
    case fromgetrespstatus.GETRESPSTATUS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetrespstatus.GETRESPSTATUS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        qcategory: data.data.data
      };
    }

    case fromgetrespstatus.GETRESPSTATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getrespstatusLoading = (state: getrespstatusState) => state.loading;
export const getrespstatusLoaded = (state: getrespstatusState) => state.loaded;
export const getrespstatus = (state: getrespstatusState) => state.qcategory;