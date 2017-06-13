import {ApplicationState} from "../application-state";
export function repositoriesSelector(state: ApplicationState) {
  return state.storeData.repositories;
}
