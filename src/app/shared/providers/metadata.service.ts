import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {IndicatorService} from "./indicator.service";
import {IndicatorTypeService} from "./indicator-type.service";
import {Observable} from 'rxjs/Observable';
import {DataElementService} from './data-element.service';
import {UserService} from './user.service';
import {CategoryOptionComboService} from './category-option-combo.service';
import {OrgUnitGroupService} from './org-unit-group.service';
import {Http, Response} from '@angular/http';
import {OrganisationunitService} from './organisationunit.service';
import {HttpClientService} from './http-client.service';
import {UtilitiesService} from './utilities.service';
@Injectable()
export class MetadataService {

  constructor(
    private http: Http,
    private utilities: UtilitiesService,
    private indicatorService: IndicatorService,
    private indicatorTypeService: IndicatorTypeService,
    private dataElementService: DataElementService,
    private userService: UserService,
    private categoryOptionComboService: CategoryOptionComboService,
    private OrgUnitGroupService: OrgUnitGroupService,
    private organisationUnitService: OrganisationunitService
  ) { }

  getDependencies(currentMetadata, metadataType) {
    switch (metadataType) {
      case 'indicators': {
        return this.indicatorService.getDependencies(currentMetadata.originalVersion);
      }

      case 'organisationUnits': {
        return this.organisationUnitService.getDependencies(currentMetadata.originalVersion)
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
          const availableMetadataArray = metadataObject[dependency.packageType ? dependency.packageType : dependency.type + 's'];
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

      case 'organisationUnit': {
        return this.organisationUnitService.checkFromSystem(details);
      }

      default:
        return this.checkFromSystemForOtherTypes(details, metadataType)
    }
  }

  checkFromSystemForOtherTypes(metadata, metadataType): Observable<any> {
    let url: string = '';
    const metadataId = metadata.id;
    if(metadataId) {
      url = '../../../api/' + metadataType +'s/' + metadataId + '.json';
    }

    if(url === '') {
      return Observable.of(null);
    }

    return Observable.create(observer => {
      this.http.get(url).map((res: Response) => res.json()).catch(this.utilities.handleError)
        .subscribe(response => {
          // metadata.inSystemVersion = response;
          observer.next(response);
          observer.complete();
        }, () => {
          observer.next(null);
          observer.complete();
        })
    })
  }

  getMetadataWithDependencies(metadataPackage: any): Observable<any> {
    const newMetadataObject: any = _.clone(metadataPackage.metadata);
    const metadataItemCount: number = newMetadataObject.metadataItems.length;
    const newProgressSummary = metadataPackage.metadata.progressSummary;
    let metadataResponseCount: number = 0;
    return Observable.create(observer => {
      newMetadataObject.metadataItems.forEach((metadataItemType:any) => {
        let metadataItemDetails: any[] = metadataPackage.metadata.metadataDetails[metadataItemType];
        if(metadataItemDetails.length === 0) {
          metadataItemDetails = [null];
        }
        let metadataProgressSummary = _.find(newProgressSummary, ['metadataType', metadataItemType]);
        const metadataProgressIndex = _.findIndex(newProgressSummary, metadataProgressSummary)
        metadataProgressSummary.totalDependencyCount = metadataItemDetails.map(metadata => { return this.getDependencies(metadata, metadataItemType).length } ).reduce((sum, count) => {return sum + count});
        Observable.forkJoin(
          metadataItemDetails.map(metadata => { return this.checkDependenciesAvailability(metadataPackage.metadata.metadataDetails, this.getDependencies(metadata, metadataItemType)) })
        ).subscribe(dependency => {
          metadataProgressSummary.inPackageDependencyCount = dependency.map(dependencyArray => {return dependencyArray.filter(dependency => { return dependency.inPackage !== null}).length}).reduce((sum, count) => {return sum + count});
          metadataProgressSummary.inSystemDependencyCount = dependency.map(dependencyArray => {return dependencyArray.filter(dependency => { return dependency.inSystem !== null}).length}).reduce((sum, count) => {return sum + count})
          metadataResponseCount++;
          metadataItemDetails.forEach((metadataItem, metadataIndex) => {
            if(metadataItem !== null) {
              metadataItem.dependencies = dependency[metadataIndex];
            } else {
              metadataItemDetails = [];
            }
          });
          newMetadataObject.metadataDetails[metadataItemType] = metadataItemDetails;
          newProgressSummary[metadataProgressIndex] = metadataProgressSummary;
          if(metadataResponseCount === metadataItemCount) {
            metadataPackage.metadata = _.clone(newMetadataObject);
            metadataPackage.metadata.checked = true;
            metadataPackage.metadata.preview = true;
            metadataPackage.metadata.progressSummary = _.clone(newProgressSummary);
            observer.next(metadataPackage);
            observer.complete();
          }
        })
      })
    });
  }

  checkMetadataExistence(metadataPackage): Observable<any> {
    const newMetadataObject: any = _.clone(metadataPackage.metadata);
    const metadataItemCount: number = newMetadataObject.metadataItems.length;
    let metadataResponseCount: number = 0;
    let importProgressSummary: any[] = [];
    return Observable.create(observer => {
      newMetadataObject.metadataItems.forEach((metadataItemType:any) => {
        let metadataProgressSummary: any = {
          metadataType: metadataItemType,
          totalMetadataCount: newMetadataObject.metadataCount[metadataItemType]
        };
        let metadataItemDetails: any[] = metadataPackage.metadata.metadataDetails[metadataItemType];
        if(metadataItemDetails.length === 0) {
          metadataItemDetails = [null];
        }

        Observable.forkJoin(
          metadataItemDetails.map(metadata => {return metadata !== null ? this.checkFromSystem(metadataItemType.slice(0,-1),metadata.originalVersion): Observable.of(null)})
        ).subscribe((result:any) => {
          metadataProgressSummary.metadataInSystemCount = result.filter(value => { return value !== null }).length;
          metadataResponseCount++;
          metadataItemDetails.forEach((metadataItem, metadataIndex) => {
            if(metadataItem !== null) {
              metadataItem.inSystemVersion = result[metadataIndex];
            } else {
              metadataItemDetails = [];
            }
          });
          newMetadataObject.metadataDetails[metadataItemType] = metadataItemDetails;
          importProgressSummary.push(metadataProgressSummary);
          if(metadataResponseCount === metadataItemCount) {
            metadataPackage.metadata = _.clone(newMetadataObject);
            metadataPackage.metadata.progressSummary = importProgressSummary;
            observer.next(metadataPackage);
            observer.complete();
          }
        })
      });
    });
  }

  getMetadataImportableVersion(metadataPackage) {
    const metadataKeys = metadataPackage.metadata.metadataItems;
    let importablePackage: any = {};
    metadataKeys.forEach(key => {
      importablePackage[key] = [];
      metadataPackage.metadata.metadataDetails[key].forEach(metadata => {
        importablePackage = this.updatePackageWithMetadataImportableVersion(metadata, importablePackage, key)
      })
    });
    metadataPackage.metadata.importablePackage = importablePackage;
    return Observable.of(metadataPackage)
  }

  updatePackageWithMetadataImportableVersion(metadata, importablePackage, metadataKey) {
    const metadataOriginalVersion = metadata.inSystemVersion === null ? metadata.originalVersion : null;
    const metadataKeys = _.keys(metadataOriginalVersion);

    if(metadataOriginalVersion !== null) {
      metadataKeys.forEach(key => {
        if (_.isPlainObject(metadataOriginalVersion[key])) {
          const dependencyType = _.indexOf(metadata.dependencies.map(dependency => {return dependency.type}), key) !== -1 ? 'type': _.indexOf(metadata.dependencies.map(dependency => {return dependency.packageType}), key) != -1 ? 'packageType' : 'type';
          const correspondingDependency = _.find(metadata.dependencies, [dependencyType, key]);
          if (correspondingDependency) {
            if (correspondingDependency.inSystem !== null && correspondingDependency.inPackage !== null) {
              const dependencyIndex = _.findIndex(importablePackage[key + 's'], correspondingDependency.inPackage);
              if (dependencyIndex !== -1) {
                importablePackage[key + 's'].splice(dependencyIndex, 1);
              }
            }

            if (correspondingDependency.inSystem !== null || (correspondingDependency.inSystem === null && correspondingDependency.inPackage === null)) {
              metadataOriginalVersion[correspondingDependency.packageType ? correspondingDependency.packageType : key] = correspondingDependency.inSystem;
            } else if (correspondingDependency.inSystem === null && correspondingDependency.inPackage === null) {
              delete metadataOriginalVersion[correspondingDependency.packageType ? correspondingDependency.packageType : key];
            }
          }
        }
      });
      importablePackage[metadataKey].push(metadataOriginalVersion);
    }

    return importablePackage;
  }

  metadataImport(metadataPackage) {
    return Observable.create(observer => {
      this.importMetadata(metadataPackage.metadata.preview, metadataPackage.metadata.importablePackage)
        .subscribe(importResult => {
          metadataPackage.metadata.importResult = _.clone(importResult);
          observer.next(metadataPackage);
          observer.complete();
        }, error => observer.error(error))
    })
  }

  importMetadata(dryRun: boolean, metadata: any): Observable<any> {
    return Observable.create(observer => {
      let importMode = dryRun ? 'VALIDATE': 'COMMIT';
      this.http.post('../../../api/25/metadata?importMode='+ importMode + '&strategy=CREATE_AND_UPDATE', metadata)
        .map(res => res.json())
        .catch(this.utilities.handleError)
        .subscribe(importResult => {
          observer.next(this.compileImportSummary(importResult, dryRun));
          observer.complete()
        }, error => {
          observer.error(error);
        });
    })
  }

  compileImportSummary(response, dryRun) {
    let responseSummary: any = {};
    responseSummary.isPreview = dryRun;
    responseSummary.completed = true;
    responseSummary.overallImportCounts = response.stats ? response.stats : response.importCount;
    responseSummary.importCountsPerMetadata = this.getImportCountPerMetadata(response.typeReports ? response.typeReports : response.importTypeSummaries);
    responseSummary.importConflicts = this.compileImportConflicts(response.typeReports ? response.typeReports : response.importTypeSummaries);
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
