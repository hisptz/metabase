import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Indicator } from '../../models/';
import {
  IndicatorAction,
  IndicatorActionTypes
} from '../actions/indicator.actions';

export interface State extends EntityState<Indicator> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Indicator> = createEntityAdapter<
  Indicator
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: IndicatorAction
): State {
  switch (action.type) {
    case IndicatorActionTypes.LOAD_INDICATOR:
      return { ...state, loading: true };
    case IndicatorActionTypes.LOAD_INDICATOR_SUCCESS:
    case IndicatorActionTypes.ADD_INDICATOR:
      return adapter.addOne(action.payload, { ...state, loaded: true });
  }

  return state;
}

export const getIndicatorState = (state: State) => state;
export const getIndicatorEntitiesState = createSelector(
  getIndicatorState,
  state => state
);
export const getIndicatorLoadedState = (state: State) => state.loaded;
export const getIndicatorLoadingState = (state: State) => state.loading;
export const {
  selectAll: getAllIndicatorsState,
  selectIds: getIndicatorIdsState,
  selectEntities: getIndicatorEntititesState,
  selectTotal: getIndicatorTotalState
} = adapter.getSelectors(getIndicatorEntitiesState);
