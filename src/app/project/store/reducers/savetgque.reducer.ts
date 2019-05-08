import { CreateTgrp } from '../../models/project';
import * as fromSaveQue from '../actions/savetgque.actions';

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

export function reducer(state = initialState, action: fromSaveQue.All): UpdateTGSetState {
  switch (action.type) {
    case fromSaveQue.SAVETGQUE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromSaveQue.SAVETGQUE_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.data
      };
    }

    case fromSaveQue.SAVETGQUE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const saveTgQueLoading = (state: UpdateTGSetState) => state.loading;
export const saveTgQueLoaded = (state: UpdateTGSetState) => state.loaded;
export const saveTgQue = (state: UpdateTGSetState) => state.message;