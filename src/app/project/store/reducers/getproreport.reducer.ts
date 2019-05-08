import { getFeasibility } from "../../models/project";
import * as fromgetproreport from "../actions/getproreport.actions";

interface Create {
  id: number;
  name: string;
}

export interface getproreportState {
  loading: boolean;
  loaded: boolean;
  proquestions: getFeasibility[];
}

export const initialState: getproreportState = {
  loading: false,
  loaded: false,
  proquestions: []
};

export function reducer(
  state = initialState,
  action: fromgetproreport.All
): getproreportState {
  switch (action.type) {
    case fromgetproreport.GETPROREPORT: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetproreport.GETPROREPORT_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        proquestions: data.data.data
      };
    }

    case fromgetproreport.GETPROREPORT_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getproreportLoading = (state: getproreportState) => state.loading;
export const getproreportLoaded = (state: getproreportState) => state.loaded;
export const getproreport = (state: getproreportState) => state.proquestions;
