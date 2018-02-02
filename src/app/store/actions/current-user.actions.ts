import {Action} from '@ngrx/store';
import {CurrentUser} from '@app/core';


export enum CurrentUserActionTypes {
  LOAD_USER = '[Current User] Load current user',
  ADD_USER = '[Current User] Add current user',
  LOAD_USER_FAIL = '[Current User] Load current user fail'
}

export class LoadUserAction implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER;
}

export class AddUserAction implements Action {
  readonly type = CurrentUserActionTypes.ADD_USER;

  constructor(public payload: CurrentUser) {}
}

export class LoadUserFailAction implements Action {
  readonly type = CurrentUserActionTypes.LOAD_USER_FAIL;
}

export type CurrentUserActions = LoadUserAction | AddUserAction | LoadUserFailAction;
