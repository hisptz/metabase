import { Action } from '@ngrx/store';
import { DataElement } from '../../models';

export enum DataElementActionTypes {
  LOAD_DATA_ELEMENT = '[DataElement] Load indicator',
  LOAD_DATA_ELEMENT_SUCCESS = '[DataElement] Load indicator success',
  LOAD_DATA_ELEMENT_FAIL = '[DataElement] Load indicator fail',
  ADD_DATA_ELEMENT = '[DataElement] Add indicator'
}

export class LoadDataElementAction implements Action {
  readonly type = DataElementActionTypes.LOAD_DATA_ELEMENT;
  constructor(public payload: string) {}
}

export class LoadDataElementSuccessAction implements Action {
  readonly type = DataElementActionTypes.LOAD_DATA_ELEMENT_SUCCESS;
  constructor(public payload: DataElement) {}
}

export class LoadDataElementFailAction implements Action {
  readonly type = DataElementActionTypes.LOAD_DATA_ELEMENT_FAIL;
  constructor(public payload: any) {}
}

export class AddDataElementAction implements Action {
  readonly type = DataElementActionTypes.ADD_DATA_ELEMENT;
  constructor(public payload: DataElement) {}
}

export type DataElementAction =
  | LoadDataElementAction
  | LoadDataElementSuccessAction
  | LoadDataElementSuccessAction
  | AddDataElementAction;
