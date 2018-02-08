import { Package } from '@app/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PackageActions, PackageActionTypes } from '../actions/package.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Package> {
  currentPackage: string | number;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Package> = createEntityAdapter<Package>();

export const initialState: State = adapter.getInitialState({
  currentPackage: '',
  loading: true,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: PackageActions
): State {
  switch (action.type) {
    case PackageActionTypes.ADD_PACKAGES:
      return adapter.addAll(action.payload, { ...state, loaded: true });
    case PackageActionTypes.SET_CURRENT_PACKAGE:
      return { ...state, currentPackage: action.payload };
  }
  return state;
}

export const getPackageLoading = (state: State) => state.loading;
export const getPackageLoaded = (state: State) => state.loaded;
export const getCurrentPackageIdState = (state: State) => state.currentPackage;
