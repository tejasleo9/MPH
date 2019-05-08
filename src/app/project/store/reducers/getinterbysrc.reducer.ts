import { getFeasibility } from "../../models/project";
import * as fromgetinterbysrc from "../actions/getinterbysrc.actions";

interface Create {
  id: number;
  name: string;
}

export interface getinterbysrcState {
  loading: boolean;
  loaded: boolean;
  feasibilty: getFeasibility[];
}

export const initialState: getinterbysrcState = {
  loading: false,
  loaded: false,
  feasibilty: []
};

export function reducer(
  state = initialState,
  action: fromgetinterbysrc.All
): getinterbysrcState {
  switch (action.type) {
    case fromgetinterbysrc.GETINTERBYSRC: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetinterbysrc.GETINTERBYSRC_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        feasibilty: data.data.data
      };
    }

    case fromgetinterbysrc.GETINTERBYSRC_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getinterbysrcLoading = (state: getinterbysrcState) => state.loading;
export const getinterbysrcLoaded = (state: getinterbysrcState) => state.loaded;
export const getinterbysrc = (state: getinterbysrcState) => state.feasibilty;
