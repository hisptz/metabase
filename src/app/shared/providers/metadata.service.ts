import { Injectable } from '@angular/core';
import {Store} from "./store";
import {Observable} from "rxjs";
import {isArray} from "rxjs/util/isArray";
import {Http, Response} from "@angular/http";
import {MetadataPackageService} from "./metadata-package.service";
import {MetadataPackage} from "../../store/models/metadata-package";

@Injectable()
export class MetadataService {

  api: string = '../../../api/25/';
  constructor(
    private store: Store,
    private metadataPackageService: MetadataPackageService,
    private http: Http
  ) { }

  find(id: any, url: any):Observable<any> {
    return this.store.selectByField('metadata', {name: 'id', value: id}, url);
  }

  getByPackage(metadataPackageId: string, metadataVersion: number): Observable<any> {
    return Observable.create(observer => {
      this.metadataPackageService.find(metadataPackageId).subscribe((metadataPackage: MetadataPackage) => {
        if(metadataPackage.hasOwnProperty('versions')) {
          for(let versionItem of metadataPackage.versions) {
            if(versionItem.version == metadataVersion) {
              if(versionItem.hasOwnProperty('metadata')) {
                observer.next(versionItem.metadata);
                observer.complete();
              } else {
                if(versionItem.hasOwnProperty('href')) {
                  this.http.get(versionItem.href).map((res: Response) => res.json())
                    .catch(error => Observable.throw(new Error(error)))
                    .subscribe(response => {
                      versionItem.metadata = this.getCompiledMetadata(response);

                      /**
                       * Also update the store
                       */
                      this.metadataPackageService.update(metadataPackage);

                      /**
                       * return compiled metadata
                       */
                      observer.next(versionItem.metadata);
                      observer.complete();
                    }, metadataError => {
                      observer.error(metadataError);
                    })
                } else {
                  observer.error({message: 'Reference to metadata files is not specified, or may be referenced by another name. Make sure reference attribute is "href"'})
                }
              }
            break;
            }
          }
        } else {
          console.warn('version is not present in the package')
        }
      }, error => {
        observer.error(error);
      });
    })
  }

  getCompiledMetadata(metadata): any {
    let metadataCount: any = {};
    let metadataItems: Array<string> = [];
    let metadataDetails: any = {};
    Object.keys(metadata).map(key => {
      if(isArray(metadata[key])) {
        metadataItems.push(key);
        metadataCount[key] = metadata[key].length;
        let sanitizedMetadata : any[] = [];
        if(metadata[key].length > 0) {
          metadata[key].forEach(metadataItem => {
            sanitizedMetadata.push({
              id: metadataItem.id,
              name: metadataItem.name,
              code: metadataItem.hasOwnProperty('code') ? metadataItem.code : 'None',
              created: metadataItem.created,
              lastUpdated: metadataItem.lastUpdated,
              originalVersion: metadataItem,
              inSystemVersion: {},
              importableVersion: {}
            });
          })
        }
        metadataDetails[key] = sanitizedMetadata;
      }
    });
    return {
      metadataItems: metadataItems,
      metadataCount: metadataCount,
      metadataDetails: metadataDetails
    };
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

  getMetadataUrl(versions: Array<any>, selectedVersion: number) {
    let url: string = "";
    for(let ver of versions) {
      if(ver.version == selectedVersion) {
        url = ver.href;
        break;
      }
    }
    return url;
  }

  private checkFromMetadata(item: string, metadataId: string, id: string): Observable<boolean> {
    let found: boolean = false;
    return Observable.create(observer => {
      this.store.selectByField('metadata', {name: 'id', value: metadataId}, null).subscribe(metadata => {
        if(metadata.hasOwnProperty(item)) {
          for(let itemData of metadata[item]) {
            if(itemData.id == id) {
              found = true;
              observer.next(true);
              observer.complete();
              break;
            }
          }
        }

        /**
         * return false if not found
         */
        if(!found) {
          observer.next(false);
          observer.complete();
        }
      });
    })
  }

  checkFromSystem(item: string, metadata: any) {
    return Observable.create(observer => {
      switch(item) {
        case 'indicatorTypes': {
          this.checkIndicatorType(metadata).subscribe(indicatorType => {
            observer.next(indicatorType);
            observer.complete();
          });
        }

        default: {
          this.http.get(this.api + item + '/' + metadata.id + '.json')
            .map((res: Response) => res.json())
            .catch(this.handleError)
            .subscribe(result => {
              metadata.available = true;
              observer.next(metadata);
              observer.complete();
            }, error => {
              metadata.available = false;
              observer.next(metadata);
              observer.complete();
            })
        }
      }

    })
  }

  checkIndicatorType(indicatorType: any): Observable<any> {
    return Observable.create(observer => {
      this.http.get(this.api + 'indicatorTypes/' + indicatorType.id + '.json')
        .map((res: Response) => res.json())
        .catch(this.handleError)
        .subscribe(indicatorTypeResponse => {
          indicatorType.inSystemVersion = indicatorTypeResponse;
          indicatorType.available = true;
          observer.next(indicatorType);
          observer.complete();
        }, error => {
          this.http.get(this.api + 'indicatorTypes.json?paging=false')
            .map((res: Response) => res.json())
            .catch(this.handleError)
            .subscribe((response: any) => {
              let inSystemIndicatorType: any = {};
              if(response.indicatorTypes.length > 0) {
                for(let indicatorTypeItem of response.indicatorTypes) {
                  if((indicatorTypeItem.factor == indicatorType.factor) && (indicatorTypeItem.number == indicatorType.number)) {
                    inSystemIndicatorType = indicatorTypeItem;
                    break;
                  }
                }
              }
              if(inSystemIndicatorType.hasOwnProperty('id')) {
                indicatorType.inSystemVersion = inSystemIndicatorType;
                indicatorType.available = true;
              } else {
                indicatorType.available = false;
              }

              observer.next(indicatorType);
              observer.complete();
            })
        })
    })
  }

  checkIfImported() {

  }

  checkIfExist(item: string,id: string, name: string, parentId: string = null, preferSource: boolean = false): Observable<any> {
    return Observable.create(observer => {

      if(!preferSource) {
        /**
         * Find from its metadata package
         */
        this.checkFromMetadata(item,parentId,id).subscribe(metadataResult  => {
          if(metadataResult) {
            console.log(metadataResult)
            observer.next({found: true, message: item.slice(0,-1) + ' with name ' + name + ' is available in the package'});
            observer.complete();
          } else {
            /**
             * Find from the system
             */
            this.checkFromSystem(item,id).subscribe(systemResult => {
              if(systemResult) {
                observer.next({found: true, message: item.slice(0,-1) + ' with name ' + name + ' is available in the system'});
                observer.complete();
              } else {
                observer.next({found: false, message: item.slice(0,-1) + 'with name ' + name + ' could not be found in the system'});
                observer.complete();
              }
            })
          }
        })
      } else {
        /**
         * Find from the system
         */
        this.checkFromSystem(item,id).subscribe(systemResult => {
          if(systemResult) {
            observer.next({found: true, message: item.slice(0,-1) + ' with name ' + name + ' is available in the system'});
            observer.complete();
          } else {
            observer.next({found: false, message: item.slice(0,-1) + ' with name ' + name + ' could not be found in the system'});
            observer.complete();
          }
        })
      }
    })
  }

  handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: any;
    if (error instanceof Response) {
      console.log(error)
      const body = error.json() || '';
      errMsg = body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
