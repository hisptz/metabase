import {ApplicationState} from "../application-state";
export function repositoriesUrlArraySelector(state: ApplicationState) {
  const repositories: any[] =  state.storeData.repositories;

  if(repositories.length == 0) {
    return [];
  }

  return repositories.map(repository => {return repository.url})
}
