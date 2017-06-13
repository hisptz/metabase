import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
import {currentMetadataPackageSelector} from "./current-metadata-package.selector";
export function loadedMetadataSelector(state: ApplicationState) {
  return state.uiState.loadedMetadata;
}
