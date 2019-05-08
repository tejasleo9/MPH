import { CreateTgrp } from '../../models/project';
import * as fromsavetgstatus from '../actions/savetgstatus.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface savetgstatusState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: savetgstatusState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromsavetgstatus.All): savetgstatusState {
  switch (action.type) {
    case fromsavetgstatus.SAVETGSTATUS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromsavetgstatus.SAVETGSTATUS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromsavetgstatus.SAVETGSTATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const savetgstatusLoading = (state: savetgstatusState) => state.loading;
export const savetgstatusLoaded = (state: savetgstatusState) => state.loaded;
export const savetgstatus = (state: savetgstatusState) => state.message;