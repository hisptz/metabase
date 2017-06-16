import {ApplicationState} from "../application-state";
import * as _ from 'lodash';
import {currentMetadataPackageSelector} from "./current-metadata-package.selector";
export function progressMessagesSelector(state: ApplicationState) {
  return state.uiState.progressMessages;

}
