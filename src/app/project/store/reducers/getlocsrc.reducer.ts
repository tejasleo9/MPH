import { getFeasibility } from "../../models/project";
import * as fromgetlocsrc from "../actions/getlocsrc.actions";

interface Create {
  id: number;
  name: string;
}

export interface getlocsrcState {
  loading: boolean;
  loaded: boolean;
  feasibilty: getFeasibility[];
}

export const initialState: getlocsrcState = {
  loading: false,
  loaded: false,
  feasibilty: []
};

export function reducer(
  state = initialState,
  action: fromgetlocsrc.All
): getlocsrcState {
  switch (action.type) {
    case fromgetlocsrc.GETLOCKSRC: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromgetlocsrc.GETLOCKSRC_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        feasibilty: data.data.data
      };
    }

    case fromgetlocsrc.GETLOCKSRC_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getlocsrcLoading = (state: getlocsrcState) => state.loading;
export const getlocsrcLoaded = (state: getlocsrcState) => state.loaded;
export const getlocsrc = (state: getlocsrcState) => state.feasibilty;
