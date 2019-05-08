import { CreateTgrp } from '../../models/project';
import * as fromsetremind from '../actions/setremind.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface setremindState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: setremindState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromsetremind.All): setremindState {
  switch (action.type) {
    case fromsetremind.SETREMIND: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromsetremind.SETREMIND_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromsetremind.SETREMIND_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const setremindLoading = (state: setremindState) => state.loading;
export const setremindLoaded = (state: setremindState) => state.loaded;
export const setremind = (state: setremindState) => state.message;