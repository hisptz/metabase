import { Injectable } from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import * as _ from 'lodash';
import {UtilitiesService} from './utilities.service';

@Injectable()
export class RepositoriesService {

  defaultRepository: any;
  datastoreUrl: string;
  constructor(
    private http: HttpClientService,
    private utilities: UtilitiesService
  ) {
    this.defaultRepository = [
      {
        id: 1,
        name: 'DHIS2 UiO',
        url: 'https://raw.githubusercontent.com/dhis2/dhis2-metadata-repo/master/repo/26/index.json',
        selected: true
      },
      {
        id: 2,
        name: 'DHIS2 HISPTZ',
        url: 'https://raw.githubusercontent.com/hisptz/dhis2-metadata-repo/master/packages.json',
        selected: true
      }

    ];
    this.datastoreUrl = 'dataStore/metabase/repositories';
  }

  loadRepositories(): Observable<any> {
    return Observable.create(observer => {
      this.http.get(this.datastoreUrl)
        .catch(this.utilities.handleError)
        .subscribe((repositories: any[]) => {
          if(repositories.length > 0) {
            observer.next(repositories);
            observer.complete();
          } else {
            return this.http.put(this.datastoreUrl, this.defaultRepository)
              .catch(this.utilities.handleError)
              .subscribe(updateResponse => {
                observer.next(this.defaultRepository);
                observer.complete();
              }, editError => {
                observer.error(editError);
              });
          }
        }, error => {
          this.http.post(this.datastoreUrl, this.defaultRepository)
            .catch(this.utilities.handleError)
            .subscribe(() => {
              observer.next(this.defaultRepository);
              observer.complete();
            }, addError => {
              observer.error(addError);
            });
        })
    })
  }

  updateRepository(repositoryData): Observable<any> {
    return Observable.create(observer => {
      this.loadRepositories()
        .subscribe(repositories => {
          const newRepositories: any[] = _.clone(repositories);
          const existingRepository: any = _.find(newRepositories, ['id', repositoryData.id]);
          const existingRepositoryIndex: number = _.findIndex(newRepositories, existingRepository);
          if(existingRepository) {
            newRepositories[existingRepositoryIndex] = repositoryData;
            this.http.put(this.datastoreUrl, newRepositories)
              .catch(this.utilities.handleError)
              .subscribe(() => {
                observer.next(newRepositories);
                observer.complete();
              }, updateError => observer.error(updateError))
          } else {
            observer.error('Fail to update the given repository, Repository deos not seem to exist in the source')
          }
        }, loadError => observer.error(loadError))
    });

  }

  removeRepository(repositoryData): Observable<any> {
    return Observable.create(observer => {
      this.loadRepositories()
        .subscribe(repositories => {
          const newRepositories: any[] = _.clone(repositories);
          const existingRepositoryIndex: number = _.findIndex(newRepositories, repositoryData);
          if(existingRepositoryIndex != -1) {
            newRepositories.splice(existingRepositoryIndex,1);
            this.http.put(this.datastoreUrl, newRepositories)
              .catch(this.utilities.handleError)
              .subscribe(() => {
                observer.next(newRepositories);
                observer.complete();
              }, updateError => observer.error(updateError))
          } else {
            observer.error('Fail to update the given repository, Repository does not seem to exist in the source')
          }
        }, loadError => observer.error(loadError))
    });

  }

  addRepository(repositoryData: any): Observable<any> {
    return Observable.create(observer => {
      this.loadRepositories()
        .subscribe(repositories => {
          const newRepositories: any[] = _.clone(repositories);
          repositoryData.id = newRepositories.length + 1;
          repositoryData.selected = true;
          newRepositories.push(repositoryData);
          this.http.put(this.datastoreUrl, newRepositories)
            .catch(this.utilities.handleError)
            .subscribe(() => {
              observer.next(newRepositories);
              observer.complete();
            }, addError => observer.error(addError))
        }, loadError => observer.error(loadError))
    });
  }

  getUrlArray(repositories: any[]): Observable<any>{
    if(repositories.length == 0) {
      return Observable.of([]);
    }

    const filteredRepositories = _.filter(repositories, ['selected', true]);
    return Observable.of(filteredRepositories.map(repository => {return repository.url}));
  }

}
