import { CreateTgrp } from '../../models/project';
import * as fromupdatetgsrc from '../actions/updatetgsrc.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface updatetgsrcState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: updatetgsrcState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromupdatetgsrc.All): updatetgsrcState {
  switch (action.type) {
    case fromupdatetgsrc.UPDATETGSRC: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromupdatetgsrc.UPDATETGSRC_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromupdatetgsrc.UPDATETGSRC_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const updatetgsrcLoading = (state: updatetgsrcState) => state.loading;
export const updatetgsrcLoaded = (state: updatetgsrcState) => state.loaded;
export const updatetgsrc = (state: updatetgsrcState) => state.message;