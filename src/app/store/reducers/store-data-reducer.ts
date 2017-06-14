import {StoreData, INITIAL_STORE_DATA} from "../store-data";
import * as _ from 'lodash';
import * as Fuse from 'fuse.js';
export function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action) {
  switch (action.type) {

    case 'REPOSITORIES_LOADED_ACTION': {
      const newState: StoreData = _.clone(state);
      newState.repositories = action.payload;
      return newState;
    }

    case 'UPDATE_METADATA_PACKAGES_ACTION': {
      const newState: StoreData = _.clone(state);
      const metadataPackages = _.clone(newState.originalMetadataPackages);
      const searchValue = _.values(action.payload);

      if(searchValue.length > 0 && searchValue[0] !== '') {
        if(action.payload.hasOwnProperty('tag')) {
          newState.metadataPackages = metadataPackages.filter(metadataPackage => { return _.indexOf(metadataPackage.tags,searchValue[0]) != -1})
        } else {
          const options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "name",
              "organization"
            ]
          };

          const fuse = new Fuse(metadataPackages, options);
          newState.metadataPackages = fuse.search(searchValue[0]);
        }

      } else {
        newState.metadataPackages = metadataPackages;
      }

      return newState;
    }

    case 'METADATA_PACKAGES_LOADED_ACTION': {
      const newState: StoreData = _.clone(state);
      newState.originalMetadataPackages = action.payload;
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

      newState.originalMetadataPackages.forEach((metadataPackage: any) => {
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
