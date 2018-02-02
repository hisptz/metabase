import { Package } from '@app/core';
import { Action } from '@ngrx/store';
export enum PackageActionTypes {
  ADD_PACKAGES = '[Package] Add packages'
}

export class AddPackagesAction implements Action {
  readonly type = PackageActionTypes.ADD_PACKAGES;
  constructor(public payload: Package[]) {}
}

export type PackageActions = AddPackagesAction;
