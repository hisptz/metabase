import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromCore from '@app/core';
import * as fromRoot from '../reducers';
import * as fromActions from '../actions';

@Injectable()
export class MetadataPackageRepositoryEffects {
  constructor(private actions$: Actions,
    private store: Store<fromRoot.State>,
    private metadataPackageRepositoryService: fromCore.MetadataPackageRepositoryService) {
  }

  @Effect({dispatch: false})
  loadMetadataPackageRepositories$ = this.actions$.ofType(
    fromActions.MetadataPackageRepositoryActionTypes.LOAD_METADATA_PACKAGE_REPOSITORIES).pipe(
    tap(() => {
      this.metadataPackageRepositoryService.loadAll().
        subscribe((metadataPackageRepository: fromCore.MetadataPackageRepository) => {
         if (metadataPackageRepository) {
           this.store.dispatch(new fromActions.AddMetadataPackageRepositoryAction(metadataPackageRepository));
           this.store.dispatch(new fromActions.LoadMetadataPackagesAction(metadataPackageRepository.url));
         }
        }, (error) => {
          this.store.dispatch(new fromActions.LoadMetadataPackageRepositoriesFailAction());
        }, () => {
          this.store.dispatch(new fromActions.LoadMetadataPackageRepositoriesSuccessAction());
        });
    })
  );
}
