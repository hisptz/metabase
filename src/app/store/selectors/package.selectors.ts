import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as _ from 'lodash';
import * as fromPackage from '../reducers/package.reducer';
import { Package, MetadataPackage } from '@app/core';

export const getCurrentPackageId = createSelector(
  fromRoot.getPackageState,
  fromPackage.getCurrentPackageIdState
);
export const getCurrentPackage = createSelector(
  fromRoot.getPackagesEntities,
  fromRoot.getMetadataPackagesEntities,
  getCurrentPackageId,
  (
    packageEntities: { [id: string]: Package },
    metadataPackageEntities: { [id: string]: MetadataPackage },
    currentPackageId: string | number
  ) => {
    const packageObject: any = packageEntities[currentPackageId];
    return {
      ...packageObject,
      metadataPackages: _.filter(
        _.map(
          packageObject ? packageObject.metadataPackages : [],
          (metadataPackageId: string) =>
            metadataPackageEntities[metadataPackageId]
        ),
        metadataPackage => metadataPackage
      )
    };
  }
);
