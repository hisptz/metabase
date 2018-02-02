import { Package } from '@app/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PackageActions, PackageActionTypes } from '../actions/package.actions';

export interface State extends EntityState<Package> {
  currentPackage: string;
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
  }
  return state;
}

export const getPackageLoading = (state: State) => state.loading;
export const getPackageLoaded = (state: State) => state.loaded;
export const getCurrentPackage = (state: State) => state.currentPackage;

export const {
  selectAll: selectAllPackages,
  selectIds: selectPackagesIds,
  selectEntities: selectPackagesEntities,
  selectTotal: selectPackagesTotal
} = adapter.getSelectors();
