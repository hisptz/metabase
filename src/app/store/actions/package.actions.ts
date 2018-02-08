import { Package } from '@app/core';
import { Action } from '@ngrx/store';
export enum PackageActionTypes {
  ADD_PACKAGES = '[Package] Add packages',
  SET_CURRENT_PACKAGE = '[Package] Set current package'
}

export class AddPackagesAction implements Action {
  readonly type = PackageActionTypes.ADD_PACKAGES;
  constructor(public payload: Package[]) {}
}

export class SetCurrentPackageAction implements Action {
  readonly type = PackageActionTypes.SET_CURRENT_PACKAGE;
  constructor(public payload: string | number) {}
}

export type PackageActions = AddPackagesAction | SetCurrentPackageAction;
