import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IndicatorType } from '../../models/';
import {
  IndicatorTypeAction,
  IndicatorTypeActionTypes
} from '../actions/indicator-type.actions';

export interface State extends EntityState<IndicatorType> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<IndicatorType> = createEntityAdapter<
  IndicatorType
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: IndicatorTypeAction
): State {
  switch (action.type) {
    case IndicatorTypeActionTypes.LOAD_INDICATOR_TYPE:
      return { ...state, loading: true };
    case IndicatorTypeActionTypes.LOAD_INDICATOR_TYPE_SUCCESS:
    case IndicatorTypeActionTypes.ADD_INDICATOR_TYPE:
      return adapter.addOne(action.payload, { ...state, loaded: true });
  }

  return state;
}

export const getIndicatorTypeState = (state: State) => state;
export const getIndicatorTypeEntitiesState = createSelector(
  getIndicatorTypeState,
  state => state
);
export const getIndicatorTypeLoadedState = (state: State) => state.loaded;
export const getIndicatorTypeLoadingState = (state: State) => state.loading;
export const {
  selectAll: getAllIndicatorTypesState,
  selectIds: getIndicatorTypeIdsState,
  selectEntities: getIndicatorTypeEntititesState,
  selectTotal: getIndicatorTypeTotalState
} = adapter.getSelectors(getIndicatorTypeEntitiesState);
