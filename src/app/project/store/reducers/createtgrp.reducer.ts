import { CreateTgrp } from '../../models/project';
import * as fromCreate from '../actions/createtgrp.actions';

interface Create {
  name: string,
  country_id: number,
  estimated_ir: number,
  estimated_loi: number,
  completes_required: number,
  min_age: number,
  max_age: number,
  gender: number,
  project_id: number
}

export interface CreateState {
  loading: boolean;
  loaded: boolean;
  creategrp: CreateTgrp[];
}

export const initialState: CreateState = {
  loading: false,
  loaded: false,
  creategrp: [],
}

export function reducer(state = initialState, action: fromCreate.All): CreateState {
  switch (action.type) {
    case fromCreate.CREATE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCreate.CREATE_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        creategrp: data.data
      };
    }

    case fromCreate.CREATE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const createTgroupLoading = (state: CreateState) => state.loading;
export const createTgroupLoaded = (state: CreateState) => state.loaded;
export const createTgroup = (state: CreateState) => state.creategrp;