import {Component, OnInit} from '@angular/core';
import {ApplicationState} from "./store/application-state";
import {Store} from "@ngrx/store";
import {LoadRepositoriesAction, LoadImportedMetadataPackagesAction} from "./store/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<ApplicationState>) {
    this.store.dispatch(new LoadRepositoriesAction());
    this.store.dispatch(new LoadImportedMetadataPackagesAction())
  }

  ngOnInit() {

  }

}
