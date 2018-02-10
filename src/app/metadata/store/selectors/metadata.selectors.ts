import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { Metadata } from './../../models/metadata';
import * as fromRoot from '../reducers';
import * as fromMetadata from '../reducers/metadata.reducer';

export const getCurrentMetadataId = createSelector(
  fromRoot.getMetadataObjectState,
  fromMetadata.getCurrentMetadataState
);

export const getCurrentMetadata = createSelector(
  fromRoot.getMetadataEntitiesState,
  getCurrentMetadataId,
  (metadataEntity: { [id: string]: Metadata }, currentMetadataId: string) => {
    const currentMetadata: Metadata = metadataEntity[currentMetadataId];

    return currentMetadata
      ? {
          ...currentMetadata,
          metadataItems: _.map(
            _.keys(currentMetadata.metadataItems),
            metadataItemKey => {
              return {
                id: metadataItemKey,
                name: metadataItemKey,
                items: currentMetadata.metadataItems[metadataItemKey]
              };
            }
          )
        }
      : null;
  }
);
