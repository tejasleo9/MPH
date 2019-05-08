import { getFeasibility } from "../../models/project";
import * as fromgetinexsrc from "../actions/getinexsrc.actions";

interface Create {
  id: number;
  name: string;
}

export interface getinexsrcState {
  loading: boolean;
  loaded: boolean;
  feasibilty: getFeasibility[];
}

export const initialState: getinexsrcState = {
  loading: false,
  loaded: false,
  feasibilty: []
};

export function reducer(
  state = initialState,
  action: fromgetinexsrc.All
): getinexsrcState {
  switch (action.type) {
    case fromgetinexsrc.GETINEXSRC: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetinexsrc.GETINEXSRC_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        feasibilty: data.data.data
      };
    }

    case fromgetinexsrc.GETINEXSRC_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getinexsrcLoading = (state: getinexsrcState) => state.loading;
export const getinexsrcLoaded = (state: getinexsrcState) => state.loaded;
export const getinexsrc = (state: getinexsrcState) => state.feasibilty;
