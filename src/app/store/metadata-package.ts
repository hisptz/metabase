import {MetadataPackage} from "./models/metadata-package";
import {Action} from "@ngrx/store";

export const ADD_PACKAGE = 'ADD_PACKAGE';
export const UPDATE_PACKAGE = 'UPDATE_PACKAGE';
export function metadataPackageReducer(state: MetadataPackage[] = [], action: Action) {
  switch (action.type) {
    case ADD_PACKAGE: {
      // let stateAvailable: boolean = false;
      // if(state.length > 0)  {
      //   for(let stat of state) {
      //     if(stat.id == action.payload.id) {
      //       stateAvailable = true;
      //       break;
      //     }
      //   }
      // }
      action.payload.forEach(payload => {
        if(state.length > 0) {
          let stateAvailable: boolean = false;
          for(let stat of state) {
            if(stat.id == payload.id) {
              stateAvailable = true;
            }
          }

          if(!stateAvailable) {
            state = [...state, payload];
          }
        } else {
          state = [...state, payload];
        }
      });
      return state;
    }

    case UPDATE_PACKAGE:
      return state.map(item => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      });

    default:
      return state;
  }
}
