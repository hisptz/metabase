import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouterReducer from '@ngrx/router-store';
import * as fromCurrentUserReducer from './current-user.reducer';
import * as fromMetadataPackageRepository from './metadata-package-repository.reducer';
import * as fromMetadataPackage from './metadata-package.reducer';

export interface State {
  route: fromRouterReducer.RouterReducerState;
  currentUser: fromCurrentUserReducer.CurrentUserState;
  metadataPackageRepository: fromMetadataPackageRepository.State;
  metadataPackage: fromMetadataPackage.State;
}

export const reducers: ActionReducerMap<State> = {
  route: fromRouterReducer.routerReducer,
  currentUser: fromCurrentUserReducer.currentUserReducer,
  metadataPackageRepository: fromMetadataPackageRepository.reducer,
  metadataPackage: fromMetadataPackage.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getAppState = (state: State) => state;

/**
 * Global selectors for metadata package repositories
 */

export const getMetadataPackageRepositoryState = createSelector(
  getAppState,
  (state: State) => state.metadataPackageRepository
);

export const {
  selectAll: getAllMetadataPackageRepositories,
  selectIds: getMetadataPackageRepositoriesIds,
  selectEntities: getMetadataPackageRepositoryEntities,
  selectTotal: getMetadataPackageRepositoryTotal
} = fromMetadataPackageRepository.adapter.getSelectors(getMetadataPackageRepositoryState);


/**
 * Global selectors for metadata packages
 */

export const getMetadataPackageState = createSelector(
  getAppState,
  (state: State) => state.metadataPackage
);

export const {
  selectAll: getAllMetadataPackages,
  selectIds: getMetadataPackagesIds,
  selectEntities: getMetadataPackagesEntities,
  selectTotal: getMetadataPackagesTotal
} = fromMetadataPackage.adapter.getSelectors(getMetadataPackageState);
