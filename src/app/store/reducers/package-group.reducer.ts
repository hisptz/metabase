import {
  PackageGroupTypes,
  PackageGroupActions
} from './../actions/package-group.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { PackageGroup } from '@app/core';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<PackageGroup> {
  loading: boolean;
  loaded: boolean;
  currentPackageGroup: string;
}

export const adapter: EntityAdapter<PackageGroup> = createEntityAdapter<
  PackageGroup
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  currentPackageGroup: ''
});

export function reducer(
  state: State = initialState,
  action: PackageGroupActions
): State {
  switch (action.type) {
    case PackageGroupTypes.LOAD_PACKAGE_GROUPS:
      return { ...state, loading: true };
    case PackageGroupTypes.ADD_PACKAGE_GROUPS:
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
  }
  return state;
}

export const getPackageGroupLoading = (state: State) => state.loading;
export const getPackageGroupLoaded = (state: State) => state.loaded;
export const getCurrentPackageGroup = (state: State) =>
  state.currentPackageGroup;