import { EntityState } from '@ngrx/entity';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromMetadata from './metadata.reducer';
import * as fromDataElement from './data-element.reducer';
import * as fromIndicator from './indicator.reducer';
import * as fromIndicatorType from './indicator-type.reducer';
import * as fromOrganisationUnit from './organisation-unit.reducer';
export interface State {
  metadataObject: fromMetadata.State;
  dataElement: fromDataElement.State;
  indicator: fromIndicator.State;
  indicatorType: fromIndicatorType.State;
  organisationUnit: fromOrganisationUnit.State;
}

export const reducers: ActionReducerMap<State> = {
  metadataObject: fromMetadata.reducer,
  dataElement: fromDataElement.reducer,
  indicator: fromIndicator.reducer,
  indicatorType: fromIndicatorType.reducer,
  organisationUnit: fromOrganisationUnit.reducer
};

export const getMetadataState = createFeatureSelector<State>('metadata');

/**
 * General metadata object selectors
 */

export const getMetadataObjectState = createSelector(
  getMetadataState,
  (state: State) => state.metadataObject
);

export const {
  selectAll: getAllMetadataState,
  selectIds: getMetadataIdsState,
  selectEntities: getMetadataEntitiesState,
  selectTotal: getMetadataTotalState
} = fromMetadata.adapter.getSelectors(getMetadataObjectState);
