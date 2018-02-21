import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/withLatestFrom';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromCore from '@app/core';
import * as fromRoot from '../reducers';
import * as fromActions from '../actions/metadata-package.actions';
import * as fromMetadata from '@app/metadata';
import { MetadataPackage } from '@app/core';


@Injectable()
export class MetadataPackageEffects {
  constructor(private actions$: Actions, private store: Store<fromRoot.State>,
    private metadataPackageService: fromCore.MetadataPackageService) {
  }

  @Effect()
  loadMetadataPackages$ = this.actions$.ofType(fromActions.MetadataPackageActionTypes.LOAD_METADATA_PACKAGES).pipe(
    flatMap((action: fromActions.LoadMetadataPackagesAction) => this.metadataPackageService.load(
      action.metadataPackageRepositoryUrl).pipe(
      map((metadataPackages: fromCore.MetadataPackage[]) => new fromActions.LoadMetadataPackagesSuccessAction(
        metadataPackages)),
      catchError((error) => of(new fromActions.LoadMetadataPackagesFailAction()))
    )));

  @Effect({dispatch: false})
  loadMetadataPackageSuccess$ = this.actions$.ofType(
    fromActions.MetadataPackageActionTypes.LOAD_METADATA_PACKAGES_SUCCESS).
    pipe(tap((action: fromActions.LoadMetadataPackagesSuccessAction) => {
      _.each(action.metadataPackages, (metadataPackage: fromCore.MetadataPackage) => {
        this.store.dispatch(new fromActions.AddMetadataPackageAction(metadataPackage));
      });
    }));

  @Effect({dispatch: false})
  routerNavigation$ = this.actions$.ofType(ROUTER_NAVIGATION).withLatestFrom(this.store).pipe(
    tap(([action, state]: [any, fromRoot.State]) => {
      const routeUrl = state.route.state;

      if (routeUrl && routeUrl.url) {
        const splitedUrl = routeUrl.url.split('/');

        if (
          splitedUrl.length > 2 &&
          splitedUrl[1] === 'metadata-package'
        ) {
          this.store.dispatch(
            new fromActions.SetCurrentMetadataPackageAction(
              splitedUrl[2], parseFloat(splitedUrl[3])
            )
          );
        }
      }
    })
  );

  @Effect({dispatch: false})
  addMetadataPackage$ = this.actions$.ofType(
    fromActions.MetadataPackageActionTypes.ADD_METADATA_PACKAGE).withLatestFrom(this.store).
    pipe(tap(([action, state]: [fromActions.AddMetadataPackageAction, fromRoot.State]) => {
      const metadataPackage: MetadataPackage = action.metadataPackage;
      if (metadataPackage.id === state.metadataPackage.currentMetadataPackage) {
        this.store.dispatch(
          new fromMetadata.SetCurrentMetadataAction(metadataPackage.id + '_' + state.metadataPackage.currentMetadataPackageVersion,
            fromCore.getVersionUrlFromVersionArray(action.metadataPackage.versions,
              state.metadataPackage.currentMetadataPackageVersion)));
      }

    }));

  @Effect({dispatch: false})
  setCurrentMetadataPackage$ = this.actions$.ofType(
    fromActions.MetadataPackageActionTypes.SET_CURRENT_METADATA_PACKAGE).withLatestFrom(this.store).
    pipe(tap(([action, state]: [fromActions.SetCurrentMetadataPackageAction, fromRoot.State]) => {
      const currentMetadataPackage: MetadataPackage = state.metadataPackage.entities[action.currentMetadataPackage];

      if (currentMetadataPackage) {
        this.store.dispatch(
          new fromMetadata.SetCurrentMetadataAction(currentMetadataPackage.id + '_' + action.currentMetadataPackageVersion,
            fromCore.getVersionUrlFromVersionArray(currentMetadataPackage.versions,
              action.currentMetadataPackageVersion)));
      }
    }));
}
