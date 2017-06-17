import {Action} from "@ngrx/store";
export const LOAD_REPOSITORIES_ACTION = 'LOAD_REPOSITORIES_ACTION';
export const REPOSITORIES_LOADED_ACTION = 'REPOSITORIES_LOADED_ACTION';
export const UPDATE_REPOSITORIES_ACTION = 'UPDATE_REPOSITORIES_ACTION';
export const REPOSITORIES_UPDATED_ACTION = 'REPOSITORIES_UPDATED_ACTION';
export const ADD_REPOSITORIES_ACTION = 'ADD_REPOSITORIES_ACTION';
export const REPOSITORIES_ADDED_ACTION = 'REPOSITORIES_ADDED_ACTION';
export const REMOVE_REPOSITORIES_ACTION = 'REMOVE_REPOSITORIES_ACTION';
export const REPOSITORIES_REMOVED_ACTION = 'REPOSITORIES_REMOVED_ACTION';
export const LOAD_METADATA_PACKAGES_ACTION = 'LOAD_METADATA_PACKAGES_ACTION';
export const UPDATE_METADATA_PACKAGES_ACTION = 'UPDATE_METADATA_PACKAGES_ACTION';
export const METADATA_PACKAGES_LOADED_ACTION = 'METADATA_PACKAGES_LOADED_ACTION';
export const LOAD_IMPORTED_METADATA_PACKAGES_ACTION = 'LOAD_IMPORTED_METADATA_PACKAGES_ACTION';
export const ADD_IMPORTED_METADATA_PACKAGES_ACTION = 'ADD_IMPORTED_METADATA_PACKAGES_ACTION';
export const IMPORTED_METADATA_PACKAGES_ADDED_ACTION = 'IMPORTED_METADATA_PACKAGES_ADDED_ACTION';
export const IMPORTED_METADATA_PACKAGES_LOADED_ACTION = 'IMPORTED_METADATA_PACKAGES_LOADED_ACTION';
export const CURRENT_METADATA_PACKAGE_CHANGE_ACTION = 'CURRENT_METADATA_PACKAGE_CHANGE_ACTION';
export const LOAD_METADATA_ACTION = 'LOAD_METADATA_ACTION';
export const METADATA_LOADED_ACTION = 'METADATA_LOADED_ACTION';
export const METADATA_UPDATED_ACTION = 'METADATA_UPDATED_ACTION';
export const ERROR_OCCURRED_ACTION = 'ERROR_OCCURRED_ACTION';
export const CLEAR_MESSAGE_ACTION = 'CLEAR_MESSAGE_ACTION';
export const QUERY_PARAMS_CHANGE_ACTION = 'QUERY_PARAMS_CHANGE_ACTION';
export const CHECK_METADATA_EXISTENCE_ACTION = 'CHECK_METADATA_EXISTENCE_ACTION';
export const METADATA_EXISTENCE_CHECKED_ACTION = 'METADATA_EXISTENCE_CHECKED_ACTION';
export const UPDATE_METADATA_WITH_DEPENDENCY_ACTION = 'UPDATE_METADATA_WITH_DEPENDENCY_ACTION';
export const METADATA_WITH_DEPENDENCY_UPDATED_ACTION = 'METADATA_WITH_DEPENDENCY_UPDATED_ACTION';
export const GET_METADATA_IMPORTABLE_VERSION_ACTION = 'GET_METADATA_IMPORTABLE_VERSION_ACTION';
export const METADATA_IMPORT_PREVIEW_ACTION = 'METADATA_IMPORT_PREVIEW_ACTION';
export const METADATA_IMPORT_PREVIEW_COMPLETED_ACTION = 'METADATA_IMPORT_PREVIEW_COMPLETED_ACTION';
export const METADATA_IMPORT_ACTION = 'METADATA_IMPORT_ACTION';
export const METADATA_IMPORT_COMPLETED_ACTION = 'METADATA_IMPORT_COMPLETED_ACTION';

export class LoadRepositoriesAction implements Action {
  readonly type = LOAD_REPOSITORIES_ACTION;
}

export class RepositoriesLoadedAction implements Action {
  readonly type = REPOSITORIES_LOADED_ACTION;
  constructor(public payload: any) {

  }
}

export class ErrorOccurredAction implements Action {
  readonly type = ERROR_OCCURRED_ACTION;
  constructor(public payload: string) {}
}

export class UpdateRepositoriesAction implements Action {
  readonly type = UPDATE_REPOSITORIES_ACTION;
  constructor(public payload: any) {

  }
}

export class AddRepositoriesAction implements Action {
  readonly type = ADD_REPOSITORIES_ACTION;
  constructor(public payload: any) {

  }
}

export class RemoveRepositoriesAction implements Action {
  readonly type = REMOVE_REPOSITORIES_ACTION;
  constructor(public payload: any) {

  }
}

export class RepositoriesUpdatedAction implements Action {
  readonly type = REPOSITORIES_UPDATED_ACTION;
  constructor(public payload: any) {}
}

export class RepositoriesAddedAction implements Action {
  readonly type = REPOSITORIES_ADDED_ACTION;
  constructor(public payload: any) {}
}

export class RepositoriesRemovedAction implements Action {
  readonly type = REPOSITORIES_REMOVED_ACTION;
  constructor(public payload: any) {}
}

export class LoadMetadataPackagesAction implements Action {
  readonly type = LOAD_METADATA_PACKAGES_ACTION;
  constructor(public payload: any) {}
}

export class LoadImportedMetadataPackagesAction implements Action {
  readonly type = LOAD_IMPORTED_METADATA_PACKAGES_ACTION;
}

export class ImportedMetadataPackagesLoadedAction implements Action {
  readonly type = IMPORTED_METADATA_PACKAGES_LOADED_ACTION;
  constructor(public payload: any) {}
}

export class MetadataPackagesLoadedAction implements Action {
  readonly type = METADATA_PACKAGES_LOADED_ACTION;
  constructor(public payload: any) {}
}

export class CurrentMetadataPackageChangeAction implements Action {
  readonly type = CURRENT_METADATA_PACKAGE_CHANGE_ACTION;
  constructor(public payload: any) {}
}

export class LoadMetadataAction implements Action {
  readonly type = LOAD_METADATA_ACTION;
  constructor(public payload: any) {}
}

export class MetadataLoadedAction implements Action {
  readonly type = METADATA_LOADED_ACTION;
  constructor(public payload: any) {}
}

export class ClearMessageAction implements  Action{
  readonly type = CLEAR_MESSAGE_ACTION;
}

export class AddImportedMetadataPackagesAction implements Action {
  readonly type = ADD_IMPORTED_METADATA_PACKAGES_ACTION;
  constructor(public payload: any) {}
}

export class ImportedMetadataPackagesAddedAction implements Action {
  readonly type = IMPORTED_METADATA_PACKAGES_ADDED_ACTION;
  constructor(public payload: any) {}
}

export class QueryParamsChangeAction implements Action {
  readonly type = QUERY_PARAMS_CHANGE_ACTION;
  constructor(public payload: any) {}
}

export class UpdateMetadataPackageAction implements Action {
  readonly type = UPDATE_METADATA_PACKAGES_ACTION;
  constructor(public payload: any) {}
}

export class CheckMetadataExistenceAction implements Action {
  readonly type = CHECK_METADATA_EXISTENCE_ACTION;
  constructor(public payload: any) {}
}

export class MetadataExistenceCheckedAction implements Action {
  readonly type = METADATA_EXISTENCE_CHECKED_ACTION;
  constructor(public payload: any) {}
}

export class UpdateMetadataWithDependencyAction implements Action {
  readonly type = UPDATE_METADATA_WITH_DEPENDENCY_ACTION;
  constructor(public payload: any) {}
}

export class MetadataWithDependencyUpdatedAction implements Action {
  readonly type = METADATA_WITH_DEPENDENCY_UPDATED_ACTION;
  constructor(public payload: any) {};
}

export class MetadataUpdatedAction implements Action {
  readonly type = METADATA_UPDATED_ACTION;
  constructor(public payload: any) {}
}

export class GetMetadataImportableVersionAction implements Action {
  readonly type = GET_METADATA_IMPORTABLE_VERSION_ACTION;
  constructor(public payload: any) {}
}

export class MetadataImportPreviewAction implements Action {
  readonly type = METADATA_IMPORT_PREVIEW_ACTION;
  constructor(public payload: any) {}
}

export class MetadataImportPreviewCompletedAction implements Action {
  readonly type = METADATA_IMPORT_PREVIEW_COMPLETED_ACTION;
  constructor(public payload: any) {}
}

export class MetadataImportAction implements Action {
  readonly type = METADATA_IMPORT_ACTION;
  constructor(public payload: any) {}
}

export class MetadataImportCompletedAction implements Action {
  readonly type = METADATA_IMPORT_COMPLETED_ACTION;
  constructor(public payload: any) {}
}



