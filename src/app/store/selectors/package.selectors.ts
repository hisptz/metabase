import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as _ from 'lodash';
import * as fromPackage from '../reducers/package.reducer';
import { Package, MetadataPackage} from '../../core/';
import { PackageResource } from '../../core/models/package-resource';

export const getCurrentPackageId = createSelector(
  fromRoot.getPackageState,
  fromPackage.getCurrentPackageIdState
);
export const getCurrentPackage = createSelector(
  fromRoot.getPackagesEntities,
  fromRoot.getMetadataPackagesEntities,
  fromRoot.getResourcePackagesEntities,
  getCurrentPackageId,
  (
    packageEntities: { [id: string]: Package },
    metadataPackageEntities: { [id: string]: MetadataPackage },
    resourcePackagesEntities: {[id: string]: PackageResource},
    currentPackageId: string | number
  ) => {
    const packageObject: any = packageEntities[currentPackageId];
    return packageObject ? {
      ...packageObject,
      metadataPackages: _.filter(
        _.map(
          packageObject ? packageObject.metadataPackages : [],
          (metadataPackageId: string) =>
            metadataPackageEntities[metadataPackageId]
        ),
        metadataPackage => metadataPackage
      ),
      resources: _.filter(
        _.map(
          packageObject ? packageObject.resources : [],
          (resourcePackageId: string) =>
            resourcePackagesEntities[resourcePackageId]
        ),
        resourcePackage => resourcePackage
      )
    } : null;
  }
);
