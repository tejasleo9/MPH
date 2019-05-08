import { CreateTgrp } from '../../models/project';
import * as fromshowrespfile from '../actions/showrespfile.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface showrespfileState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: showrespfileState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromshowrespfile.All): showrespfileState {
  switch (action.type) {
    case fromshowrespfile.SHOWRESPFILE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromshowrespfile.SHOWRESPFILE_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromshowrespfile.SHOWRESPFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const showrespfileLoading = (state: showrespfileState) => state.loading;
export const showrespfileLoaded = (state: showrespfileState) => state.loaded;
export const showrespfile = (state: showrespfileState) => state.message;