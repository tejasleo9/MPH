import { GetSource } from '../../models/project';
import * as fromQcat from '../actions/getqcat.actions';

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

export interface getQcatState {
  loading: boolean;
  loaded: boolean;
  qcategory: GetSource[];
}

export const initialState: getQcatState = {
  loading: false,
  loaded: false,
  qcategory: [],
}

export function reducer(state = initialState, action: fromQcat.All): getQcatState {
  switch (action.type) {
    case fromQcat.GETQCAT: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromQcat.GETQCAT_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        qcategory: Object.values(data.data)[0]['categories']
      };
    }

    case fromQcat.GETQCAT_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getqcatLoading = (state: getQcatState) => state.loading;
export const getqcatLoaded = (state: getQcatState) => state.loaded;
export const getqcat = (state: getQcatState) => state.qcategory;