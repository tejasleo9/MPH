import { Category } from '../../models/project';
import * as fromextsupstatus from '../actions/extsupstatus.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface extsupstatusState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: extsupstatusState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromextsupstatus.All): extsupstatusState {
  switch (action.type) {
    case fromextsupstatus.EXTSUPSTATUS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromextsupstatus.EXTSUPSTATUS_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromextsupstatus.EXTSUPSTATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const extsupstatusLoading = (state: extsupstatusState) => state.loading;
export const extsupstatusLoaded = (state: extsupstatusState) => state.loaded;
export const extsupstatus = (state: extsupstatusState) => state.category;

