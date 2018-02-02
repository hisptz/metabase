import { AppPackage } from '@app/core';
import { Action } from '@ngrx/store';
export enum AppPackageActionTypes {
  ADD_APP_PACKAGES = '[AppPackage] Add app packages'
}

export class AddAppPackagesAction implements Action {
  readonly type = AppPackageActionTypes.ADD_APP_PACKAGES;
  constructor(public payload: AppPackage[]) {}
}

export type AppPackageActions = AddAppPackagesAction;
