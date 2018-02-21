import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { map, tap } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as fromActions from '../actions';
import * as fromMetadataActions from '@app/metadata';

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

  @Effect({ dispatch: false })
  importSuccess$ = this.actions$
    .ofType(fromMetadataActions.MetadataActionTypes.IMPORT_METADATA_SUCCESS)
    .pipe(
      tap((action: any) => {
        const splitedMetadataId = action.payload.id.split('_');
        const importStatus = action.payload.changes.importSummary.status;
        this.store.dispatch(
          new fromActions.UpdateMetadataPackageImportStatusAction({
            id: splitedMetadataId[0],
            changes: {
              importing: false,
              imported: true,
              hasConflictOnImport:
                importStatus && importStatus.toLowerCase() !== 'ok'
                  ? true
                  : false,
              importedVersion: parseFloat(splitedMetadataId[1])
            }
          })
        );
      })
    );

  @Effect({ dispatch: false })
  importFail$ = this.actions$
    .ofType(fromMetadataActions.MetadataActionTypes.IMPORT_METADATA_FAIL)
    .pipe(
      tap((action: any) => {
        const splitedMetadataId = action.payload.id.split('_');
        this.store.dispatch(
          new fromActions.UpdateMetadataPackageImportStatusAction({
            id: splitedMetadataId[0],
            changes: {
              importing: false,
              imported: false,
              importError: action.payload.importError
            }
          })
        );
      })
    );
}
