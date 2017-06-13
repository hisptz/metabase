import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {isArray} from "rxjs/util/isArray";
import {HttpClientService} from "./http-client.service";
import * as _ from 'lodash';

@Injectable()
export class MetadataPackageService {

  constructor(private http: Http, private httpClient: HttpClientService) { }

  loadAll(urlArray): Observable<any> {
    const urlCallArray: any = urlArray.map(url => {return this.getCallRequest(url)});

    return Observable.create(observer => {
      if(urlCallArray.length > 0) {
        Observable.forkJoin(urlCallArray).subscribe((metadataPackagesArray: any[]) => {
          let sanitizedPackages: any[] = [];

          if(metadataPackagesArray.length > 0) {
            metadataPackagesArray.forEach(metadataPackages => {
              metadataPackages.packages.forEach(metadataPackage => {
                sanitizedPackages.push(metadataPackage);
              })
            })
          } else {
            observer.error('No metadata package could be loaded')
          }

          observer.next(sanitizedPackages);
          observer.complete();
        }, error => {
          observer.error(error);
        })
      } else {
        observer.next([]);
        observer.complete();
      }
    })
  }

  getCallRequest(url): Observable<any> {
    return this.http.get(url).map(res => res.json()).catch(error => Observable.throw(new Error(error)));
  }

  loadMetadata(metadataDetails: any): Observable<any> {
    return Observable.create(observer => {
      this.http.get(metadataDetails.metadataUrl).map(res => res.json())
        .catch(error => Observable.throw(new Error(error)))
        .subscribe(metadataResponse => {
          observer.next({packageId: metadataDetails.packageId, packageVersion: metadataDetails.packageVersion, metadata: this.getCompiledMetadata(metadataResponse)});
          observer.complete();
        }, error => observer.error(error));
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

  loadImportedMetadataPackages(): Observable<any> {
    return Observable.create(observer => {
      this.httpClient.get('dataStore/metabase/importedMetadataPackages')
        .catch(error => Observable.throw(new Error(error)))
        .subscribe((importedMetadataPackages: any[]) => {
          observer.next(importedMetadataPackages);
          observer.complete();
        }, error => {
          this.httpClient.post('dataStore/metabase/importedMetadataPackages', [])
            .catch(error => Observable.throw(new Error(error)))
            .subscribe(response => {
              observer.next([]);
              observer.complete();
            }, error => {
              observer.error(error);
            });
        })
    })
  }

  addImportedMetadataPackage(importedMetadataId): Observable<any> {
    return Observable.create(observer => {
      this.loadImportedMetadataPackages().subscribe(importedPackages => {
        const newImportedPackages: any[] = _.clone(importedPackages);
        newImportedPackages.push(importedMetadataId);
        this.httpClient.put('dataStore/metabase/importedMetadataPackages', newImportedPackages)
          .catch(error => Observable.throw(new Error(error)))
          .subscribe(() => {
            observer.next(newImportedPackages);
            observer.complete();
          }, error => {
            observer.error(error);
          });
      })
    })
  }

  importMetadata(dryRun: boolean, metadata: any) {
    let importMode = dryRun ? 'VALIDATE': 'COMMIT';
    this.http.post('../../../api/metadata?importMode='+ importMode + '&strategy=CREATE_AND_UPDATE', metadata)
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
