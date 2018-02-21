import { Action } from '@ngrx/store';
import { MetadataPackageRepository } from '@app/core';

export enum MetadataPackageRepositoryActionTypes {
  'LOAD_METADATA_PACKAGE_REPOSITORIES' = '[MetadataPackageRepository] Load metadata package repositories',
  'LOAD_METADATA_PACKAGE_REPOSITORIES_SUCCESS' = '[MetadataPackageRepository] Load metadata package repositories success',
  'LOAD_METADATA_PACKAGE_REPOSITORIES_FAIL' = '[MetadataPackageRepository] Load metadata package repositories fail',
  'ADD_METADATA_PACKAGE_REPOSITORY' = '[MetadataPackageRepository] Add metadata package repository',
  'UDPATE_METADATA_PACKAGE_REPOSITORY' = '[MetadataPackageRepository] Update metadata package repository',
  'DELETE_METADATA_PACKAGE_REPOSITORY' = '[MetadataPackageRepository] Delete metadata package repository',
}

export class LoadMetadataPackageRepositoriesAction implements Action {
  readonly type = MetadataPackageRepositoryActionTypes.LOAD_METADATA_PACKAGE_REPOSITORIES;
}

export class LoadMetadataPackageRepositoriesSuccessAction implements Action {
  readonly type = MetadataPackageRepositoryActionTypes.LOAD_METADATA_PACKAGE_REPOSITORIES_SUCCESS;
}

export class LoadMetadataPackageRepositoriesFailAction implements Action {
  readonly type = MetadataPackageRepositoryActionTypes.LOAD_METADATA_PACKAGE_REPOSITORIES_FAIL;
}

export class AddMetadataPackageRepositoryAction implements Action {
  readonly type = MetadataPackageRepositoryActionTypes.ADD_METADATA_PACKAGE_REPOSITORY;

  constructor(public metadataPackageRepository: MetadataPackageRepository) {
  }
}

export type MetadataPackageRepositoryAction =
  | AddMetadataPackageRepositoryAction
  | LoadMetadataPackageRepositoriesAction
  | LoadMetadataPackageRepositoriesSuccessAction
  | LoadMetadataPackageRepositoriesFailAction;
