import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class MetadataImportService {

  constructor(
    private http: Http
  ) { }

  importMetadata(dryRun: boolean, metadata: any) {
    this.http.post('../../../api/metadata?dryRun='+ dryRun + '&strategy=CREATE_AND_UPDATE', metadata)
      .map(res => res.json())
      .subscribe(importResult => {
        console.log(this.compileImportSummary(importResult))
      }, error => {
        console.log(error)
      });
  }

  compileImportSummary(response) {
    let responseSummary: Array<any> = [];
    responseSummary['overallImportCounts'] = response.stats ? response.stats : response.importCount;
    responseSummary['importCountsPerMetadata'] = this.getImportCountPerMetadata(response.typeReports ? response.typeReports : response.importTypeSummaries);
    responseSummary['importConflicts'] = this.compileImportConflicts(response.typeReports ? response.typeReports : response.importTypeSummaries);
    return responseSummary;
  }

  compileImportConflicts(summary) {
    let conflicts: Array<any> = [];
    //Get conflict summary if exist
    summary.forEach((summaryItem, summaryKey) => {
      if(summaryItem.importConflicts) {
        summaryItem.importConflicts.forEach((conflict, summaryKey) => {
          conflicts[summaryKey] = {
            element: conflict.object,
            description: conflict.value,
            type: summaryItem.type
          }
        });
      } else if(summaryItem.objectReports) {
        summaryItem.objectReports.forEach((conflict, summaryKey) => {
          conflicts[summaryKey] = {
            description: conflict.errorReports,
            type: conflict.klass.split(".")[4]
          }
        });
      }
    });
    return conflicts;
  }
  getImportCountPerMetadata(summary) {
    let compiledImportCount: Array<any> = [];
    summary.forEach((summaryItem, summaryKey) => {
      compiledImportCount[summaryKey] = {
        type: summaryItem.klass ? summaryItem.klass.split(".")[4] : summaryItem.type,
        count: summaryItem.stats ? summaryItem.stats : summaryItem.importCount
      };
    });
    return compiledImportCount;
  }

}
