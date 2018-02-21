import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { MetadataPackage } from '@app/core';

export const getMetadataPackages = createSelector(
  fromRoot.getAllMetadataPackages,
  ((metadataPackages: MetadataPackage[]) => metadataPackages)
);
