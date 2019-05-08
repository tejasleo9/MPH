import { Category, getExlList } from "../../models/project";
import * as fromgetexlist from "../actions/getexlist.actions";
export interface getexlistState {
  loading: boolean;
  loaded: boolean;
  exlist: getExlList[];
}

export const initialState: getexlistState = {
  loading: false,
  loaded: false,
  exlist: []
};

export function reducer(
  state = initialState,
  action: fromgetexlist.All
): getexlistState {
  switch (action.type) {
    case fromgetexlist.GETEXLIST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetexlist.GETEXLIST_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        exlist: data
      };
    }

    case fromgetexlist.GETEXLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}
export const getexlistLoading = (state: getexlistState) => state.loading;
export const getexlistLoaded = (state: getexlistState) => state.loaded;
export const getexlist = (state: getexlistState) => state.exlist;
