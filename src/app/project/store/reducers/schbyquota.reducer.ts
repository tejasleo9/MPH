import { CreateTgrp } from '../../models/project';
import * as fromschbyquota from '../actions/schbyquota.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface schbyquotaState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: schbyquotaState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromschbyquota.All): schbyquotaState {
  switch (action.type) {
    case fromschbyquota.SCHBYQUOTA: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromschbyquota.SCHBYQUOTA_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromschbyquota.SCHBYQUOTA_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const schbyquotaLoading = (state: schbyquotaState) => state.loading;
export const schbyquotaLoaded = (state: schbyquotaState) => state.loaded;
export const schbyquota = (state: schbyquotaState) => state.message;