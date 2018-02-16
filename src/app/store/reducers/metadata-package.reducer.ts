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

export const adapter: EntityAdapter<MetadataPackage> = createEntityAdapter<MetadataPackage>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: true,
  currentMetadataPackage: '',
  currentMetadataPackageVersion: 0
});

export function reducer(state: State = initialState,
  action: MetadataPackageActions): State {
  switch (action.type) {
    case MetadataPackageActionTypes.ADD_METADATA_PACKAGES:
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case MetadataPackageActionTypes.UPDATE_METADATA_PACKAGE_IMPORT_STATUS:
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload.changes
        },
        state
      );
    case MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE:
      return {...state, ...action.payload};
    case MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE_VERSION:
      return {...state, currentMetadataPackageVersion: action.payload};
  }
  return state;
}

export const getMetadataPackageLoadingState = (state: State) => state.loading;
export const getMetadataPackageLoadedState = (state: State) => state.loaded;
export const getCurrentMetadataPackageState = (state: State) =>
  state.currentMetadataPackage;
export const getCurrentMetadataPackageVersionState = (state: State) =>
  state.currentMetadataPackageVersion;
