import { getFeasibility } from "../../models/project";
import * as fromCreate from "../actions/getFeasibility.action";

interface Create {
  id: number;
  name: string;
}

export interface getfeasibilty {
  loading: boolean;
  loaded: boolean;
  feasibilty: getFeasibility[];
}

export const initialState: getfeasibilty = {
  loading: false,
  loaded: false,
  feasibilty: []
};

export function reducer(
  state = initialState,
  action: fromCreate.All
): getfeasibilty {
  switch (action.type) {
    case fromCreate.FEASIBILITY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCreate.FEASIBILITY_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        feasibilty: data.data.data
      };
    }

    case fromCreate.FEASIBILITY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const locMasterLoading = (state: getfeasibilty) => state.loading;
export const locMasterLoaded = (state: getfeasibilty) => state.loaded;
export const locMaster = (state: getfeasibilty) => state.feasibilty;
