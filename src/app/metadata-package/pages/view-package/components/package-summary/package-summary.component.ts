import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-package-summary',
  templateUrl: './package-summary.component.html',
  styleUrls: ['./package-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageSummaryComponent implements OnInit {

  @Input() metadataPackage: any;
  @Input() selectedVersion: number;
  constructor() { }

  ngOnInit() {
  }

  getSelectedVersion(version) {
    this.selectedVersion = version;
  }

}
