import { MetadataPackage } from './../../core/models/metadata-package';
import { Action } from '@ngrx/store';

export enum MetadataPackageActionTypes {
  ADD_METADATA_PACKAGES = '[MetadataPackage] Add metadata packages',
  SET_CURRENT_METADATA_PACKAGE = '[MetadataPackage] Set current metadata packages'
}

export class AddMetadataPackagesAction implements Action {
  readonly type = MetadataPackageActionTypes.ADD_METADATA_PACKAGES;
  constructor(public payload: MetadataPackage[]) {}
}

export class SetCurrentMetadataPackageAction implements Action {
  readonly type = MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE;
  constructor(public payload: string) {}
}

export type MetadataPackageActions =
  | AddMetadataPackagesAction
  | SetCurrentMetadataPackageAction;
