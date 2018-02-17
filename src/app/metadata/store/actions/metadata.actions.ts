import { Action } from '@ngrx/store';
import { Metadata } from '../../models/metadata';

export enum MetadataActionTypes {
  INITIALIZE_METADATA = '[Metadata] Initialize metadata',
  LOAD_METADATA = '[Metadata] Load metadata',
  LOAD_METADATA_SUCCESS = '[Metadata] Load metadata success',
  LOAD_METADATA_FAIL = '[Metadata] Load metadata fail',
  SET_CURRENT_METADATA = '[Metadata] Set current metadata',
  SET_CURRENT_METADATA_ITEM = '[Metadata] Set current metadata item',
  CLEAR_CURRENT_METADATA_ITEM = '[Metadata] Clear current metadata item',
  IMPORT_METADATA = '[Metadata] import metadata',
  IMPORT_METADATA_SUCCESS = '[Metadata] import metadata success',
  IMPORT_METADATA_FAIL = '[Metadata] import metadata fail',
  TOGGLE_METADATA_IMPORT_SUMMARY = '[Metadata] show/hide metadata import summary',
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

export class ImportMetadataAction implements Action {
  readonly type = MetadataActionTypes.IMPORT_METADATA;
  constructor(public payload: {
    id: string;
    dryRun: boolean;
    metadata: any;
  }) {}
}

export class ImportMetadataSuccessAction implements Action {
  readonly type = MetadataActionTypes.IMPORT_METADATA_SUCCESS;
  constructor(public payload: {
    id: string;
    changes: Partial<Metadata>;
  }) {}
}

export class ImportMetadataFailAction implements Action {
  readonly type = MetadataActionTypes.IMPORT_METADATA_FAIL;
  constructor(public payload: any) {}
}

export class ToggleMetadataImportSummaryAction implements Action {
  readonly type = MetadataActionTypes.TOGGLE_METADATA_IMPORT_SUMMARY;

  constructor(public payload: {
    id: string;
    changes: Partial<Metadata>;
  }) {
  }
}

export type MetadataAction =
  | InitializeMetadataAction
  | LoadMetadataAction
  | LoadMetadataSuccessAction
  | LoadMetadataFailAction
  | SetCurrentMetadataAction
  | SetCurrentMetadataItemAction
  | ClearCurrentMetadataItemAction
  | ImportMetadataAction
  | ImportMetadataSuccessAction
  | ImportMetadataFailAction
  | ToggleMetadataImportSummaryAction;
