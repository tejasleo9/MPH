import { TGroups, Country } from '../../models/project';
import * as fromTgroup from '../actions/tgroup.actions';

interface Tgrp {
  id: number;
  name: string;
  start_date: string;
  completes_required: number;
  company_id: number;
  status: number;
}

export interface TgroupState {
  loading: boolean;
  loaded: boolean;
  tgroups: TGroups[];
}

export const initialState: TgroupState = {
  loading: false,
  loaded: false,
  tgroups: []
};

export function reducer(state = initialState, action: fromTgroup.All): TgroupState {
  switch (action.type) {
    case fromTgroup.TGROUPS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromTgroup.TGROUPS_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        tgroups: data
      };
    }

    case fromTgroup.TGROUPS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getTgroupsLoading = (state: TgroupState) => state.loading;
export const getTgroupsLoaded = (state: TgroupState) => state.loaded;
export const getTgroups = (state: TgroupState) => state.tgroups;



// Countries

interface Cont {
  id: number;
  industry_name: string;
  status: number;
}

export interface CountryState {
  loading: boolean;
  loaded: boolean;
  countries: Country[];
}

export const initialStateCountry: CountryState = {
  loading: false,
  loaded: false,
  countries: []
};

export function contreducer(state = initialStateCountry, action: fromTgroup.All): CountryState {
  switch (action.type) {
    case fromTgroup.COUNTRY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromTgroup.COUNTRY_SUCCESS: {
      const data: any = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        countries: data.data
      };
    }

    case fromTgroup.COUNTRY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getCountriesLoading = (state: CountryState) => state.loading;
export const getCountriesLoaded = (state: CountryState) => state.loaded;
export const getCountries = (state: CountryState) => state.countries;

