import { Action } from '@ngrx/store';
import { IndicatorType } from '../../models';

export enum IndicatorTypeActionTypes {
  LOAD_INDICATOR_TYPE = '[IndicatorType] Load indicator type',
  LOAD_INDICATOR_TYPE_SUCCESS = '[IndicatorType] Load indicator type success',
  LOAD_INDICATOR_TYPE_FAIL = '[IndicatorType] Load indicator type fail',
  ADD_INDICATOR_TYPE = '[IndicatorType] Add indicator type'
}

export class LoadIndicatorTypeAction implements Action {
  readonly type = IndicatorTypeActionTypes.LOAD_INDICATOR_TYPE;
  constructor(public payload: string) {}
}

export class LoadIndicatorTypeSuccessAction implements Action {
  readonly type = IndicatorTypeActionTypes.LOAD_INDICATOR_TYPE_SUCCESS;
  constructor(public payload: IndicatorType) {}
}

export class LoadIndicatorTypeFailAction implements Action {
  readonly type = IndicatorTypeActionTypes.LOAD_INDICATOR_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class AddIndicatorTypeAction implements Action {
  readonly type = IndicatorTypeActionTypes.ADD_INDICATOR_TYPE;
  constructor(public payload: IndicatorType) {}
}

export type IndicatorTypeAction =
  | LoadIndicatorTypeAction
  | LoadIndicatorTypeSuccessAction
  | LoadIndicatorTypeSuccessAction
  | AddIndicatorTypeAction;
