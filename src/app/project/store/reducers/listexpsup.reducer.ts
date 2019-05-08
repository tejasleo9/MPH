import * as fromlistexpsup from "../actions/listexpsup.actions";

interface Ind {
  id: number;
  industry_name: string;
  status: number;
}

export interface listexpsupState {
  loading: boolean;
  loaded: boolean;
  exsup: [""];
}

export const initialState: listexpsupState = {
  loading: false,
  loaded: false,
  exsup: [""]
};

export function reducer(
  state = initialState,
  action: fromlistexpsup.All
): listexpsupState {
  switch (action.type) {
    case fromlistexpsup.LISTEXTSUP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromlistexpsup.LISTEXTSUP_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        exsup: data.data
      };
    }

    case fromlistexpsup.LISTEXTSUP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromlistexpsup.RESET: {
      return Object.assign({}, initialState);
    }
  }

  return state;
}

export const listexpsupLoading = (state: listexpsupState) => state.loading;
export const listexpsupLoaded = (state: listexpsupState) => state.loaded;
export const listexpsup = (state: listexpsupState) => state.exsup;
