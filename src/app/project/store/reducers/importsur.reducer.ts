import { GetSource } from '../../models/project';
import * as fromimportsur from '../actions/importsur.actions';

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

export interface importsurState {
  loading: boolean;
  loaded: boolean;
  source: GetSource[];
}

export const initialState: importsurState = {
  loading: false,
  loaded: false,
  source: [],
}

export function reducer(state = initialState, action: fromimportsur.All): importsurState {
  switch (action.type) {
    case fromimportsur.IMPORTSURVEY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromimportsur.IMPORTSURVEY_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        source: data
      };
    }

    case fromimportsur.IMPORTSURVEY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const importsurLoading = (state: importsurState) => state.loading;
export const importsurLoaded = (state: importsurState) => state.loaded;
export const importsur = (state: importsurState) => state.source;