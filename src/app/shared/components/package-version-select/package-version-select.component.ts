import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-package-version-select',
  templateUrl: './package-version-select.component.html',
  styleUrls: ['./package-version-select.component.css']
})
export class PackageVersionSelectComponent implements OnInit {

  @Input() versions: any = [];
  @Input() selectedVersion: number;

  @Output() onVersionSelect: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    if(this.selectedVersion == undefined) {
      this.selectedVersion = this.findLatestVersion(this.versions ? this.versions : []);
    }
    this.onVersionSelect.emit(this.selectedVersion);
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

  getVersion() {
    this.onVersionSelect.emit(this.selectedVersion);
  }

}
