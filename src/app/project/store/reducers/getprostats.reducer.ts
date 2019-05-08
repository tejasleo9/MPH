import { getFeasibility } from "../../models/project";
import * as fromgetprostats from "../actions/getprostats.actions";

interface Create {
  id: number;
  name: string;
}

export interface getprostatsState {
  loading: boolean;
  loaded: boolean;
  prodetails: any;
}

export const initialState: getprostatsState = {
  loading: false,
  loaded: false,
  prodetails: []
};

export function reducer(
  state = initialState,
  action: fromgetprostats.All
): getprostatsState {
  switch (action.type) {
    case fromgetprostats.GETPROSTATS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetprostats.GETPROSTATS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        prodetails: data.data
      };
    }

    case fromgetprostats.GETPROSTATS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getprostatsLoading = (state: getprostatsState) => state.loading;
export const getprostatsLoaded = (state: getprostatsState) => state.loaded;
export const getprostats = (state: getprostatsState) => state.prodetails;
