import {INITIAL_UI_STATE, UiState} from "../ui-state";
import * as _ from 'lodash';
export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action) {
  switch (action.type) {

    case 'ERROR_OCCURRED_ACTION': {
      const newState: UiState = _.clone(state);
      newState.errorMessage = action.payload;
      return newState;
    }

    case 'CURRENT_METADATA_PACKAGE_CHANGE_ACTION': {
      const newState: UiState = _.clone(state);
      newState.currentMetadataPackage = action.payload;
      return newState;
    }

    case 'CLEAR_MESSAGE_ACTION': {
      const newState: UiState = _.clone(state);
      newState.errorMessage = '';
      return newState;
    }

    default:
      return state;
  }
}
