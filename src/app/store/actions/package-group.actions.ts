import { Action } from '@ngrx/store';
import { PackageGroup } from '@app/core';

export enum PackageGroupTypes {
  LOAD_PACKAGE_GROUPS = '[PackageGroup] Load',
  LOAD_PACKAGE_GROUPS_FAIL = '[PackageGroup] Load fail',
  LOAD_PACKAGE_GROUPS_SUCCESS = '[PackageGroup] Load success',
  ADD_PACKAGE_GROUPS = '[PackageGroup] Add package groups'
}

export class LoadPackageGroupsAction implements Action {
  readonly type = PackageGroupTypes.LOAD_PACKAGE_GROUPS;
}

export class LoadPackageGroupsSuccessAction implements Action {
  readonly type = PackageGroupTypes.LOAD_PACKAGE_GROUPS_SUCCESS;
  constructor(public payload: any[]) {}
}

export class LoadPackageGroupsFailAction implements Action {
  readonly type = PackageGroupTypes.LOAD_PACKAGE_GROUPS_FAIL;
}

export class AddPackageGroupsAction implements Action {
  readonly type = PackageGroupTypes.ADD_PACKAGE_GROUPS;

  constructor(public payload: PackageGroup[]) {}
}

export type PackageGroupActions =
  | LoadPackageGroupsAction
  | LoadPackageGroupsSuccessAction
  | AddPackageGroupsAction
  | LoadPackageGroupsFailAction;
