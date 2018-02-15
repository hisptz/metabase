import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';

import { MetadataService } from './../../services';
import * as fromReducer from '../reducers';
import * as fromActions from '../actions/metadata.actions';
@Injectable()
export class MetadataEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromReducer.State>,
    private metadataService: MetadataService
  ) {}

  @Effect({ dispatch: false })
  loadMetadata$ = this.actions$
    .ofType(fromActions.MetadataActionTypes.LOAD_METADATA)
    .pipe(
      tap((action: fromActions.LoadMetadataAction) => {
        this.metadataService.getMetadata(action.payload.url).subscribe(
          (metadataInfo: any) => {
            const metadataItems = {};
            // _.each(_.keys(metadataInfo), metadataKey => {
            //   metadataItems[metadataKey] = _.map(
            //     metadataInfo[metadataKey],
            //     metadata => metadata.id
            //   );
            // });

            _.each(_.keys(metadataInfo), metadataKey => {
              metadataItems[metadataKey] = metadataInfo[metadataKey];
            });

            /**
             * Update current metadata with loaded items
             */
            this.store.dispatch(
              new fromActions.LoadMetadataSuccessAction({
                id: action.payload.id,
                changes: {
                  loaded: true,
                  loading: false,
                  metadataItems: metadataItems
                }
              })
            );

            /**
             * Update specific metadata info
             */
            // TODO FIND BEST WAY TO SEPARATE METADATA ITEMS BASED ON THEIR TYPES
          },
          error => {
            console.error(error);
          }
        );
      })
    );
}
