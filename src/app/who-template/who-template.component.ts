import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {metadataPackagesSelector} from '../store/selectors/metadata-packages.selector';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import * as _ from 'lodash';

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
  constructor(private store: Store<ApplicationState>) {
    this.metadataPackages$ = store.select(metadataPackagesSelector);
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

}
