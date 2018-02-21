export function getCompiledImportSummary(response, dryRun) {

  return {
    isPreview: dryRun,
    completed: true,
    overallImportCounts: response.stats ? response.stats : response.importCount,
    importCountsPerMetadata: getImportCountPerMetadata(
      response.typeReports ? response.typeReports : response.importTypeSummaries),
    importConflicts: getCompiledImportConflicts(
      response.typeReports ? response.typeReports : response.importTypeSummaries)
  };
}

function getImportCountPerMetadata(importSummary) {
  const compiledImportCount: Array<any> = [];
  if (importSummary) {
    importSummary.forEach((summaryItem, summaryKey) => {
      compiledImportCount[summaryKey] = {
        type: summaryItem.klass ? summaryItem.klass.split('.')[4] : summaryItem.type,
        count: summaryItem.stats ? summaryItem.stats : summaryItem.importCount
      };
    });
  }
  return compiledImportCount;
}

function getCompiledImportConflicts(importSummary) {
  const conflicts: Array<any> = [];
  // Get conflict summary if exist
  if (importSummary) {
    importSummary.forEach((summaryItem) => {
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
