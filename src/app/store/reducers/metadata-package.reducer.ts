import { MetadataPackage } from '@app/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  MetadataPackageActions,
  MetadataPackageActionTypes
} from './../actions/metadata-package.actions';

export interface State extends EntityState<MetadataPackage> {
  loading: boolean;
  loaded: boolean;
  currentMetadataPackage: string;
  currentMetadataPackageVersion: number;
}

export const adapter: EntityAdapter<MetadataPackage> = createEntityAdapter<
  MetadataPackage
>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: true,
  currentMetadataPackage: '',
  currentMetadataPackageVersion: 0
});

export function reducer(
  state: State = initialState,
  action: MetadataPackageActions
): State {
  switch (action.type) {
    case MetadataPackageActionTypes.ADD_METADATA_PACKAGES:
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
  }
  return state;
}

export const getMetadataPackageLoading = (state: State) => state.loading;
export const getMetadataPackageLoaded = (state: State) => state.loaded;
export const getCurrentMetadataPackage = (state: State) =>
  state.currentMetadataPackage;
export const getCurrentMetadataPackageVersion = (state: State) =>
  state.currentMetadataPackageVersion;
