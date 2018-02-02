import { MetadataPackage } from './../../core/models/metadata-package';
import { Action } from '@ngrx/store';

export enum MetadataPackageActionTypes {
  ADD_METADATA_PACKAGES = '[MetadataPackage] Add metadata packages'
}

export class AddMetadataPackagesAction implements Action {
  readonly type = MetadataPackageActionTypes.ADD_METADATA_PACKAGES;
  constructor(public payload: MetadataPackage[]) {}
}

export type MetadataPackageActions = AddMetadataPackagesAction;
