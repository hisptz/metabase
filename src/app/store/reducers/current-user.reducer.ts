import { CurrentUserState } from './current-user.reducer';
import * as fromCurrentUserActions from '../actions/current-user.actions';
import { CurrentUser } from '@app/core';

export interface CurrentUserState {
  currentUser: CurrentUser;
  loading: boolean;
  loaded: boolean;
}

export const initialState: CurrentUserState = {
  loading: false,
  loaded: false,
  currentUser: null
};

export function currentUserReducer(
  state: CurrentUserState = initialState,
  action: fromCurrentUserActions.CurrentUserActions
): CurrentUserState {
  switch (action.type) {
    case fromCurrentUserActions.LOAD:
      return {
        ...state,
        loading: true
      };
    case fromCurrentUserActions.LOAD_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loaded: true,
        loading: false
      };
  }

  return state;
}

export const getCurrentUser = (state: CurrentUserState) => state.currentUser;
export const getCurrentUserLoading = (state: CurrentUserState) => state.loading;
export const getCurrentUserLoaded = (state: CurrentUserState) => state.loaded;
