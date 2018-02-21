import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import * as fromRoot from '@app/store';
import { MetadataPackage } from '@app/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-metadata-package-import',
  templateUrl: './metadata-package-import.component.html',
  styleUrls: ['./metadata-package-import.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataPackageImportComponent implements OnInit {

  currentMetadataPackage$: Observable<MetadataPackage>;
  currentMetadataPackageVersion$: Observable<number>;
  constructor(private store: Store<fromRoot.State>) {
    this.currentMetadataPackage$ = store.select(fromRoot.getCurrentMetadataPackage);
    this.currentMetadataPackageVersion$ = store.select(fromRoot.getCurrentMetadataPackageVersion);
  }

  ngOnInit() {
  }

}
