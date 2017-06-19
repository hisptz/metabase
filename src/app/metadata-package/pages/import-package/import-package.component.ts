import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../../../store/application-state";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {currentMetadataSelector} from "../../../store/selectors/current-metadata.selector";
import {currentMetadataPackageSelector} from "../../../store/selectors/current-metadata-package.selector";
import {
  LoadMetadataAction, CurrentMetadataPackageChangeAction,
  AddImportedMetadataPackagesAction, CheckMetadataExistenceAction, MetadataImportAction
} from "../../../store/actions";
import * as _ from 'lodash';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-import-package',
  templateUrl: './import-package.component.html',
  styleUrls: ['./import-package.component.css']
})
export class ImportPackageComponent implements OnInit {

  loadedItems: number = 0;
  totalItems: number = 9;
  routeDetails: any;
  isPreview: boolean = true;
  importablePackage: any;
  packageId: string;
  packageVersion: string;
  currentMetadata$: Observable<any>;
  importing: boolean = false;
  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute

  ) {
    this.currentMetadata$ = this.store.select(currentMetadataSelector)
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.packageId = params['id'];
      this.packageVersion = params['version'];
      this.store.dispatch(new CurrentMetadataPackageChangeAction({id: params['id'], version: params['version']}));
      this.store.select(currentMetadataPackageSelector).subscribe(metadataPackage => {
        if(metadataPackage) {
          this.routeDetails = [
            {
              name: metadataPackage.name,
              url: '/metadata-package/' + params['version'] + '/' + params['id'] ,
              active: false
            },
            {
              name: 'Preview and Import',
              active: true
            }
          ];

          const currentMetadataPackageVersion: any = _.find(metadataPackage.versions, ['version', params['version']]);
          if(currentMetadataPackageVersion) {
            if(!currentMetadataPackageVersion.hasOwnProperty('metadata') && currentMetadataPackageVersion.hasOwnProperty('href')) {
              const metadataDetails: any = {
                packageId: metadataPackage.id,
                packageVersion: params['version'],
                metadataUrl: currentMetadataPackageVersion.href
              };
              this.store.dispatch(new LoadMetadataAction(metadataDetails));
            }
          }
        }
      });

     this.currentMetadata$.subscribe(metadataObject => {
        if(metadataObject !== null) {
          if(!metadataObject.importResult) {
            if(metadataObject.metadataItems) {
              this.store.dispatch(new CheckMetadataExistenceAction({packageId: this.packageId, metadata: metadataObject, packageVersion: this.packageVersion}))
            }
          } else {
            if(metadataObject.importResult.importCountsPerMetadata.length == 0) {
              this.totalItems = 0;
            }
          }
        }
      });

    })

  }

  completeImport() {
    this.currentMetadata$.subscribe(metadata => {
      const newMetadata = _.clone(metadata);
      newMetadata.preview = false;
      this.importing = true;
      this.store.dispatch(new MetadataImportAction({packageId: this.packageId, metadata: newMetadata, packageVersion: this.packageVersion}));
    }).unsubscribe();
  }

}
