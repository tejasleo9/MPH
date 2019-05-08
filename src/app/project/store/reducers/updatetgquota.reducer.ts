import { CreateTgrp } from '../../models/project';
import * as fromupdatetgquota from '../actions/updatetgquota.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface updatetgquotaState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: updatetgquotaState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromupdatetgquota.All): updatetgquotaState {
  switch (action.type) {
    case fromupdatetgquota.UPDATETGQUOTA: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromupdatetgquota.UPDATETGQUOTA_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromupdatetgquota.UPDATETGQUOTA_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const updatetgquotaLoading = (state: updatetgquotaState) => state.loading;
export const updatetgquotaLoaded = (state: updatetgquotaState) => state.loaded;
export const updatetgquota = (state: updatetgquotaState) => state.message;