import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@app/store';
import * as fromCore from '@app/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  metadataPackages$: Observable<fromCore.MetadataPackage[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.metadataPackages$ = store.select(fromRoot.getAllMetadataPackages);
  }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return index;
  }

  onMetadataPackageClick(metadataPackage: fromCore.MetadataPackage, e) {
    e.stopPropagation();

    const latestVersion = fromCore.getLatestVersion(metadataPackage.versions);

    /**
     * Route to the selected metadata package
     */
    this.store.dispatch(
      new fromRoot.Go({
        path: [
          `/metadata-package/${metadataPackage.id}/${latestVersion}`
        ]
      })
    );
  }

}
