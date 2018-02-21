import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DataElement } from '../../models/';
import {
  DataElementAction,
  DataElementActionTypes
} from '../actions/data-element.actions';

export interface State extends EntityState<DataElement> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<DataElement> = createEntityAdapter<
  DataElement
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export function reducer(
  state: State = initialState,
  action: DataElementAction
): State {
  switch (action.type) {
    case DataElementActionTypes.LOAD_DATA_ELEMENT:
      return { ...state, loading: true };
    case DataElementActionTypes.LOAD_DATA_ELEMENT_SUCCESS:
    case DataElementActionTypes.ADD_DATA_ELEMENT:
      return adapter.addOne(action.payload, { ...state, loaded: true });
  }

  return state;
}

export const getDataElementState = (state: State) => state;
export const getDataElementEntitiesState = createSelector(
  getDataElementState,
  state => state
);
export const getDataElementLoadedState = (state: State) => state.loaded;
export const getDataElementLoadingState = (state: State) => state.loading;
export const {
  selectAll: getAllDataElementsState,
  selectIds: getDataElementIdsState,
  selectEntities: getDataElementEntititesState,
  selectTotal: getDataElementTotalState
} = adapter.getSelectors(getDataElementEntitiesState);
