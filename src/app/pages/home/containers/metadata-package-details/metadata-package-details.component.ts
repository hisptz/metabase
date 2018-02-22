import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as fromRoot from '@app/store';
import { Observable } from 'rxjs/Observable';
import { MetadataComponent } from '@app/metadata';
import { MetadataPackage } from '@app/core';

@Component({
  selector: 'app-metadata-package-details',
  templateUrl: './metadata-package-details.component.html',
  styleUrls: ['./metadata-package-details.component.css']
})
export class MetadataPackageDetailsComponent implements OnInit {
  currentMetadataPackage$: Observable<MetadataPackage>;
  metadataPackageLoaded$: Observable<boolean>;
  currentMetadataPackageVersion: number;

  @ViewChild(MetadataComponent) metadata: MetadataComponent;

  constructor(private store: Store<fromRoot.State>) {
    this.currentMetadataPackage$ = store.select(
      fromRoot.getCurrentMetadataPackage
    );
    this.metadataPackageLoaded$ = store.select(
      fromRoot.getMetadataPackageLoaded
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
    this.store.select(fromRoot.getCurrentPackage).take(1).subscribe((currentPackage: any) => {
      if (!currentPackage) {
        this.store.dispatch(new fromRoot.Go({path: ['']}));
      } else {
        this.store.dispatch(new fromRoot.Go({path: [`/package-details/${currentPackage.id}`]}));
      }
    });

  }

  setCurrentVersion() {
    this.store.dispatch(
      new fromRoot.SetCurrentMetadataPackageVersionAction(
        this.currentMetadataPackageVersion
      )
    );
  }

  importMetadata(e, preview: boolean = false) {
    e.stopPropagation();

    /**
     * Trigger import operation in metadata module
     */
    if (this.metadata) {
      this.metadata.importMetadata(preview);
    }

    /**
     * Set import status for the selected metadata package
     */
    this.currentMetadataPackage$.take(1).subscribe(currentMetadataPackage => {
      this.store.dispatch(
        new fromRoot.UpdateMetadataPackageImportStatusAction({
          id: currentMetadataPackage.id,
          changes: {
            importing: !preview,
            previewing: preview,
            imported: false,
            previewed: false,
            importError: null,
            isPreview: preview
          }
        })
      );
    });
  }

  toggleImportSummary(e) {
    e.stopPropagation();

    if (this.metadata) {
      this.metadata.toggleMetadataImportSummary();
    }
  }
}
