import { getFeasibility } from "../../models/project";
import * as fromgetprorepfile from "../actions/getprorepfile.actions";

interface Create {
  id: number;
  name: string;
}

export interface getprorepfileState {
  loading: boolean;
  loaded: boolean;
  proquestions: getFeasibility[];
}

export const initialState: getprorepfileState = {
  loading: false,
  loaded: false,
  proquestions: []
};

export function reducer(
  state = initialState,
  action: fromgetprorepfile.All
): getprorepfileState {
  switch (action.type) {
    case fromgetprorepfile.GETPROREPORTFILE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetprorepfile.GETPROREPORTFILE_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        proquestions: data.data.data
      };
    }

    case fromgetprorepfile.GETPROREPORTFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getprorepfileLoading = (state: getprorepfileState) => state.loading;
export const getprorepfileLoaded = (state: getprorepfileState) => state.loaded;
export const getprorepfile = (state: getprorepfileState) => state.proquestions;
