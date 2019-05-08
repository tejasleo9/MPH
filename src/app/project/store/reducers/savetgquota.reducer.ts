import { CreateTgrp } from '../../models/project';
import * as fromsavetgquota from '../actions/savetgquota.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface savetgquotaState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: savetgquotaState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromsavetgquota.All): savetgquotaState {
  switch (action.type) {
    case fromsavetgquota.SAVETGQUOTA: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromsavetgquota.SAVETGQUOTA_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromsavetgquota.SAVETGQUOTA_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const savetgquotaLoading = (state: savetgquotaState) => state.loading;
export const savetgquotaLoaded = (state: savetgquotaState) => state.loaded;
export const savetgquota = (state: savetgquotaState) => state.message;