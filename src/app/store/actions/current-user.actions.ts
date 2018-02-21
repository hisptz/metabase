import { Action } from '@ngrx/store';
import * as fromCurrentUser from '../reducers/current-user.reducer';
import { CurrentUser } from '@app/core';

export const LOAD = '[Current User] Load current user';

export class LoadAction implements Action {
  readonly type = LOAD;
}

export const LOAD_SUCCESS = '[Current User] Load current user success';

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: CurrentUser) {}
}

export const LOAD_FAIL = '[Current User] Load current user fail';

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;
}

export type CurrentUserActions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
