import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {metadataPackagesSelector} from "../store/selectors/metadata-packages.selector";
import {ActivatedRoute, Router} from '@angular/router';
import {QueryParamsChangeAction} from '../store/actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  metadataPackages$: Observable<any>;
  showRepositorySection: boolean = false;
  showForm: boolean = false;
  searchText: string;
  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.metadataPackages$ = store.select(metadataPackagesSelector);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.store.dispatch(new QueryParamsChangeAction(params))
    })
  }

  search(text) {
    this.router.navigate(['/'], { queryParams: { q: text } })
  }

}
