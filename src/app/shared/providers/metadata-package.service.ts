import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Constants} from "../constants";
import {Http} from "@angular/http";
import {Store} from "./store";

@Injectable()
export class MetadataPackageService {

  private _packages: BehaviorSubject<Array<any>>;
  private _packagePool: Array<any>;
  subscription: Subscription;
  private _url:string;
  constructor(
    private constants: Constants,
    private http: Http,
    private store: Store
  ) {
    this._packagePool = [];
    this._url = 'https://raw.githubusercontent.com/hisptz/dhis2-metadata-repo/master/packages.json';
    this._packages = <BehaviorSubject<Array<any>>>new BehaviorSubject([{loading: true, message: 'Moving packages into position....'}]);
  }

  public all(): Observable<any> {
    // return this._packages.asObservable();
    return this.store.select('packages', this._url, 'packages');
  }

  public find(id: any): Observable<any> {
    return this.store.selectById('packages',id, this._url,'packages','array');
  }

  public loadAll(): void {
    if(this._packagePool.length > 0) {
      this._packages.next(this._packagePool);
    } else {
      this.http.get(this._url).map(res => {
        let packages: any = res.json().packages;
        packages.forEach(packageData => {
          // packageData.latestVersion = this.findLatestVersion(packageData);
        });
        return packages;
      })
        .catch(this.constants.handleError)
        .subscribe(packages => {
          this._packagePool = packages;
          this._packages.next(packages)
        }, error => {
          this._packages.next([{error: true, message: 'error has occured'}]);
          this.subscription.unsubscribe();
        })
    }
  }

}
