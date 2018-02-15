import { Action } from '@ngrx/store';
import { Metadata } from '../../models/metadata';
import { Update } from '@ngrx/entity';

export enum MetadataActionTypes {
  INITIALIZE_METADATA = '[Metadata] Initialize metadata',
  LOAD_METADATA = '[Metadata] Load metadata',
  LOAD_METADATA_SUCCESS = '[Metadata] Load metadata success',
  LOAD_METADATA_FAIL = '[Metadata] Load metadata fail',
  SET_CURRENT_METADATA = '[Metadata] Set current metadata',
  SET_CURRENT_METADATA_ITEM = '[Metadata] Set current metadata item',
  CLEAR_CURRENT_METADATA_ITEM = '[Metadata] Clear current metadata item',
}

export class InitializeMetadataAction implements Action {
  readonly type = MetadataActionTypes.INITIALIZE_METADATA;

  constructor(public payload: Metadata) {
  }
}

export class LoadMetadataAction implements Action {
  readonly type = MetadataActionTypes.LOAD_METADATA;

  constructor(public payload: Metadata) {
  }
}

export class LoadMetadataSuccessAction implements Action {
  readonly type = MetadataActionTypes.LOAD_METADATA_SUCCESS;

  constructor(public payload: {
    id: string;
    changes: Partial<Metadata>;
  }) {
  }
}

export class LoadMetadataFailAction implements Action {
  readonly type = MetadataActionTypes.LOAD_METADATA_FAIL;

  constructor(public payload: any) {
  }
}

export class SetCurrentMetadataAction implements Action {
  readonly type = MetadataActionTypes.SET_CURRENT_METADATA;

  constructor(public payload: string) {
  }
}

export class SetCurrentMetadataItemAction implements Action {
  readonly type = MetadataActionTypes.SET_CURRENT_METADATA_ITEM;

  constructor(public payload: string) {
  }
}

export class ClearCurrentMetadataItemAction implements Action {
  readonly type = MetadataActionTypes.CLEAR_CURRENT_METADATA_ITEM;
}

export type MetadataAction =
  | InitializeMetadataAction
  | LoadMetadataAction
  | LoadMetadataSuccessAction
  | LoadMetadataAction
  | SetCurrentMetadataAction
  | SetCurrentMetadataItemAction
  | ClearCurrentMetadataItemAction;
