import { Category } from '../../models/project';
import * as fromeditextsup from '../actions/editextsup.actions';

interface Cat {
	id: number;
	industry_name: string;
	status: number;
}

export interface editextsupState {
  loading: boolean;
  loaded: boolean;
  category: Category[];
}

export const initialState: editextsupState = {
  loading: false,
  loaded: false,
  category: []
};

export function reducer(state = initialState, action: fromeditextsup.All): editextsupState {
  switch (action.type) {
    case fromeditextsup.EDITEXTSUP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromeditextsup.EDITEXTSUP_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        category: data.data
      };
    }

    case fromeditextsup.EDITEXTSUP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const editextsupLoading = (state: editextsupState) => state.loading;
export const editextsupLoaded = (state: editextsupState) => state.loaded;
export const editextsup = (state: editextsupState) => state.category;

