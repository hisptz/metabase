import {ApplicationState} from "../application-state";
export function metadataPackagesSelector(state: ApplicationState) {
  return state.storeData.metadataPackages;
}
