import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {metadataPackagesSelector} from "../store/selectors/metadata-packages.selector";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  metadataPackages$: Observable<any>;
  showRepositorySection: boolean = false;
  showForm: boolean = false;
  packageName: string;
  constructor(private store: Store<ApplicationState>) {
    this.metadataPackages$ = store.select(metadataPackagesSelector);
  }

  ngOnInit() {

  }

}
