import { MetadataPackage } from '@app/core';
import { Action } from '@ngrx/store';

export enum MetadataPackageActionTypes {
  LOAD_METADATA_PACKAGES = '[MetadataPackage] Load metadata packages',
  LOAD_METADATA_PACKAGES_SUCCESS = '[MetadataPackage] Load metadata packages success',
  LOAD_METADATA_PACKAGES_FAIL = '[MetadataPackage] Load metadata packages fail',
  ADD_METADATA_PACKAGE = '[MetadataPackage] Add metadata package',
  SET_CURRENT_METADATA_PACKAGE = '[MetadataPackage] Set current metadata packages',
  SET_CURRENT_METADATA_PACKAGE_VERSION = '[MetadataPackage] Set current metadata package version',
  UPDATE_METADATA_PACKAGE_IMPORT_STATUS = '[Metadata] update metadata package import status',
}

export class LoadMetadataPackagesAction implements Action {
  readonly type = MetadataPackageActionTypes.LOAD_METADATA_PACKAGES;
  constructor(public metadataPackageRepositoryUrl: string) {}
}

export class LoadMetadataPackagesSuccessAction implements Action {
  readonly type = MetadataPackageActionTypes.LOAD_METADATA_PACKAGES_SUCCESS;
  constructor(public metadataPackages: MetadataPackage[]) {
  }
}

export class LoadMetadataPackagesFailAction implements Action {
  readonly type = MetadataPackageActionTypes.LOAD_METADATA_PACKAGES_FAIL;
}

export class AddMetadataPackageAction implements Action {
  readonly type = MetadataPackageActionTypes.ADD_METADATA_PACKAGE;

  constructor(public metadataPackage: MetadataPackage) {
  }
}

export class SetCurrentMetadataPackageAction implements Action {
  readonly type = MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE;

  constructor(public currentMetadataPackage: string, public currentMetadataPackageVersion: number) {
  }
}

export class SetCurrentMetadataPackageVersionAction implements Action {
  readonly type = MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE_VERSION;

  constructor(public metadataPackageVersion: number) {
  }
}

export class UpdateMetadataPackageImportStatusAction implements Action {
  readonly type = MetadataPackageActionTypes.UPDATE_METADATA_PACKAGE_IMPORT_STATUS;

  constructor(public id: string, public changes: Partial<MetadataPackage>) {
  }
}

export type MetadataPackageActions =
  | LoadMetadataPackagesSuccessAction
  | LoadMetadataPackagesFailAction
  | LoadMetadataPackagesAction
  | AddMetadataPackageAction
  | SetCurrentMetadataPackageAction
  | SetCurrentMetadataPackageVersionAction
  | UpdateMetadataPackageImportStatusAction;
