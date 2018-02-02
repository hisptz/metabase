import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromCurrentUser from '../reducers/current-user.reducer';
import { selectCurrentUserState } from '../reducers';

export const selectUserEntities = createSelector( selectCurrentUserState, fromCurrentUser.selectUserEntities );

export const getCurrentUser = createSelector(
  selectUserEntities, ( userEntities ) => userEntities[ _.keys( userEntities )[ 0 ] ]
);

export const getCurrentUserLoading = createSelector(
  selectCurrentUserState,
  fromCurrentUser.selectCurrentUserLoading
);

export const getCurrentUserLoaded = createSelector(
  selectCurrentUserState,
  fromCurrentUser.selectCurrentUserLoaded
);
