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

    case 'METADATA_LOADED_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages)
      newProgressMessages.push({message: 'Metadata details loaded'});
      newState.progressMessages = _.clone(newProgressMessages)
      return newState;
    }

    case 'LOAD_METADATA_ACTION': {
      const newState = _.clone(state);
      if(newState.progressMessages.length === 0) {
        const newProgressMessages = _.clone(newState.progressMessages)
        newProgressMessages.push({message: 'Loading Metadata details'});
        newState.progressMessages = _.clone(newProgressMessages)
      }

      return newState;
    }

    case 'CHECK_METADATA_EXISTENCE_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages)
      newProgressMessages.push({message: 'Checking metadata availability'});
      newState.progressMessages = _.clone(newProgressMessages)
      return newState;
    }

    case 'METADATA_EXISTENCE_CHECKED_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages);
      newProgressMessages.push({message: 'Metadata availability check completed'});
      newState.progressMessages = _.clone(newProgressMessages);
      return newState;
    }

    case 'UPDATE_METADATA_WITH_DEPENDENCY_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages);
      newProgressMessages.push({message: 'Analyzing and checking Metadata Dependencies availability'});
      newState.progressMessages = _.clone(newProgressMessages);
      return newState;
    }

    case 'METADATA_WITH_DEPENDENCY_UPDATED_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages);
      newProgressMessages.push({message: 'Metadata Dependencies analysis completed'});
      newState.progressMessages = _.clone(newProgressMessages);
      return newState;
    }

    case 'GET_METADATA_IMPORTABLE_VERSION_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages);
      newProgressMessages.push({message: 'Compiling Metadata importable version'});
      newState.progressMessages = _.clone(newProgressMessages);
      return newState;
    }

    case 'METADATA_IMPORT_PREVIEW_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages);
      newProgressMessages.push({message: 'Previewing Metadata'});
      newState.progressMessages = _.clone(newProgressMessages);
      return newState;
    }

    case 'METADATA_IMPORT_PREVIEW_COMPLETED_ACTION': {
      const newState = _.clone(state);
      const newProgressMessages = _.clone(newState.progressMessages);
      newProgressMessages.push({message: 'Metadata preview completed'});
      newState.progressMessages = _.clone(newProgressMessages);
      return newState;
    }

    default:
      return state;
  }
}
