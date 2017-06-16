import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../../../store/application-state";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {currentMetadataSelector} from "../../../store/selectors/current-metadata.selector";
import {currentMetadataPackageSelector} from "../../../store/selectors/current-metadata-package.selector";
import {
  LoadMetadataAction, CurrentMetadataPackageChangeAction,
  AddImportedMetadataPackagesAction, CheckMetadataExistenceAction
} from "../../../store/actions";
import * as _ from 'lodash';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {Observable} from 'rxjs/Observable';
import {currentImportablePackageSelector} from '../../../store/selectors/current-importable-package.selector';

@Component({
  selector: 'app-import-package',
  templateUrl: './import-package.component.html',
  styleUrls: ['./import-package.component.css']
})
export class ImportPackageComponent implements OnInit {

  totalItems: number = 19;
  loadedItems: number = 0;
  importCompleted: boolean = false;
  progress: string;
  importSummary: any;
  routeDetails: any;
  summaryTitle: string;
  isPreview: boolean = true;
  importablePackage: any;
  packageId: string;
  packageVersion: string;
  currentMetadata$: Observable<any>;
  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private router: Router,
    private metadataService: MetadataService
  ) {
    this.currentMetadata$ = this.store.select(currentMetadataSelector)
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.loadedItems = 0;
      this.packageId = params['id'];
      this.packageVersion = params['version'];
      this.store.dispatch(new CurrentMetadataPackageChangeAction({id: params['id'], version: params['version']}));
      this.progress = 'loading metadata details';
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
        if(!metadataObject.importResult) {
          if(metadataObject.metadataItems) {
            this.store.dispatch(new CheckMetadataExistenceAction({packageId: this.packageId, metadata: metadataObject, packageVersion: this.packageVersion}))
          }
        }
      });

    })

  }

  calculateProgress(loaded,total) {
    return total == 0 ? 0 :((loaded/total)*100).toFixed(0)
  }

  importMetadata(preview, metadata) {
    this.metadataService.importMetadata(preview, metadata).subscribe(result => {
      this.progress = preview ? 'Metadata preview completed': 'Metadata Import completed';
      this.loadedItems++;
      //this.totalItems = 0;
      this.importCompleted = true;
      this.summaryTitle = preview ? 'Preview summary' : 'Import summary';
      this.importSummary = result;
      if(!preview) {
        this.totalItems = 0;
        this.store.dispatch(new AddImportedMetadataPackagesAction(this.packageId + '_' + this.packageVersion))
      }
    })
  }

  completeImport() {
    this.importCompleted = false;
    this.isPreview = false;
    this.progress = 'Importing metadata';
    this.loadedItems++;
    this.importMetadata(false, this.importablePackage)
  }

  cancelImport() {
    this.importCompleted = false;
    this.totalItems = 0;
    this.router.navigate(['/']);
  }

}
