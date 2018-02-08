import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import { PackageGroupVm } from '@app/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageDescription: string;
  packageGroups$: Observable<PackageGroupVm[]>;
  packageGroupLoading$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.packageGroups$ = store.select(fromRoot.getPackageGroups);
    this.packageGroupLoading$ = store.select(
      fromRoot.getPackageGroupLoadingStatus
    );
    this.pageDescription =
      'Download data quality tools, metadata for health' +
      ' systems and disease-specific modules based on WHO recommendations. The ' +
      'modules include standard forms, validations, indicators, best practice analysis and dashboards.';
  }

  ngOnInit() {}

  viewPackageDetails(packageId: string | number) {
    this.store.dispatch(new fromRoot.SetCurrentPackageAction(packageId));
    this.router.navigate([`package-details/${packageId}`]);
  }
}
