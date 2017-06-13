import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {IndicatorService} from "./indicator.service";
import {IndicatorTypeService} from "./indicator-type.service";
import {Observable} from 'rxjs/Observable';
import {DataElementService} from './data-element.service';
import {UserService} from './user.service';
import {CategoryOptionComboService} from './category-option-combo.service';
import {OrgUnitGroupService} from './org-unit-group.service';
import {Http} from '@angular/http';
@Injectable()
export class MetadataService {

  constructor(
    private http: Http,
    private indicatorService: IndicatorService,
    private indicatorTypeService: IndicatorTypeService,
    private dataElementService: DataElementService,
    private userService: UserService,
    private categoryOptionComboService: CategoryOptionComboService,
    private OrgUnitGroupService: OrgUnitGroupService
  ) { }

  getDependencies(currentMetadata, metadataType) {
    switch (metadataType) {
      case 'indicators': {
        return this.indicatorService.getDependencies(currentMetadata.originalVersion);
      }

      default:
        return [];
    }
  }

  checkDependenciesAvailability(metadataObject: any, dependencies: any[]): Observable<any> {
    let checkedDependencies: any[] = [];
    return Observable.create(observer => {
      if(dependencies.length > 0) {
        const dependencyCount: number = dependencies.length;
        let dependencyResponseCount = 0;
        dependencies.forEach(dependency => {
          const availableMetadataArray = metadataObject[dependency.type + 's'];
          let dependencyInPackage: any = null;
          let newDependency: any = _.clone(dependency);

          /**
           * Get dependency from the package
           */
          if(availableMetadataArray) {
            dependencyInPackage = _.find(availableMetadataArray, ['id', newDependency.details.id]);
          }
          newDependency.inPackage = dependencyInPackage !== null ? dependencyInPackage.originalVersion : null;

          /**
           * Also check from the system
           */
          this.checkFromSystem(dependency.type, dependencyInPackage !== null ? dependencyInPackage.originalVersion : newDependency.details)
            .subscribe(dependencyInSystem => {
              dependencyResponseCount++;
              newDependency.inSystem = dependencyInSystem;
              checkedDependencies.push(newDependency);
              if (dependencyResponseCount === dependencyCount) {
                observer.next(checkedDependencies);
                observer.complete();
              }
            })
        })
      } else {
        observer.next([]);
        observer.complete();
      }
    })
  }

  checkFromSystem(metadataType, details): Observable<any> {
    switch (metadataType) {
      case 'indicator': {
        return this.indicatorService.checkFromSystem(details)
      }

      case 'indicatorType': {
        return this.indicatorTypeService.checkFromSystem(details);
      }

      case 'dataElement': {
        return this.dataElementService.checkFromSystem(details);
      }

      case 'user': {
        return this.userService.checkFromSystem(details);
      }

      case 'categoryOptionCombo': {
        return this.categoryOptionComboService.checkFromSystem(details);
      }

      case 'orgUnitCount': {
        return this.OrgUnitGroupService.checkFromSystem(details);
      }

      default:
        return Observable.of(null);
    }
  }

  importMetadata(dryRun: boolean, metadata: any): Observable<any> {
    return Observable.create(observer => {
      let importMode = dryRun ? 'VALIDATE': 'COMMIT';
      this.http.post('../../../api/25/metadata?importMode='+ importMode + '&strategy=CREATE_AND_UPDATE', metadata)
        .map(res => res.json())
        .subscribe(importResult => {
          observer.next(this.compileImportSummary(importResult));
          observer.complete()
        }, error => {
          observer.error(error);
        });
    })
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
    if(summary) {
      summary.forEach((summaryItem) => {
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
    }

    return conflicts;
  }

  getImportCountPerMetadata(summary) {
    let compiledImportCount: Array<any> = [];
    if(summary) {
      summary.forEach((summaryItem, summaryKey) => {
        compiledImportCount[summaryKey] = {
          type: summaryItem.klass ? summaryItem.klass.split(".")[4] : summaryItem.type,
          count: summaryItem.stats ? summaryItem.stats : summaryItem.importCount
        };
      });
    }
    return compiledImportCount;
  }

}
