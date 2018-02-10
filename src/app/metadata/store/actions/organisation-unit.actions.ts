import { Action } from '@ngrx/store';
import { OrganisationUnit } from '../../models';

export enum OrganisationUnitActionTypes {
  LOAD_ORGANISATION_UNIT = '[OrganisationUnit] Load OrganisationUnit',
  LOAD_ORGANISATION_UNIT_SUCCESS = '[OrganisationUnit] Load OrganisationUnit success',
  LOAD_ORGANISATION_UNIT_FAIL = '[OrganisationUnit] Load OrganisationUnit fail',
  ADD_ORGANISATION_UNIT = '[OrganisationUnit] Add OrganisationUnit'
}

export class LoadOrganisationUnitAction implements Action {
  readonly type = OrganisationUnitActionTypes.LOAD_ORGANISATION_UNIT;
  constructor(public payload: string) {}
}

export class LoadOrganisationUnitSuccessAction implements Action {
  readonly type = OrganisationUnitActionTypes.LOAD_ORGANISATION_UNIT_SUCCESS;
  constructor(public payload: OrganisationUnit) {}
}

export class LoadOrganisationUnitFailAction implements Action {
  readonly type = OrganisationUnitActionTypes.LOAD_ORGANISATION_UNIT_FAIL;
  constructor(public payload: any) {}
}

export class AddOrganisationUnitAction implements Action {
  readonly type = OrganisationUnitActionTypes.ADD_ORGANISATION_UNIT;
  constructor(public payload: OrganisationUnit) {}
}

export type OrganisationUnitAction =
  | LoadOrganisationUnitAction
  | LoadOrganisationUnitSuccessAction
  | LoadOrganisationUnitSuccessAction
  | AddOrganisationUnitAction;
