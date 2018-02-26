import {
  ActionReducerMap,
  MetaReducer,
  createSelector
} from '@ngrx/store';
import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouterReducer from '@ngrx/router-store';
import * as fromCurrentUser from './current-user.reducer';
import * as fromPackageGroup from './package-group.reducer';
import * as fromPackage from './package.reducer';
import * as fromMetadataPackage from './metadata-package.reducer';
import * as fromAppPackage from './app-package.reducer';
import * as fromResourcePackage from './package-resource.reducers';

export interface State {
  route: fromRouterReducer.RouterReducerState;
  currentUser: fromCurrentUser.State;
  packageGroup: fromPackageGroup.State;
  packageObject: fromPackage.State;
  metadataPackage: fromMetadataPackage.State;
  appPackage: fromAppPackage.State;
  resourcePackage: fromResourcePackage.State;
}

export const reducers: ActionReducerMap<State> = {
  route: fromRouterReducer.routerReducer,
  currentUser: fromCurrentUser.reducer,
  packageGroup: fromPackageGroup.reducer,
  packageObject: fromPackage.reducer,
  metadataPackage: fromMetadataPackage.reducer,
  appPackage: fromAppPackage.reducer,
  resourcePackage: fromResourcePackage.reducer
};

export const rootState = (state: State) => state;

export const selectCurrentUserState = (state: State) => state.currentUser;
export const selectAppPackageState = (state: State) => state.appPackage;

/**
 * Global selectors for package groups
 */
export const getPackageGroupState = (state: State) => state.packageGroup;

export const getPackageGroupEntitiesState = createSelector(
  getPackageGroupState,
  state => state
);

export const {
  selectIds: getPackageGroupIds,
  selectAll: getAllPackageGroups,
  selectEntities: getPackageGroupEntities,
  selectTotal: getPackageGroupTotal
} = fromPackageGroup.adapter.getSelectors(getPackageGroupEntitiesState);

/**
 * Global selectors for packages
 */

export const getPackageState = (state: State) => state.packageObject;

export const getPackageEntitiesState = createSelector(
  getPackageState,
  state => state
);

export const {
  selectAll: getAllPackages,
  selectIds: getPackagesIds,
  selectEntities: getPackagesEntities,
  selectTotal: getPackagesTotal
} = fromPackage.adapter.getSelectors(getPackageEntitiesState);

/**
 * Global selectors for metadata packages
 */

export const getMetadataPackageState = (state: State) => state.metadataPackage;

export const getMetadataPackageEntitiesState = createSelector(
  getMetadataPackageState,
  state => state
);

export const {
  selectAll: getAllMetadataPackages,
  selectIds: getMetadataPackagesIds,
  selectEntities: getMetadataPackagesEntities,
  selectTotal: getMetadataPackagesTotal
} = fromMetadataPackage.adapter.getSelectors(getMetadataPackageEntitiesState);

/**
 * Global selectors for package resources
 */

export const getResourcePackageState = createSelector(
  rootState,
  state => state.resourcePackage
);

export const {
  selectAll: getAllResourcePackages,
  selectIds: getResourcePackagesIds,
  selectEntities: getResourcePackagesEntities,
  selectTotal: getResourcePackagesTotal
} = fromResourcePackage.adapter.getSelectors(getResourcePackageState);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
