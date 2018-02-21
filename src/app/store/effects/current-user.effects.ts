import { CurrentUserService } from './../../core/services/current-user.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromCore from '@app/core';
import * as fromCurrentUserActions from '../actions';
import * as fromCurrentUser from '../reducers/current-user.reducer';

@Injectable()
export class CurrentUserEffects {
  constructor(
    private actions$: Actions,
    private currentUserService: fromCore.CurrentUserService
  ) {}

  @Effect()
  loadCurrentUser$ = this.actions$
    .ofType<fromCurrentUserActions.LoadAction>(fromCurrentUserActions.LOAD)
    .pipe(
      switchMap(() => this.currentUserService.loadUser()),
      map(
        (currentUser: fromCore.CurrentUser) =>
          new fromCurrentUserActions.LoadSuccessAction(currentUser)
      ),
      catchError(error => of(new fromCurrentUserActions.LoadFailAction()))
    );
}
