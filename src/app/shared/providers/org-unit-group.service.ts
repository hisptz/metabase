import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {HttpClientService} from './http-client.service';

@Injectable()
export class OrgUnitGroupService {

  constructor(
    private http: HttpClientService
  ) { }

  checkFromSystem(orgUnitGroup: any): Observable<any> {
    let url: string = '';

    if(orgUnitGroup.id) {
      url = '../../../api/organisationUnitGroups/' + orgUnitGroup.id + '.json?fields=*,!attributeValues,!userGroupAccesses,!userAccesses,!translations,!dataSetElements,!dataElementGroups,!legendSets,!categoryOptions,!aggregationLevels,!user,!organisationUnits,!groupSets';
    }

    if(url === '') {
      return Observable.of(null);
    }

    return Observable.create(observer => {
      this.http.get(url)
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        }, () => {
          observer.next(null);
          observer.complete();
        })
    })
  }


}
