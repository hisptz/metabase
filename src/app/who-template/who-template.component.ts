import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {metadataPackagesSelector} from '../store/selectors/metadata-packages.selector';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-who-template',
  templateUrl: './who-template.component.html',
  styleUrls: ['./who-template.component.css']
})
export class WhoTemplateComponent implements OnInit {

  metadataPackages$: Observable<any>;
  packages: any = [];
  packageTags: any[] = [];
  selectedVersion: number;
  apps: any[];
  constructor(
    private store: Store<ApplicationState>,
    private router: Router
  ) {
    this.metadataPackages$ = store.select(metadataPackagesSelector);
    this.apps = [
      {
        name: 'Metadata Repository',
        icon: 'assets/img/metadata-repository.png',
        url: '',
        downloadUrl: 'https://dhis2-appstore.s3.amazonaws.com/apps-standard/201efd36-4910-4e78-ae29-0c10768e61e6.zip'
      }, {
        name: 'Data Quality Review (DQR)',
        icon: 'assets/img/dqa.png',
        url: '',
        downloadUrl: 'https://dhis2-appstore.s3.amazonaws.com/apps-standard/1e794fdf-5a9a-4742-a415-7f0aedc4d9a6.zip'
      }
    ]
  }

  ngOnInit() {
    this.metadataPackages$.subscribe(metadataPackage => {
      if(metadataPackage.length > 0) {

        let newMetadataPackage: any = [];
        metadataPackage.forEach(packageData => {
          packageData.tags.forEach(tag => {
            newMetadataPackage.push({
              tag: tag,
              name: packageData.name,
              description: packageData.description,
              id: packageData.id,
              versions: packageData.versions
            })
          })
        });

        const sortedPackage = _.sortBy(newMetadataPackage,['tag']);
        const groupedPackage = _.groupBy(sortedPackage, 'tag');
        const tagArray = _.keys(groupedPackage);
        let newPackages = [];
        tagArray.forEach(tag => {
          groupedPackage[tag].forEach((value, index) => {
            if(index == 0) {
              value.rowSpan = groupedPackage[tag].length;
            }
            newPackages.push(value)
          })
        });

        this.packages = newPackages;
      }
    })
  }

  viewMetadataPackage(metadataPackage: any, e) {
    e.stopPropagation();
    this.router.navigate(['metadata-package/' + this.findLatestVersion(metadataPackage.versions) + '/' + metadataPackage.id]);
  }

  importMetadataPackage(metadataPackage, e) {
    e.stopPropagation();
    this.router.navigate(['metadata-package/' + this.findLatestVersion(metadataPackage.versions) + '/' + metadataPackage.id + '/import']);
  }

  findLatestVersion(versions: any[]): any {
    return versions.map(versionObject => versionObject.version).sort((a, b) => b - a)[0];
  }
}
