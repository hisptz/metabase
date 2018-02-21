import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrganisationUnit } from '../../models/';
import {
  OrganisationUnitAction,
  OrganisationUnitActionTypes
} from '../actions/organisation-unit.actions';

export interface State extends EntityState<OrganisationUnit> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<OrganisationUnit> = createEntityAdapter<
  OrganisationUnit
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: OrganisationUnitAction
): State {
  switch (action.type) {
    case OrganisationUnitActionTypes.LOAD_ORGANISATION_UNIT:
      return { ...state, loading: true };
    case OrganisationUnitActionTypes.LOAD_ORGANISATION_UNIT_SUCCESS:
    case OrganisationUnitActionTypes.ADD_ORGANISATION_UNIT:
      return adapter.addOne(action.payload, { ...state, loaded: true });
  }

  return state;
}

export const getOrganisationUnitState = (state: State) => state;
export const getOrganisationUnitEntitiesState = createSelector(
  getOrganisationUnitState,
  state => state
);
export const getOrganisationUnitLoadedState = (state: State) => state.loaded;
export const getOrganisationUnitLoadingState = (state: State) => state.loading;
export const {
  selectAll: getAllOrganisationUnitsState,
  selectIds: getOrganisationUnitIdsState,
  selectEntities: getOrganisationUnitEntititesState,
  selectTotal: getOrganisationUnitTotalState
} = adapter.getSelectors(getOrganisationUnitEntitiesState);
