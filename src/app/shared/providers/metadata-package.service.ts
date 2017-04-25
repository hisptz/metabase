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
    return this.store.select('packages', this._url, 'packages');
  }

  public find(id: any): Observable<any> {
    return this.store.selectByField('packages',{name: 'id', value: id}, this._url,'packages','array');
  }

}
