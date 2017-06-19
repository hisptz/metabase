import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
import {currentMetadataPackageSelector} from "./current-metadata-package.selector";
export function currentMetadataSelector(state: ApplicationState) {
  let currentMetadata: any = null;

  if(state.uiState.currentMetadataPackage.version == 0 && state.uiState.currentMetadataPackage.id == undefined) {
    return currentMetadata;
  }
  const currentMetadataPackage: any = _.find(state.storeData.metadataPackages, ['id', state.uiState.currentMetadataPackage.id]);

  if(currentMetadataPackage) {
    const currentMetadataPackageVersion: any = _.find(currentMetadataPackage.versions, ['version', state.uiState.currentMetadataPackage.version]);

    if(currentMetadataPackageVersion) {
      currentMetadata = currentMetadataPackageVersion.hasOwnProperty('metadata') ?  currentMetadataPackageVersion.metadata : {};
    }
  }

  return currentMetadata;

}
