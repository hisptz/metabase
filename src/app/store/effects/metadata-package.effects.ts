import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromCore from '@app/core';
import * as fromRoot from '../reducers';
import * as fromActions from '../actions/metadata-package.actions';



@Injectable()
export class MetadataPackageEffects {
  constructor(private actions$: Actions, private store: Store<fromRoot.State>,  private metadataPackageService: fromCore.MetadataPackageService) {
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
}
