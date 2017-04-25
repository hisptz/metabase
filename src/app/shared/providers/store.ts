import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
@Injectable()
export class Store {
  private dataStore: any = {
    packages: [],
    metadata: [],
    indicators: []
  };

  constructor(private http: Http) {

  }

  /**
   *
   * @param item
   * @param url
   * @param resultKey
   * @returns {any}
   */
  public select(item:string, url: string = null, resultKey: string =  null): Observable<any> {
    return Observable.create(observer => {
      if(this.dataStore[item].length > 0) {
        observer.next(this.dataStore[item]);
        observer.complete();
      } else {
        if(url == null) {
          observer.next([]);
          observer.complete();
        } else {
          this.loadAndSave(item, url, 'array', null, resultKey).subscribe(data => {
            observer.next(data);
            observer.complete();
          }, error => {
            console.log('Error Notification');
            observer.error();
          })
        }

      }
    });
  }


  /**
   *
   * @param item
   * @param id
   * @param url
   * @param resultType
   * @returns {any}
   */
  public selectByField(item: string, field: any, url: string = null, resultKey: string = null, resultType: string = 'object'): Observable<any> {
    return Observable.create(observer => {
      let result = this.dataStore[item].filter(data => data[field.name] == field.value);
      if(result.length == 0) {
        if(url == null) {
          observer.next({});
          observer.complete();
        } else {
          if(field.name == 'id') {
            this.loadAndSave(item, url, resultType ,field.value, resultKey).subscribe((data: any) => {
              let result = resultType == 'array' ? data.filter(dataValue => dataValue[field.name] == field.value) : [data];
              observer.next(result.length > 1 ? result: result[0]);
              observer.complete();
            }, error => {
              console.log('Error Notification');
              observer.error();
            });
          } else {
            observer.next({});
            observer.complete();
          }

        }
      } else {
        observer.next(result.length > 1 ? result: result[0]);
        observer.complete();
      }
    })
  }

  public createOrUpdate(item: string, data: any): Observable<any> {
    let responseMessage: string;
    let index = this.getItemIndex(this.dataStore[item],data.id);
    if(index >= 0) {
      this.dataStore[item][index] = data;
      responseMessage = 'Item updated';
    } else {
      this.dataStore[item].push(data);
      responseMessage = 'Item created';
    }
    return Observable.of(responseMessage);
  }

  public delete(item, id): Observable<any> {
    this.dataStore[item].splice(this.getItemIndex(this.dataStore[item],id), 1);
    return Observable.of('item deleted');
  }

  /**
   *
   * @param item
   * @param id
   * @returns {number}
   */
  private getItemIndex(item: any, id: any): number {
    let index: number = -1;
    item.forEach((dataValue,dataIndex) => {
      if (dataValue.id == id) {
        index = dataIndex;
      }
    });
    return index;
  }

  /**
   *
   * @param item
   * @param url
   * @param resultType
   * @param id
   * @param resultKey
   * @returns {any}
   */
  private loadAndSave(item: string, url: string, resultType: string, id: any, resultKey: string = null): Observable<any> {
      return Observable.create(observer => {
        this.http.get(url)
          .map((res: Response) => res.json())
          .catch(error => Observable.throw( new Error(error)))
          .subscribe(response => {
            /**
             * Check if data has to be retrieved from result key and return it
             * @type {R}
             */
            let data: any = resultKey === null ? response : response[resultKey];
            /**
             * save the data to the store, saving is based on type of expected result
             */
            if(resultType == 'array') {
              this.dataStore[item] = data;
            } else {
              /**
               * Set id if not present, for easy accessibility in the future
               */
              if(!data.hasOwnProperty('id')) {
                data.id = id;
              }
              this.dataStore[item].push(data);
              console.log(this.dataStore[item])
            }

            /**
             * also return the data back to the requesting client
             */
            observer.next(data);
            observer.complete();
          }, error => {
            observer.error();
          })
      })
  }


}
