import { Action } from '@ngrx/store';
import { Indicator } from '../../models';

export enum IndicatorActionTypes {
  LOAD_INDICATOR = '[Indicator] Load indicator',
  LOAD_INDICATOR_SUCCESS = '[Indicator] Load indicator success',
  LOAD_INDICATOR_FAIL = '[Indicator] Load indicator fail',
  ADD_INDICATOR = '[Indicator] Add indicator'
}

export class LoadIndicatorAction implements Action {
  readonly type = IndicatorActionTypes.LOAD_INDICATOR;
  constructor(public payload: string) {}
}

export class LoadIndicatorSuccessAction implements Action {
  readonly type = IndicatorActionTypes.LOAD_INDICATOR_SUCCESS;
  constructor(public payload: Indicator) {}
}

export class LoadIndicatorFailAction implements Action {
  readonly type = IndicatorActionTypes.LOAD_INDICATOR_FAIL;
  constructor(public payload: any) {}
}

export class AddIndicatorAction implements Action {
  readonly type = IndicatorActionTypes.ADD_INDICATOR;
  constructor(public payload: Indicator) {}
}

export type IndicatorAction =
  | LoadIndicatorAction
  | LoadIndicatorSuccessAction
  | LoadIndicatorSuccessAction
  | AddIndicatorAction;
