import { CreateTgrp } from '../../models/project';
import * as fromTgset from '../actions/updatetgset.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface UpdateTGSetState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: UpdateTGSetState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromTgset.All): UpdateTGSetState {
  switch (action.type) {
    case fromTgset.UPDATETGSET: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromTgset.UPDATETGSET_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromTgset.UPDATETGSET_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const updateTgSetLoading = (state: UpdateTGSetState) => state.loading;
export const updateTgSetLoaded = (state: UpdateTGSetState) => state.loaded;
export const updateTgSet = (state: UpdateTGSetState) => state.message;