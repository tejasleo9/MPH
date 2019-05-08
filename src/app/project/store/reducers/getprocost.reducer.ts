import { getFeasibility } from "../../models/project";
import * as fromgetprocost from "../actions/getprocost.actions";

interface Create {
  id: number;
  name: string;
}

export interface getprocostState {
  loading: boolean;
  loaded: boolean;
  feasibilty: getFeasibility[];
}

export const initialState: getprocostState = {
  loading: false,
  loaded: false,
  feasibilty: []
};

export function reducer(
  state = initialState,
  action: fromgetprocost.All
): getprocostState {
  switch (action.type) {
    case fromgetprocost.GETPROCOST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetprocost.GETPROCOST_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        feasibilty: data.data.data
      };
    }

    case fromgetprocost.GETPROCOST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getprocostLoading = (state: getprocostState) => state.loading;
export const getprocostLoaded = (state: getprocostState) => state.loaded;
export const getprocost = (state: getprocostState) => state.feasibilty;
