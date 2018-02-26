import * as fromConstants from '../constants';

export function getCompiledImportSummary(response, dryRun) {
  return {
    isPreview: dryRun,
    completed: true,
    status: response.status,
    overallImportCounts: response.stats ? response.stats : response.importCount,
    importCountsPerMetadata: getImportCountPerMetadata(
      response.typeReports ? response.typeReports : response.importTypeSummaries
    ),
    importConflicts: getCompiledImportConflicts(
      response.typeReports ? response.typeReports : response.importTypeSummaries
    )
  };
}

function getImportCountPerMetadata(importSummary) {
  const compiledImportCount: Array<any> = [];
  if (importSummary) {
    importSummary.forEach((summaryItem, summaryKey) => {
      compiledImportCount[summaryKey] = {
        type: getImportSummaryType(summaryItem),
        count: summaryItem.stats ? summaryItem.stats : summaryItem.importCount
      };
    });
  }
  return compiledImportCount;
}

function getImportSummaryType(summaryItem) {
  const typeKey = summaryItem.klass
    ? summaryItem.klass.split('.').pop()
    : summaryItem.type;
  return fromConstants.METADATA_ALIASES[typeKey]
    ? fromConstants.METADATA_ALIASES[typeKey]
    : typeKey;
}

function getCompiledImportConflicts(importSummary) {
  const conflicts: Array<any> = [];
  // Get conflict summary if exist
  if (importSummary) {
    importSummary.forEach(summaryItem => {
      if (summaryItem.importConflicts) {
        summaryItem.importConflicts.forEach((conflict, summaryKey) => {
          conflicts[summaryKey] = {
            element: conflict.object,
            description: conflict.value,
            type: summaryItem.type
          };
        });
      } else if (summaryItem.objectReports) {
        summaryItem.objectReports.forEach((conflict, summaryKey) => {
          conflicts[summaryKey] = {
            description: conflict.errorReports,
            type: conflict.klass.split('.')[4]
          };
        });
      }
    });
  }
  return conflicts;
}
