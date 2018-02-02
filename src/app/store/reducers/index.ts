import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouterReducer from '@ngrx/router-store';
import * as fromCurrentUser from './current-user.reducer';
import * as fromPackageGroup from './package-group.reducer';
import * as fromPackage from './package.reducer';
import * as fromMetadataPackage from './metadata-package.reducer';
import * as fromAppPackage from './app-package.reducer';

export interface State {
  route: fromRouterReducer.RouterReducerState;
  currentUser: fromCurrentUser.State;
  packageGroup: fromPackageGroup.State;
  packageObject: fromPackage.State;
  metadataPackage: fromMetadataPackage.State;
  appPackage: fromAppPackage.State;
}

export const reducers: ActionReducerMap<State> = {
  route: fromRouterReducer.routerReducer,
  currentUser: fromCurrentUser.reducer,
  packageGroup: fromPackageGroup.reducer,
  packageObject: fromPackage.reducer,
  metadataPackage: fromMetadataPackage.reducer,
  appPackage: fromAppPackage.reducer
};

export const selectCurrentUserState = (state: State) => state.currentUser;
export const selectPackageGroupState = (state: State) => state.packageGroup;
export const selectPackageState = (state: State) => state.packageObject;
export const selectMetadataPackageState = (state: State) =>
  state.metadataPackage;
export const selectAppPackageState = (state: State) => state.appPackage;

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
