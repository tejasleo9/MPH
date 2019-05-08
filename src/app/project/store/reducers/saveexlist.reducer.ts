import { getLocValue } from "../../models/project";
import * as fromsaveexlist from "../actions/saveexlist.actions";

interface Create {
  id: number;
  name: string;
}

export interface saveexlistState {
  loading: boolean;
  loaded: boolean;
  message: [''];
}

export const initialState: saveexlistState = {
  loading: false,
  loaded: false,
  message: ['']
};

export function reducer(
  state = initialState,
  action: fromsaveexlist.All
): saveexlistState {
  switch (action.type) {
    case fromsaveexlist.SAVEEXLIST: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromsaveexlist.SAVEEXLIST_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data
      };
    }

    case fromsaveexlist.SAVEEXLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const saveexlistLoading = (state: saveexlistState) => state.loading;
export const saveexlistLoaded = (state: saveexlistState) => state.loaded;
export const saveexlist = (state: saveexlistState) => state.message;
