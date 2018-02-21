import { createSelector } from '@ngrx/store';
import { MetadataPackage } from '@app/core';

import * as fromRoot from '../reducers';
import * as fromMetadataPackage from '../reducers/metadata-package.reducer';

export const getMetadataPackages = createSelector(
  fromRoot.getAllMetadataPackages,
  ((metadataPackages: MetadataPackage[]) => metadataPackages)
);

export const getCurrentMetadataPackageId = createSelector(
  fromRoot.getMetadataPackageState,
  fromMetadataPackage.getCurrentMetadataPackageState
);

export const getCurrentMetadataPackage = createSelector(
  fromRoot.getMetadataPackagesEntities,
  getCurrentMetadataPackageId, ((metadataPackageEntities: {[id: string]: MetadataPackage},
    currentMetadataPackageId: string) => metadataPackageEntities[currentMetadataPackageId])
);

export const getCurrentMetadataPackageVersion = createSelector(
  fromRoot.getMetadataPackageState,
  fromMetadataPackage.getCurrentMetadataPackageVersionState
);
