import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from '@app/store';
import { Observable } from 'rxjs/Observable';
import { MetadataPackage } from '@app/core';

@Component({
  selector: 'app-metadata-package-details',
  templateUrl: './metadata-package-details.component.html',
  styleUrls: ['./metadata-package-details.component.css']
})
export class MetadataPackageDetailsComponent implements OnInit {
  currentMetadataPackage$: Observable<MetadataPackage>;
  currentMetadataPackageVersion: number;
  constructor(private store: Store<fromRoot.State>) {
    this.currentMetadataPackage$ = store.select(
      fromRoot.getCurrentMetadataPackage
    );
    store
      .select(fromRoot.getCurrentMetadataPackageVersion)
      .subscribe(selectedVersion => {
        this.currentMetadataPackageVersion = selectedVersion;
      });
  }

  ngOnInit() {}

  closeMetadataPackageItem(e) {
    e.stopPropagation();
    this.store.dispatch(new fromRoot.Back());
  }

  setCurrentVersion() {
    this.store.dispatch(
      new fromRoot.SetCurrentMetadataPackageVersionAction(
        this.currentMetadataPackageVersion
      )
    );
  }
}
