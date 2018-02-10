import { SetCurrentMetadataPackageAction } from './../actions/metadata-package.actions';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { tap } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as fromActions from '../actions';
@Injectable()
export class MetadataPackageEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>
  ) {}

  @Effect({ dispatch: false })
  routerNavigation$ = this.actions$
    .ofType(ROUTER_NAVIGATION)
    .withLatestFrom(this.store)
    .pipe(
      tap(([action, state]: [any, fromRoot.State]) => {
        const currentPackage = state.packageObject.currentPackage;
        const routeUrl = state.route.state;

        if (routeUrl && routeUrl.url) {
          const splitedUrl = routeUrl.url.split('/');

          if (
            splitedUrl.length > 2 &&
            splitedUrl[1] === 'metadata-package-details'
          ) {
            if (currentPackage === '') {
              this.store.dispatch(
                new fromActions.SetCurrentMetadataPackageAction({
                  currentMetadataPackage: splitedUrl[2],
                  currentMetadataPackageVersion: parseFloat(splitedUrl[3])
                })
              );
            }
          }
        }
      })
    );
}
