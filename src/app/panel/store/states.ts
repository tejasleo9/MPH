import * as panels from './reducers';

export interface AppState {
    panels: any;
}

export const reducers = {
    panels: panels.reducers,
};