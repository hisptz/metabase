import { CurrentUser } from '@app/core';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CurrentUserActions, CurrentUserActionTypes } from '@app/store/actions/current-user.actions';

export interface State extends EntityState<CurrentUser> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<CurrentUser> = createEntityAdapter<CurrentUser>();

export const initialState: State = adapter.getInitialState( { loading: false, loaded: false } );

export function reducer( state: State = initialState,
                         action: CurrentUserActions ): State {
  switch ( action.type ) {
    case CurrentUserActionTypes.LOAD_USER:
      return { ...state, loading: true };
    case CurrentUserActionTypes.ADD_USER:
      return adapter.addOne( action.payload, { ...state, loading: false, loaded: true } );
  }

  return state;
}

export const selectCurrentUserLoading = ( state: State ) => state.loading;
export const selectCurrentUserLoaded = ( state: State ) => state.loaded;

export const {
  selectEntities: selectUserEntities
} = adapter.getSelectors();
