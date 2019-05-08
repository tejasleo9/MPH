import * as fromPanel from '../actions/getpanel.actions';


export interface PanelState {
  loading: boolean;
  loaded: boolean;
  panels: ['']
}

export const initialState: PanelState = {
  loading: false,
  loaded: false,
  panels: ['']
};

export function reducer(state = initialState, action: fromPanel.All): PanelState {
  switch (action.type) {
    case fromPanel.GET_PANELS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromPanel.GET_PANELS_SUCCESS: {
      const data: any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        panels: data.data
      };
    }

    case fromPanel.GET_PANELS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getAllPanelsLoading = (state: PanelState) => state.loading;
export const getAllPanelsLoaded = (state: PanelState) => state.loaded;
export const getAllPanels = (state: PanelState) => state.panels;