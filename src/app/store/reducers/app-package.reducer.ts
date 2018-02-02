import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AppPackage } from '@app/core';
import {
  AppPackageActions,
  AppPackageActionTypes
} from '../actions/app-package.actions';

export interface State extends EntityState<AppPackage> {
  currentAppPackage: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<AppPackage> = createEntityAdapter<
  AppPackage
>();

export const initialState: State = adapter.getInitialState({
  currentAppPackage: '',
  loading: true,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: AppPackageActions
): State {
  switch (action.type) {
    case AppPackageActionTypes.ADD_APP_PACKAGES:
      return adapter.addAll(action.payload, { ...state, loaded: true });
  }
  return state;
}

export const getAppPackageLoading = (state: State) => state.loading;
export const getAppPackageLoaded = (state: State) => state.loaded;
export const getCurrentAppMetadataPackage = (state: State) =>
  state.currentAppPackage;

export const {
  selectAll: selectAllAppPackages,
  selectIds: selectAppPackagesIds,
  selectEntities: selectAppPackagesEntities,
  selectTotal: selectAppPackagesTotal
} = adapter.getSelectors();
