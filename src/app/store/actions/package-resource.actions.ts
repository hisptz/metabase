import { Action } from '@ngrx/store';
import { PackageResource } from '../../core/models/package-resource';
export enum PackageResourceActionTypes {
  ADD_PACKAGE_RESOURCES = '[PackageResource] Add package resources',
}

export class AddPackageResourcesAction implements  Action {
  readonly type = PackageResourceActionTypes.ADD_PACKAGE_RESOURCES;
  constructor(public packageResources: PackageResource[]) {}
}

export type PackageResourceAction = AddPackageResourcesAction;
