import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import * as fromCurrentUserActions from '../actions/current-user.actions';
import * as fromCore from '@app/core';

@Injectable()
export class CurrentUserEffects {
  constructor(private actions$: Actions,
    private currentUserService: fromCore.CurrentUserService) {
  }

  @Effect()
  loadCurrentUser$ = this.actions$
    .ofType(fromCurrentUserActions.CurrentUserActionTypes.LOAD_USER)
    .pipe(
      switchMap(() =>
        this.currentUserService
          .loadUser()
          .pipe(
            map(
              (currentUser: fromCore.CurrentUser) =>
                new fromCurrentUserActions.AddUserAction(currentUser)
            ),
            catchError(error =>
              of(new fromCurrentUserActions.LoadUserFailAction())
            )
          )
      )
    );
}
