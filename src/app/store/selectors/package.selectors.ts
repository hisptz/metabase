import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromPackage from '../reducers/package.reducer';
import { Package } from '@app/core';

export const getCurrentPackageId = createSelector(
  fromRoot.getPackageState,
  fromPackage.getCurrentPackageIdState
);
export const getCurrentPackage = createSelector(
  fromRoot.getPackagesEntities,
  getCurrentPackageId,
  (
    packageEntities: { [id: string]: Package },
    currentPackageId: string | number
  ) => packageEntities[currentPackageId]
);
