import { getFeasibility } from "../../models/project";
import * as fromProQue from "../actions/getproque.actions";

interface Create {
  id: number;
  name: string;
}

export interface getproquestions {
  loading: boolean;
  loaded: boolean;
  proquestions: getFeasibility[];
}

export const initialState: getproquestions = {
  loading: false,
  loaded: false,
  proquestions: []
};

export function reducer(
  state = initialState,
  action: fromProQue.All
): getproquestions {
  switch (action.type) {
    case fromProQue.GETPROQ: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromProQue.GETPROQ_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        proquestions: data.data
      };
    }

    case fromProQue.GETPROQ_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getProQueLoading = (state: getproquestions) => state.loading;
export const getProQueLoaded = (state: getproquestions) => state.loaded;
export const getProQue = (state: getproquestions) => state.proquestions;
