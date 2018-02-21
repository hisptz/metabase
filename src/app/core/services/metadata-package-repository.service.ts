import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { MetadataPackageRepository } from '../models';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

@Injectable()
export class MetadataPackageRepositoryService {
  constructor(private httpClient: HttpClientService) {
  }

  loadAllIds(): Observable<Array<string>> {
    return new Observable(observer => {
      this.httpClient.get('dataStore/metadataPackageRepositories').subscribe((repositoryIds: Array<string>) => {
        observer.next(repositoryIds);
        observer.complete();
      }, () => {
        observer.next([]);
        observer.complete();
      });
    });
  }

  loadAll() {
    return new Observable(observer => {
      this.loadAllIds().subscribe((repositoryIds: Array<string>) => {
        if (repositoryIds.length > 0) {
          from(repositoryIds).pipe(
            mergeMap((repositoryId) =>
              this.httpClient.get(`dataStore/metadataPackageRepositories/${repositoryId}`)))
          .subscribe((metadataPackageRepository: MetadataPackageRepository) => {
              observer.next(metadataPackageRepository);
            },
            () => {
              observer.next(null);
              observer.complete();
            },
            () => observer.complete()
          );
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }
}
