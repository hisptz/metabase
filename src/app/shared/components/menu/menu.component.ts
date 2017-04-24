import {Component, OnInit, Input} from '@angular/core';
import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";

export const menuBackgroundColors = {
  green: '#467e4a',
  light_blue: '#276696',
  india: '#ea5911',
  myanmar: '#276696',
  vietnam:  '#b40303'
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() root_dir: string = '../../../';
  backgroundColor: string;
  applicationTitle: string;
  currentUserName: string;
  searchWidth: number = 30;
  constructor(
    private http:  Http
  ) { }

  ngOnInit() {
    this.http.get(this.root_dir + 'api/userSettings.json')
      .map((response: Response) => response.json())
      .catch(this.handleError)
      .subscribe(settings => {
        //get user current background style
        this.backgroundColor = menuBackgroundColors[settings['keyStyle'].split('/')[0]];
      });

    this.http.get(this.root_dir + 'api/systemSettings.json')
      .map((response: Response) => response.json())
      .catch(this.handleError)
      .subscribe(settings => {
        this.applicationTitle = settings['applicationTitle'];
      });

    this.http.get(this.root_dir + 'api/me.json')
      .map((response: Response) => response.json())
      .catch(this.handleError)
      .subscribe(profile => {
        this.currentUserName = this.getAbbreviatedName(profile.displayName);
      })
  }

  private handleError (error: Response | any) {
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

  private getAbbreviatedName(name): string {
    let abbreviatedName: any = [];
    let count: number = 0;
    for(let i=0; i<=name.length-1;i++) {
      if(i == 0) {
        abbreviatedName.push(name[i].toUpperCase());
      } else {
        if(name[i] == ' ') {
          count = i;
          abbreviatedName.push(name[count+1].toUpperCase());
        }
      }
    }

    return abbreviatedName.join("");
  }

  private widdenSearch() {
    this.searchWidth = 60;
  }

}


