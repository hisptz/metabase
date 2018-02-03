import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromRoot from '../reducers';
import * as fromPackageGroup from '../reducers/package-group.reducer';
import { PackageGroup, Package } from '@app/core';

export const getPackageGroupLoadingStatus = createSelector(
  fromRoot.getPackageGroupState,
  fromPackageGroup.getPackageGroupLoading
);

export const getPackageGroupLoadedStatus = createSelector(
  fromRoot.getPackageGroupState,
  fromPackageGroup.getPackageGroupLoaded
);

export const getPackageGroups = createSelector(
  fromRoot.getAllPackageGroups,
  fromRoot.getPackagesEntities,
  (packageGroups: PackageGroup[], packageEntity: { [id: string]: Package }) =>
    _.map(packageGroups, (packageGroup: PackageGroup) => {
      return {
        ...packageGroup,
        packages: _.map(
          packageGroup.packages,
          (packageId: string) => packageEntity[packageId]
        )
      };
    })
);
