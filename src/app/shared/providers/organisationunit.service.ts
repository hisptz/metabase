import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';

@Injectable()
export class OrganisationunitService {

  constructor(
    private http: Http
  ) { }

  checkFromSystem(orgUnit: any): Observable<any> {
    let url: string = '';

    if(orgUnit.id) {
      url = '../../../api/organisationUnits/' + orgUnit.id + '.json?fields=*,!attributeValues,!userGroupAccesses,!userAccesses,!translations,!dataSetElements,!dataElementGroups,!legendSets,!categoryOptions,!aggregationLevels,!user,!organisationUnits,!groupSets';
    }

    if(url === '') {
      return Observable.of(null);
    }

    return Observable.create(observer => {
      this.http.get(url).map((res: Response) => res.json()).catch(error => Observable.throw(new Error(error)))
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        }, () => {
          observer.next(null);
          observer.complete();
        })
    })
  }

  getDependencies(orgUnit: any) {
    let dependencies: any[] = [];

    /**
     * Get parent
     */
    dependencies.push({packageType: 'parent' , type: 'organisationUnit', details: orgUnit.parent});

    return dependencies;
  }

}
