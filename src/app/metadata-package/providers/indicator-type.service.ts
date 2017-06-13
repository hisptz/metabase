import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class IndicatorTypeService {

  constructor(private http: Http) { }

  checkFromSystem(indicatorType: any): Observable<any> {
    const factor: any = indicatorType.factor;
    const isNumber: boolean = indicatorType.number;
    const id =  indicatorType.id;
    let url: string = '';

    if(factor && isNumber) {
      url = '../../../api/indicatorTypes.json?fields=*,!attributeValues,!userGroupAccesses,!userAccesses,!translations&filter=factor:eq:' + factor + '&filter=number:eq:' + isNumber + '&paging=false';
    } else if(id) {
      url = '../../../api/indicatorTypes/' + id + '.json?fields=*,!attributeValues,!userGroupAccesses,!userAccesses,!translations';
    }

    if(url == '') {
      return Observable.of(null)
    }

    return Observable.create(observer => {
      this.http.get(url).map(res => res.json()).catch(error => Observable.throw(new Error(error)))
        .subscribe((response: any) => {
          let indicatorType: any = null;
          if(response.indicatorTypes) {
            indicatorType = response.indicatorTypes[0];
          } else {
            indicatorType = response
          }
          observer.next(indicatorType);
          observer.complete();
        }, () => {
          observer.next(null);
          observer.complete();
        })
    })

  }
}
