import {Component, OnInit, Input} from '@angular/core';
import {ApplicationState} from "../../../store/application-state";
import {Store} from "@ngrx/store";
import {importedMetadataPackagesSelector} from "../../../store/selectors/imported-metadata-packages.selector";
import * as _ from 'lodash';

@Component({
  selector: 'app-import-button',
  templateUrl: './import-button.component.html',
  styleUrls: ['./import-button.component.css']
})
export class ImportButtonComponent implements OnInit {

  @Input() selectedVersion: number;
  @Input() metadataPackageId: string;
  @Input() versions: any;
  loading: boolean = true;
  imported: boolean;
  toUpdate: boolean;
  latestVersion: number;
  constructor(private store: Store<ApplicationState>) {

  }

  ngOnInit() {
    this.store.select(importedMetadataPackagesSelector).subscribe((importedMetadataPackages: any[]) => {
      if(this.metadataPackageId && this.selectedVersion && importedMetadataPackages) {
        this.loading = false;
        const importedPackage: any = importedMetadataPackages.filter(metadataPackage => { return metadataPackage === this.metadataPackageId + '_' + this.selectedVersion});
        if(importedPackage.length > 0) {
          this.imported = true;
          if(this.versions) {
            this.latestVersion = this.findLatestVersion(this.versions);
            if(this.latestVersion > this.selectedVersion) {
              this.toUpdate = true;
            }
          }
        }
      }
    })
  }

  findLatestVersion(versions: any[]): any {
    let versionArray = [];
    if(versions.length > 0) {
      versions.forEach(version => {
        versionArray.push(version.version);
      });

      versionArray = versionArray.sort((a, b) => b - a);
    }
    return versionArray[0];
  }

}
