import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
export function currentMetadataPackageSelector(state: ApplicationState) {
  const currentMetadataPackageId: string = state.uiState.currentMetadataPackage.id;
  const metadataPackages: any[] = state.storeData.metadataPackages;

  if(currentMetadataPackageId == undefined && metadataPackages.length == 0) {
    return null;
  }

  return _.find(metadataPackages, ['id', currentMetadataPackageId]);
}
