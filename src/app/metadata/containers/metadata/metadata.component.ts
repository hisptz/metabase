import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

import { MetadataPackageVersion } from '@app/core';
import * as fromMetadata from '../../store';
import { MetadataVm } from '../../models';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {
  @Input() id: string;
  @Input() currentVersion: number;
  @Input() versions: MetadataPackageVersion[];

  @Output()
  onMetadataImportStatusUpdate: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  currentMetadata$: Observable<MetadataVm>;
  currentMetadataItem$: Observable<any>;

  constructor(private store: Store<fromMetadata.State>) {
    this.currentMetadata$ = store.select(fromMetadata.getCurrentMetadata);
    this.currentMetadataItem$ = store.select(
      fromMetadata.getCurrentMetadataItem
    );
  }

  ngOnInit() {
    if (this.id && this.currentVersion && this.versions) {
      const currentVersionObject: MetadataPackageVersion = _.find(
        this.versions,
        ['version', this.currentVersion.toString()]
      );
      if (currentVersionObject) {
        this.store.dispatch(
          new fromMetadata.SetCurrentMetadataAction(
            this.id + '_' + this.currentVersion
          )
        );
        this.currentMetadata$.take(1).subscribe((currentMetadata: any) => {
          if (!currentMetadata) {
            this.store.dispatch(
              new fromMetadata.LoadMetadataAction({
                id: this.id + '_' + this.currentVersion,
                url: currentVersionObject.url,
                loading: true,
                loaded: false,
                importing: false,
                imported: false,
                importSummary: null,
                showImportSummary: false,
                metadataItems: {}
              })
            );
          }
        });
      }
    }
  }

  setCurrentMetadataItem(e, currentMetadataItem: string) {
    e.stopPropagation();
    this.store.dispatch(
      new fromMetadata.SetCurrentMetadataItemAction(currentMetadataItem)
    );
  }

  clearCurrentMetadataItem() {
    this.store.dispatch(new fromMetadata.ClearCurrentMetadataItemAction());
  }

  importMetadata() {
    this.currentMetadata$.take(1).subscribe((metadata: any) => {
      // TODO this is a temporary solution for importing
      const groupedItems = _.groupBy(metadata.metadataItems, 'id');
      const groupedKeys = _.keys(groupedItems);
      const metadataToImport = {};
      _.each(groupedKeys, key => {
        const groupedItem = groupedItems[key][0];
        metadataToImport[key] = groupedItem ? groupedItem.items : [];
      });

      this.store.dispatch(
        new fromMetadata.ImportMetadataAction({
          dryRun: false,
          metadata: metadataToImport,
          id: metadata.id
        })
      );
    });
  }

  toggleMetadataImportSummary() {
    this.currentMetadata$.take(1).subscribe((metadata: any) => {
      this.store.dispatch(
        new fromMetadata.ToggleMetadataImportSummaryAction({
          id: metadata.id,
          changes: {
            showImportSummary: !metadata.showImportSummary
          }
        })
      );
    });
  }
}
