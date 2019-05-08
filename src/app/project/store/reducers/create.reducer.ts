import { CreatePro } from '../../models/project';
import * as fromCreate from '../actions/create.actions';

interface CrePro {
	name: string;
	research_category_id: string;
	research_industry_id: string;
	company_id: string;
	end_page_url_type:number;
	created_by: string;
	created_at: string;
	id: number;
}

export interface CreateProjectState {
  loading: boolean;
  loaded: boolean;
  createPro: CrePro;
}

export const initialState: CreateProjectState = {
  loading: false,
  loaded: false,
  createPro: {
    name: "name",
	research_category_id: "research_category_id",
	research_industry_id: "research_industry_id",
	company_id: "company_id",
	end_page_url_type:1,
	created_by: "created_by",
	created_at: "created_at",
	id: 1
  }
};

export function reducer(state = initialState, action: fromCreate.All): CreateProjectState {
  switch (action.type) {
    case fromCreate.CREATEPRO: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCreate.CREATEPRO_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        createPro: data.data.name
      };
    }

    case fromCreate.CREATEPRO_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const createProjectLoading = (state: CreateProjectState) => state.loading;
export const createProjectLoaded = (state: CreateProjectState) => state.loaded;
export const createProject = (state: CreateProjectState) => state.createPro;

