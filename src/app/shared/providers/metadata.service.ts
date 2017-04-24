import { Injectable } from '@angular/core';
import {Store} from "./store";
import {Observable} from "rxjs";
import {isArray} from "rxjs/util/isArray";
import {Http, Response} from "@angular/http";

@Injectable()
export class MetadataService {

  api: string = '../../../api/25/';
  constructor(
    private store: Store,
    private http: Http
  ) { }

  find(id: any, url: any):Observable<any> {
    return this.store.selectById('metadata', id, url);
  }

  compileMetadata(metadata): any {
    let metadataCount: any = {};
    let metadataItems: Array<string> = [];
    Object.keys(metadata).map(key => {
      if(isArray(metadata[key])) {
        metadataItems.push(key);
        metadataCount[key] = metadata[key].length;
      }
    });
    return {
      id: metadata.id,
      items: metadataItems,
      count: metadataCount,
      metadata: metadata
    };
  }

  importMetadata(dryRun: boolean, metadata: any): Observable<any> {
    return Observable.create(observer => {
      this.http.post('../../../api/25/metadata?dryRun='+ dryRun + '&strategy=CREATE_AND_UPDATE', metadata)
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
      this.store.selectById('metadata', metadataId, null).subscribe(metadata => {
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

  private checkFromSystem(item: string, id: string) {
    return Observable.create(observer => {
      this.http.get(this.api + item + '/' + id + '.json')
        .map((res: Response) => res.json())
        .catch(error => Observable.throw(new Error(error)))
        .subscribe(result => {
          observer.next(true);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
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

}
