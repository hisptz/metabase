import { createSelector } from '@ngrx/store';
import { MetadataPackageRepository } from '@app/core';

import * as fromRoot from '../reducers';
import * as fromMetadataPackageRepository from '../reducers/metadata-package-repository.reducer';

export const getAllMetadataPackageRepositories = createSelector(
  fromRoot.getAllMetadataPackageRepositoriesState,
  (state: MetadataPackageRepository[]) => state
);

export const getMetadataPackageRepositoryLoading = createSelector(
  fromRoot.getMetadataPackageRepositoryState,
  fromMetadataPackageRepository.getMetadataPackageRepositoryLoadingState
);

export const getMetadataPackageRepositoryLoaded = createSelector(
  fromRoot.getMetadataPackageRepositoryState,
  fromMetadataPackageRepository.getMetadataPackageRepositoryLoadedState
);

