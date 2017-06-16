import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
import {currentMetadataPackageSelector} from "./current-metadata-package.selector";
import {currentMetadataSelector} from './current-metadata.selector';
export function currentImportablePackageSelector(state: ApplicationState) {
  let currentMetadata: any = currentMetadataSelector(state);

  if(!currentMetadata.checked) {
    return null
  }

  const metadataKeys = currentMetadata.metadataItems;
  let importablePackage: any = {};
  metadataKeys.forEach(key => {
      importablePackage[key] = [];
      currentMetadata.metadataDetails[key].forEach(metadata => {
        importablePackage = updatePackageWithMetadataImportableVersion(metadata, importablePackage, key)
      })
    });

  return importablePackage;

}

function updatePackageWithMetadataImportableVersion(metadata, importablePackage, metadataKey) {
  const metadataOriginalVersion = metadata.inSystemVersion === null ? metadata.originalVersion : null;
  const metadataKeys = _.keys(metadataOriginalVersion);

  if(metadataOriginalVersion !== null) {
    metadataKeys.forEach(key => {
      if (_.isPlainObject(metadataOriginalVersion[key])) {
        const dependencyType = _.indexOf(metadata.dependencies.map(dependency => {return dependency.type}), key) !== -1 ? 'type': _.indexOf(metadata.dependencies.map(dependency => {return dependency.packageType}), key) != -1 ? 'packageType' : 'type';
        const correspondingDependency = _.find(metadata.dependencies, [dependencyType, key]);
        if (correspondingDependency) {
          if (correspondingDependency.inSystem !== null && correspondingDependency.inPackage !== null) {
            const dependencyIndex = _.findIndex(importablePackage[key + 's'], correspondingDependency.inPackage);
            if (dependencyIndex !== -1) {
              importablePackage[key + 's'].splice(dependencyIndex, 1);
            }
          }

          if (correspondingDependency.inSystem !== null || (correspondingDependency.inSystem === null && correspondingDependency.inPackage === null)) {
            metadataOriginalVersion[correspondingDependency.packageType ? correspondingDependency.packageType : key] = correspondingDependency.inSystem;
          } else if (correspondingDependency.inSystem === null && correspondingDependency.inPackage === null) {
            delete metadataOriginalVersion[correspondingDependency.packageType ? correspondingDependency.packageType : key];
          }
        }
      }
    });
    importablePackage[metadataKey].push(metadataOriginalVersion);
  }

  return importablePackage;
}

function removeUnrequiredMetadata(metadata, importablePackage) {
  const metadataOriginalVersion = metadata.originalVersion;
  const metadataKeys = _.keys(metadataOriginalVersion);

  metadataKeys.forEach(key => {
    if (_.isPlainObject(metadataOriginalVersion[key])) {
      const correspondingDependency = _.find(metadata.dependencies, ['type', key]);
      if (correspondingDependency) {
        if (correspondingDependency.inSystem !== null && correspondingDependency.inPackage !== null) {
          const dependencyIndex = _.findIndex(importablePackage[key + 's'], correspondingDependency.inPackage);
          if (dependencyIndex !== -1) {
            importablePackage[key + 's'].splice(dependencyIndex, 1);
          }
        }

      }
    }
  });

  return importablePackage;
}
