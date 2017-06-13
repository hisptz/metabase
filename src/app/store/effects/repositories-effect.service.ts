import { Injectable } from '@angular/core';
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {
  LOAD_REPOSITORIES_ACTION, ErrorOccurredAction, RepositoriesLoadedAction,
  RepositoriesUpdatedAction, UPDATE_REPOSITORIES_ACTION, REPOSITORIES_LOADED_ACTION, LoadMetadataPackagesAction,
  ADD_REPOSITORIES_ACTION, RepositoriesAddedAction, REPOSITORIES_ADDED_ACTION, LoadRepositoriesAction,
  REPOSITORIES_UPDATED_ACTION, REPOSITORIES_REMOVED_ACTION, RepositoriesRemovedAction, REMOVE_REPOSITORIES_ACTION
} from "../actions";
import {RepositoriesService} from "../../shared/providers/repositories.service";

@Injectable()
export class RepositoriesEffectService {

  constructor(
    private actions$: Actions,
    private repositoriesService: RepositoriesService
  ) { }

  @Effect() repositories$: Observable<Action> = this.actions$
    .ofType(LOAD_REPOSITORIES_ACTION)
    .switchMap(action => this.repositoriesService.loadRepositories())
    .map(repositories => new RepositoriesLoadedAction(repositories))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() repositoriesLoaded$: Observable<Action> = this.actions$
    .ofType(REPOSITORIES_LOADED_ACTION)
    .switchMap(action => this.repositoriesService.getUrlArray(action.payload))
    .map(repositories => new LoadMetadataPackagesAction(repositories))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() updateRepositories$: Observable<Action> = this.actions$
    .ofType(UPDATE_REPOSITORIES_ACTION)
    .switchMap(action => this.repositoriesService.updateRepository(action.payload))
    .map(repositories => new RepositoriesUpdatedAction(repositories))
    .catch(error => Observable.of(new ErrorOccurredAction(error)));

  @Effect() repositoriesUpdated$: Observable<Action> = this.actions$
    .ofType(REPOSITORIES_UPDATED_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(repositories => new RepositoriesLoadedAction(repositories))
    .catch(error => Observable.of(new ErrorOccurredAction(error)));

  @Effect() addRepositories$: Observable<Action> = this.actions$
    .ofType(ADD_REPOSITORIES_ACTION)
    .switchMap(action => this.repositoriesService.addRepository(action.payload))
    .map(repositories => new RepositoriesAddedAction(repositories))
    .catch(error => Observable.of(new ErrorOccurredAction(error)));

  @Effect() repositoriesAdded$: Observable<Action> = this.actions$
    .ofType(REPOSITORIES_ADDED_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(repositories => new RepositoriesLoadedAction(repositories))
    .catch(error => Observable.of(new ErrorOccurredAction(error)));

  @Effect() removeRepositories$: Observable<Action> = this.actions$
    .ofType(REMOVE_REPOSITORIES_ACTION)
    .switchMap(action => this.repositoriesService.removeRepository(action.payload))
    .map(repositories => new RepositoriesRemovedAction(repositories))
    .catch(error => Observable.of(new ErrorOccurredAction(error)));

  @Effect() repositoriesRemoved$: Observable<Action> = this.actions$
    .ofType(REPOSITORIES_REMOVED_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(repositories => new RepositoriesLoadedAction(repositories))
    .catch(error => Observable.of(new ErrorOccurredAction(error)));
}
