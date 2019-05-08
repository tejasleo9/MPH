import { Project,DelPro } from '../../models/project';
import * as fromProject from '../actions/project.actions';

interface Pro {
	id: number;
	name: string;
	start_date: string;
	completes_required: number;
	company_id: number;
	status: number;
}

export interface ProjectState {
  loading: boolean;
  loaded: boolean;
  projects: Project[];
}

export const initialState: ProjectState = {
  loading: false,
  loaded: false,
  projects: []
};

export function reducer(state = initialState, action: fromProject.All): ProjectState {
  switch (action.type) {
    case fromProject.PROJECTS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromProject.PROJECTS_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        projects: data
      };
    }

    case fromProject.PROJECTS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getProjectsLoading = (state: ProjectState) => state.loading;
export const getProjectsLoaded = (state: ProjectState) => state.loaded;
export const getProjects = (state: ProjectState) => state.projects;

// Delete Project

interface Del {
	message:string
}

export interface DelProjectState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialDelState: DelProjectState = {
  loading: false,
  loaded: false,
  message: ''
};

export function delreducer(state = initialDelState, action: fromProject.All): DelProjectState {
  switch (action.type) {
    case fromProject.DELETE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromProject.DELETE_SUCCESS: {
      const data:any = action.payload;
      // console.log(data);
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data
      };
    }

    case fromProject.DELETE_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const deleteProjectLoading = (state: DelProjectState) => state.loading;
export const deleteProjectLoaded = (state: DelProjectState) => state.loaded;
export const deleteProject = (state: DelProjectState) => state.message;

// Project Status

interface Status {
	message:string
}

export interface StatusState {
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialStatusState: StatusState = {
  loading: false,
  loaded: false,
  message: ''
};

export function statusreducer(state = initialStatusState, action: fromProject.All): StatusState {
  switch (action.type) {
    case fromProject.STATUS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromProject.STATUS_SUCCESS: {
      const data:any = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message: data.data.message
      };
    }

    case fromProject.STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const projectStatusLoading = (state: StatusState) => state.loading;
export const projectStatusLoaded = (state: StatusState) => state.loaded;
export const projectStatus = (state: StatusState) => state.message;