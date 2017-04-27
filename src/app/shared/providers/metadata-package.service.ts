import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Constants} from "../constants";
import {Http, Response} from "@angular/http";
import {Store} from "@ngrx/store";
import {MetadataPackage} from "../../store/models/metadata-package";
import {ADD_PACKAGE, UPDATE_PACKAGE} from "../../store/metadata-package";

@Injectable()
export class MetadataPackageService {
  subscription: Subscription;
  private _url:string;
  constructor(
    private constants: Constants,
    private http: Http,
    private store: Store<MetadataPackage>
  ) {
    this._url = 'https://raw.githubusercontent.com/hisptz/dhis2-metadata-repo/master/packages.json';
  }

  public all(): Observable<MetadataPackage[]> {
    return Observable.create(observer => {
      this.store.select('metadataPackage').subscribe((packages: MetadataPackage[]) => {
        if(packages.length > 0) {
          observer.next(packages);
          observer.complete();
        } else {
          this.http.get(this._url).map((res: Response) => res.json())
            .catch(this.handleError)
            .subscribe(response => {
              this.store.dispatch({ type: ADD_PACKAGE, payload: response.packages});
              observer.next(response.packages);
              observer.complete();
            }, error => {
              observer.error(error)
            })
        }
      })
    })
  }

  public find(id: any): Observable<MetadataPackage> {
    return Observable.create(observer => {
      this.all().subscribe(packages => {
        if(packages.length > 0) {
          let requestedPackage = packages.filter(item => {return item.id == id});
          observer.next(requestedPackage.length > 0 ? requestedPackage[0] : {});
          observer.complete();
        }
      }, error => {
        observer.error(error)
      })
    });
  }

  public update(metadataPackage) {
    this.store.dispatch({type: UPDATE_PACKAGE, payload: metadataPackage});
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
