import { EntityState } from '@ngrx/entity';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromDataElement from './data-element.reducer';
import * as fromIndicator from './indicator.reducer';
import * as fromIndicatorType from './indicator-type.reducer';
import * as fromOrganisationUnit from './organisation-unit.reducer';
export interface State {
  // dataElement: fromDataElement.State;
  // indicator: fromIndicator.State;
  // indicatorType: fromIndicatorType.State;
  // organisationUnit: fromOrganisationUnit.State;
}

export const reducers: ActionReducerMap<State> = {
  // dataElement: fromDataElement.reducer,
  // indicator: fromIndicator.reducer,
  // indicatorType: fromIndicatorType.reducer,
  // organisationUnit: fromOrganisationUnit.reducer
};
