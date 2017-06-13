import {StoreData, INITIAL_STORE_DATA} from "../store-data";
import * as _ from 'lodash';
export function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action) {
  switch (action.type) {

    case 'REPOSITORIES_LOADED_ACTION': {
      const newState: StoreData = _.clone(state);
      newState.repositories = action.payload;
      return newState;
    }

    case 'METADATA_PACKAGES_LOADED_ACTION': {
      const newState: StoreData = _.clone(state);
      newState.metadataPackages = action.payload;
      return newState;
    }

    case 'IMPORTED_METADATA_PACKAGES_LOADED_ACTION': {
      const newState: StoreData = _.clone(state);
      newState.importedMetadataPackages = action.payload;
      return newState;
    }

    case 'METADATA_LOADED_ACTION': {
      const newState: any = _.clone(state);

      newState.metadataPackages.forEach((metadataPackage: any) => {
        if(metadataPackage.id == action.payload.packageId) {
          metadataPackage.versions.forEach((versionItem: any) => {
            if(versionItem.version == action.payload.packageVersion) {
              versionItem.metadata = action.payload.metadata;
            }
          });
        }
      });

      return newState;
    }
    default:
      return state;
  }
}
