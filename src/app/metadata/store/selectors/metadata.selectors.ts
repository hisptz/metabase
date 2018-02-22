import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as helpers from '@app/core';
import * as fromMetadataHelpers from '../../helpers';
import { Metadata } from './../../models/metadata';
import * as fromRoot from '../reducers';
import * as fromMetadata from '../reducers/metadata.reducer';
import * as fromConstants from '../../constants';

export const getCurrentMetadataId = createSelector(
  fromRoot.getMetadataObjectState,
  fromMetadata.getCurrentMetadataState
);

export const getCurrentMetadata = createSelector(
  fromRoot.getMetadataEntitiesState,
  getCurrentMetadataId,
  (metadataEntity: {[id: string]: Metadata}, currentMetadataId: string) => {
    const currentMetadata: Metadata = metadataEntity[currentMetadataId];
    return currentMetadata
      ? {
        ...currentMetadata,
        metadataItems: _.map(
          _.keys(currentMetadata.metadataItems),
          metadataItemKey => {
            return {
              id: metadataItemKey,
              name: helpers.convertCamelCaseToReadable(metadataItemKey),
              importing: currentMetadata.importing,
              previewing: currentMetadata.previewing,
              imported: currentMetadata.imported,
              previewed: currentMetadata.previewed,
              importResult: currentMetadata.importSummary ?
                            fromMetadataHelpers.getImportSummaryForSpecificMetadata(
                              currentMetadata.importSummary.importCountsPerMetadata, metadataItemKey) :
                            null,
              icon:
              fromConstants.METADATA_ICONS[metadataItemKey] ||
              'assets/icons/data.png',
              items: currentMetadata.metadataItems[metadataItemKey]
            };
          }
        )
      }
      : null;
  }
);

export const getCurrentMetadataItemId = createSelector(
  fromRoot.getMetadataObjectState,
  fromMetadata.getCurrentMetadataItemState
);

export const getCurrentMetadataItem = createSelector(
  fromRoot.getMetadataEntitiesState,
  getCurrentMetadataId,
  getCurrentMetadataItemId,
  (metadataEntity, currentMetadataId, currentMetadataItemId) => {
    const currentMetadata: Metadata = metadataEntity[currentMetadataId];
    return currentMetadataItemId !== ''
      ? {
        id: currentMetadataItemId,
        name: helpers.convertCamelCaseToReadable(currentMetadataItemId),
        items: currentMetadata.metadataItems[currentMetadataItemId]
      }
      : null;
  }
);
