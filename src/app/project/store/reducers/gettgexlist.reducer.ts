import { GetSource, getExlList } from "../../models/project";
import * as fromgettgexlist from "../actions/gettgexlist.actions";
export interface gettgexlistState {
  loading: boolean;
  loaded: boolean;
  exList: [''];
}

export const initialState: gettgexlistState = {
  loading: false,
  loaded: false,
  exList: ['']
};

export function reducer(
  state = initialState,
  action: fromgettgexlist.All
): gettgexlistState {
  switch (action.type) {
    case fromgettgexlist.GETTGEXLIST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgettgexlist.GETTGEXLIST_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        exList: data
      };
    }

    case fromgettgexlist.GETTGEXLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}
export const gettgexlists = (state: gettgexlistState) => state.exList;
export const gettgexlistLoading = (state: gettgexlistState) => state.loading;
export const gettgexlistLoaded = (state: gettgexlistState) => state.loaded;
