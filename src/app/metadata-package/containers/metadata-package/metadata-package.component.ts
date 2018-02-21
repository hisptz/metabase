import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '@app/store';
import { MetadataPackage } from '@app/core';

@Component({
  selector: 'app-metadata-package',
  templateUrl: './metadata-package.component.html',
  styleUrls: ['./metadata-package.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataPackageComponent implements OnInit {

  currentMetadataPackage$: Observable<MetadataPackage>;
  currentMetadataPackageVersion$: Observable<number>;
  constructor(private store: Store<fromRoot.State>) {
    this.currentMetadataPackage$ = store.select(fromRoot.getCurrentMetadataPackage);
    this.currentMetadataPackageVersion$ = store.select(fromRoot.getCurrentMetadataPackageVersion);
  }

  ngOnInit() {
  }

}
