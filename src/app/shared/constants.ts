import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class Constants {

  root_dir: string = '../../../';
  constructor(private http: Http) {

  }
  load() {
    return this.http.get("assets/manifest.webapp")
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
