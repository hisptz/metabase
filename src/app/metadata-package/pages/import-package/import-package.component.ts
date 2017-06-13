import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../../../store/application-state";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {currentMetadataSelector} from "../../../store/selectors/current-metadata.selector";
import {currentMetadataPackageSelector} from "../../../store/selectors/current-metadata-package.selector";
import {
  LoadMetadataAction, CurrentMetadataPackageChangeAction,
  AddImportedMetadataPackagesAction
} from "../../../store/actions";
import * as _ from 'lodash';
import {MetadataService} from "../../providers/metadata.service";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-import-package',
  templateUrl: './import-package.component.html',
  styleUrls: ['./import-package.component.css']
})
export class ImportPackageComponent implements OnInit {

  progressMessageArray: any[] = [];
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
  constructor(
    private store: Store<ApplicationState>,
    private route: ActivatedRoute,
    private router: Router,
    private metadataService: MetadataService
  ) { }

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
          ]

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

      this.getMetadataPackageWithDependencies().subscribe(metadataWithDependencies => {
        this.progress = 'Done checking dependencies';
        this.loadedItems++;
        this.progress = 'Preparing importable version for metadata';
        this.loadedItems++;
        const metadataKeys = _.keys(metadataWithDependencies);
        let importablePackage: any = {}
        metadataKeys.forEach(key => {
          importablePackage[key] = [];
          metadataWithDependencies[key].forEach(metadata => {
            importablePackage = this.updatePackageWithMetadataImportableVersion(metadata, importablePackage, key)
          })
        });

        console.log(JSON.stringify(importablePackage))
        this.progress = 'Done importable version for metadata';
        this.loadedItems++;
        this.progress = 'Previewing metadata';
        this.loadedItems++;
        this.importablePackage = importablePackage;
        this.importMetadata(true,importablePackage);
      })

    })

  }

  getMetadataPackageWithDependencies(): Observable<any> {
    return Observable.create(observer => {
      this.store.select(currentMetadataSelector).subscribe(metadataObject => {
        this.progress = 'Metadata details loaded';
        this.loadedItems++;
        this.progress = 'Checking dependencies for metadata';
        this.loadedItems++;
        let newPackage: any = {};
        if(metadataObject.metadataDetails) {
          const metadataItemsCount = metadataObject.metadataItems.length;
          let loadedMetadataItems = 0;
          metadataObject.metadataItems.forEach((metadataItemType:any) => {
            this.updateMetadataWithDependency(metadataObject.metadataDetails[metadataItemType], metadataObject, metadataItemType)
              .subscribe(metadataWithDependency => {
                loadedMetadataItems++;
                newPackage[metadataItemType] = metadataWithDependency;
                if (loadedMetadataItems === metadataItemsCount) {
                  observer.next(newPackage);
                  observer.complete();
                }
              })

          });
        }
      })
    })
  }

  updateMetadataWithDependency(metadataItemDetails, metadataObject, metadataItemType):Observable<any> {

    return Observable.create(observer => {
      const metadataDetailsCount: number = metadataItemDetails.length;
      let loadedMetadata: number = 0;
      let existenceCount: number = 0;
      let metadataWithDependencies: any[] = [];
      metadataItemDetails.forEach(metadata => {
        this.metadataService.checkFromSystem(metadataItemType.slice(0,-1),metadata.originalVersion)
          .subscribe(metadataResponse => {
            if(metadataResponse === null) {
              const dependencies = this.metadataService.getDependencies(metadata, metadataItemType);
              this.metadataService.checkDependenciesAvailability(metadataObject.metadataDetails, dependencies)
                .subscribe(checkedDependencies => {
                  loadedMetadata++;
                  const newMetadata: any = _.clone(metadata);
                  newMetadata.dependencies = checkedDependencies;
                  metadataWithDependencies.push(newMetadata);
                  if (loadedMetadata === metadataDetailsCount) {
                    observer.next(metadataWithDependencies);
                    observer.complete();
                  }
                })
            } else {
              loadedMetadata++;
              existenceCount++;
              if (loadedMetadata === metadataDetailsCount) {
                observer.next(metadataWithDependencies);
                observer.complete();
              }
            }
          });

      });
    })
  }

  updatePackageWithMetadataImportableVersion(metadata, importablePackage, metadataKey) {
    const metadataOriginalVersion = metadata.originalVersion;
    const metadataKeys = _.keys(metadataOriginalVersion);
    metadataKeys.forEach(key => {
      if(_.isPlainObject(metadataOriginalVersion[key])) {
        const correspondingDependency = _.find(metadata.dependencies, ['type', key]);
        if(correspondingDependency) {
          if(correspondingDependency.inSystem !== null && correspondingDependency.inPackage !== null) {
            const dependencyIndex = _.findIndex(importablePackage[key + 's'], correspondingDependency.inPackage);

            if(dependencyIndex !== -1) {
              importablePackage[key + 's'].splice(dependencyIndex,1);
            }
          }
          if (correspondingDependency.inSystem !== null || (correspondingDependency.inSystem === null && correspondingDependency.inPackage === null)) {
            metadataOriginalVersion[key] = correspondingDependency.inSystem;
          } else if (correspondingDependency.inSystem === null && correspondingDependency.inPackage === null) {
            delete metadataOriginalVersion[key];
          }
        }
      }
    });

    importablePackage[metadataKey].push(metadataOriginalVersion);
    return importablePackage;
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
