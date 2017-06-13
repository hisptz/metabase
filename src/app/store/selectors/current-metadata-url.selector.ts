import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
import {currentMetadataPackageSelector} from "./current-metadata-package.selector";
export function currentMetadataUrlSelector(state: ApplicationState) {
  let currentMetadataHref: string = '';
  const currentMetadataPackage = currentMetadataPackageSelector(state);
  const currentVersion = state.uiState.currentMetadataPackage.version;

  if(currentMetadataPackage == undefined && currentVersion == 0) {
    return currentMetadataHref;
  }

  if(currentMetadataPackage && currentMetadataPackage.hasOwnProperty('versions')) {
    const currentMetadata = _.find(currentMetadataPackage.versions, ['version', currentVersion]);
    currentMetadataHref = currentMetadata ? currentMetadata.href : '';
  }
  return currentMetadataHref;

}
