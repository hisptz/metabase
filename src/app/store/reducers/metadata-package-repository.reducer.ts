import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MetadataPackageRepository } from '@app/core';
import {
  MetadataPackageRepositoryAction,
  MetadataPackageRepositoryActionTypes
} from '../actions/metadata-package-repository.actions';

export interface State extends EntityState<MetadataPackageRepository> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<MetadataPackageRepository> = createEntityAdapter<MetadataPackageRepository>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(state: State = initialState, action: MetadataPackageRepositoryAction): State {
  switch (action.type) {
    case MetadataPackageRepositoryActionTypes.LOAD_METADATA_PACKAGE_REPOSITORIES:
      return {...state, loading: true};
    case MetadataPackageRepositoryActionTypes.LOAD_METADATA_PACKAGE_REPOSITORIES_SUCCESS:
      return {...state, loading: false, loaded: true};
    case MetadataPackageRepositoryActionTypes.ADD_METADATA_PACKAGE_REPOSITORY:
      return adapter.addOne(action.metadataPackageRepository, state);
  }
  return state;
}

export const getMetadataPackageRepositoryLoadingState = (state: State) => state.loading;
export const getMetadataPackageRepositoryLoadedState = (state: State) => state.loaded;
