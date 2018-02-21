import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromCurrentUser from '../reducers/current-user.reducer';

// export const getCurrentUserState = createSelector(
//   fromRoot.getRootState,
//   (state: fromRoot.State) => state.currentUser
// );
//
// export const getCurrentUser = createSelector(
//   getCurrentUserState,
//   fromCurrentUser.getCurrentUser
// );
//
// export const getCurrentUserLoading = createSelector(
//   getCurrentUserState,
//   fromCurrentUser.getCurrentUserLoading
// );
//
// export const getCurrentUserLoaded = createSelector(
//   getCurrentUserState,
//   fromCurrentUser.getCurrentUserLoaded
// );
