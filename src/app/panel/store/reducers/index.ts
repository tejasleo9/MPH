import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPanel from './getpanel.reducer';

export interface PanelsState {
    panels: fromPanel.PanelState
}

export const reducers: ActionReducerMap<PanelsState> = {
    panels: fromPanel.reducer
}

export const getPanelsState = createFeatureSelector<PanelsState>('panels');

export const getPanellState = createSelector( getPanelsState, (state: PanelsState) => state.panels );

export const getAllPanels = createSelector(getPanellState, fromPanel.getAllPanels);
export const getAllPanelsLoaded = createSelector(getPanellState, fromPanel.getAllPanelsLoaded);
export const getAllPanelsLoading = createSelector(getPanellState, fromPanel.getAllPanelsLoading);
