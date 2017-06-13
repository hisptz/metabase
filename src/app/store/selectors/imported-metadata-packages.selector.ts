import {ApplicationState} from "../application-state";
export function importedMetadataPackagesSelector(state: ApplicationState) {
  return state.storeData.importedMetadataPackages;
}
