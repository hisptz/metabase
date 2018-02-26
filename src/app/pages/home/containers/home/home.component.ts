import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import { PackageGroupVm } from '@app/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageDescription: string;
  packageGroups$: Observable<PackageGroupVm[]>;
  packageGroupLoading$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>) {
    this.packageGroups$ = store.select(fromRoot.getPackageGroups);
    this.packageGroupLoading$ = store.select(
      fromRoot.getPackageGroupLoadingStatus
    );
    this.pageDescription =
      'Data standards for facility systems based on recommended service delivery and programme guidelines.';
  }

  ngOnInit() {}

  viewPackageDetails(packageId: string | number) {
    this.store.dispatch(new fromRoot.SetCurrentPackageAction(packageId));
    this.store.dispatch(
      new fromRoot.Go({
        path: [`package-details/${packageId}`]
      })
    );
  }
}
