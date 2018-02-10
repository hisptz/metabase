import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromMetadataPackage from '../reducers/metadata-package.reducer';

export const getCurrentMetadataPackageId = createSelector(
  fromRoot.getMetadataPackageState,
  fromMetadataPackage.getCurrentMetadataPackageState
);

export const getCurrentMetadataPackageVersion = createSelector(
  fromRoot.getMetadataPackageState,
  fromMetadataPackage.getCurrentMetadataPackageVersionState
);

export const getCurrentMetadataPackage = createSelector(
  fromRoot.getMetadataPackagesEntities,
  getCurrentMetadataPackageId,
  (metadataPackageEntity, metadataPackageId: string | number) =>
    metadataPackageEntity[metadataPackageId]
);
