import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { getCurrentMetadata } from './../../store/selectors/metadata.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { MetadataPackageVersion } from '@app/core';
import * as fromMetadata from '../../store';
import { MetadataVm } from './../../models';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {
  @Input() id: string;
  @Input() currentVersion: number;
  @Input() versions: MetadataPackageVersion[];
  currentMetadata$: Observable<MetadataVm>;
  constructor(private store: Store<fromMetadata.State>) {
    this.currentMetadata$ = store.select(fromMetadata.getCurrentMetadata);
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
                imported: false,
                metadataItems: {}
              })
            );
          }
        });
      }
    }
  }
}
