import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
import {currentMetadataPackageSelector} from "./current-metadata-package.selector";
export function errorMessageSelector(state: ApplicationState) {
  return state.uiState.errorMessage;
}
