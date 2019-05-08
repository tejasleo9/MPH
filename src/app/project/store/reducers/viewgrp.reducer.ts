import { ViewTargetGroup } from '../../models/project';
import * as fromViewGrp from '../actions/viewgrp.actions';

interface viewGrp {
    target_group_id: number,
    name: string,
    estimated_ir: number,
    estimated_loi: number,
    actual_ir: number,
    actual_loi: number,
    completes_required: number,
    project_id:number,
    min_age: number,
    max_age: number,
    sources: ['']
}

export interface viewGState {
  loading: boolean;
  loaded: boolean;
  viewgrpdata: ViewTargetGroup[];
}

export const initialState: viewGState = {
  loading: false,
  loaded: false,
  viewgrpdata:[],
}

export function reducer(state = initialState, action: fromViewGrp.All): viewGState {
  switch (action.type) {
    case fromViewGrp.VIEWGRP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromViewGrp.VIEWGRP_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        viewgrpdata: data.data
      };
    }

    case fromViewGrp.VIEWGRP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const viewgrpcallLoading = (state: viewGState) => state.loading;
export const viewgrpcallLoaded = (state: viewGState) => state.loaded;
export const viewgrpcall = (state: viewGState) => state.viewgrpdata;