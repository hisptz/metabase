import { Back } from './../../../../store/actions/router.actions';
import { SetCurrentPackageAction } from './../../../../store/actions/package.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '@app/store';
import { Observable } from 'rxjs/Observable';
import * as fromCore from '@app/core';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
  currentPackage$: Observable<fromCore.PackageVm>;
  currentTab: string;
  packageTabList: Array<{ id: string; name: string }>;
  constructor(private store: Store<fromRoot.State>) {
    this.currentPackage$ = store.select(fromRoot.getCurrentPackage);
    this.currentTab = 'overview';
    this.packageTabList = [
      { id: 'overview', name: 'Overview' },
      { id: 'resources', name: 'Resources' },
      { id: 'links', name: 'Links' }
    ];
  }

  ngOnInit() {}

  closePackageItem(e) {
    e.stopPropagation();
    this.store.dispatch(new fromRoot.SetCurrentPackageAction(''));
    this.store.dispatch(new fromRoot.Go({ path: ['/'] }));
  }

  setCurrentTab(e, tabId: string) {
    e.stopPropagation();
    this.currentTab = tabId;
  }

  viewMetadataPackage(e, metadataPackage: fromCore.MetadataPackage) {
    e.stopPropagation();

    const latestVersion = fromCore.getLatestVersion(metadataPackage.versions);

    /**
     * Set current metadata package
     */
    this.store.dispatch(
      new fromRoot.SetCurrentMetadataPackageAction({
        currentMetadataPackage: metadataPackage.id,
        currentMetadataPackageVersion: latestVersion
      })
    );

    this.store.dispatch(
      new fromRoot.Go({
        path: [
          `/metadata-package-details/${metadataPackage.id}/${latestVersion}`
        ]
      })
    );
  }
}
