import * as _ from 'lodash';
export function getImportSummaryForSpecificMetadata(importCountPerMetadata: Array<{type: string, count: any}>, metadataType: string) {
  const availableSummary = _.find(importCountPerMetadata, ['type', metadataType[0].toUpperCase() + metadataType.slice(1, -1)]);
  return availableSummary ? availableSummary.count : null;
}
