import { Industry } from '../../models/project';
import * as fromIndusty from '../actions/industry.actions';

interface Ind {
	id: number;
	industry_name: string;
	status: number;
}

export interface IndustryState {
  loading: boolean;
  loaded: boolean;
  industry: Industry[];
}

export const initialState: IndustryState = {
  loading: false,
  loaded: false,
  industry: []
};

export function reducer(state = initialState, action: fromIndusty.All): IndustryState {
  switch (action.type) {
    case fromIndusty.INDUSTRY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromIndusty.INDUSTRY_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        industry: data.data
      };
    }

    case fromIndusty.INDUSTRY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getIndustryLoading = (state: IndustryState) => state.loading;
export const getIndustryLoaded = (state: IndustryState) => state.loaded;
export const getIndustry = (state: IndustryState) => state.industry;

