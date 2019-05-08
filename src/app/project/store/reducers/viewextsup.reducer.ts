import { CreateTgrp } from '../../models/project';
import * as fromviewextsup from '../actions/viewextsup.actions';

interface UpdateSet {
    is_tablet_accessible:number,
    is_mobile_accessible: number,
    is_desktop_accessible: number,
    is_multi_attempt_enabled: number,
    is_geo_ip_enabled: number,
    is_ip_duplication_enabled: number,
    is_global_supplier_allowed: number
}

export interface viewextsupState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: viewextsupState = {
  loading: false,
  loaded: false,
  message: '',
}

export function reducer(state = initialState, action: fromviewextsup.All): viewextsupState {
  switch (action.type) {
    case fromviewextsup.VIEWEXTSUP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromviewextsup.VIEWEXTSUP_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromviewextsup.VIEWEXTSUP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const viewextsupLoading = (state: viewextsupState) => state.loading;
export const viewextsupLoaded = (state: viewextsupState) => state.loaded;
export const viewextsup = (state: viewextsupState) => state.message;