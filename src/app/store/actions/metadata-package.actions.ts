import { MetadataPackage } from '@app/core';
import { Action } from '@ngrx/store';

export enum MetadataPackageActionTypes {
  ADD_METADATA_PACKAGES = '[MetadataPackage] Add metadata packages',
  SET_CURRENT_METADATA_PACKAGE = '[MetadataPackage] Set current metadata packages',
  SET_CURRENT_METADATA_PACKAGE_VERSION = '[MetadataPackage] Set current metadata package version'
}

export class AddMetadataPackagesAction implements Action {
  readonly type = MetadataPackageActionTypes.ADD_METADATA_PACKAGES;
  constructor(public payload: MetadataPackage[]) {}
}

export class SetCurrentMetadataPackageAction implements Action {
  readonly type = MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE;
  constructor(
    public payload: {
      currentMetadataPackage: string;
      currentMetadataPackageVersion: number;
    }
  ) {}
}

export class SetCurrentMetadataPackageVersionAction implements Action {
  readonly type = MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE_VERSION;
  constructor(public payload: number) {}
}

export type MetadataPackageActions =
  | AddMetadataPackagesAction
  | SetCurrentMetadataPackageAction
  | SetCurrentMetadataPackageVersionAction;
