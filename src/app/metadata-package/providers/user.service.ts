import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  checkFromSystem(user: any): Observable<any> {
    let url: string = '';

    if(user.id) {
      url = '../../../api/users/' + user.id + '.json?fields=*,!attributeValues,!userCredentials,!organisationUnits,!teiSearchOrganisationUnits,!dataViewOrganisationUnits,!userGroups,!userGroupAccesses,!userAccesses,!translations';
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

}
