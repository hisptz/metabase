import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-package-item',
  templateUrl: './metadata-package-item.component.html',
  styleUrls: ['./metadata-package-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataPackageItemComponent implements OnInit {

  @Input() metadataPackage: any;
  @Input() showTags: boolean;
  constructor() {
    this.showTags = true;
  }

  ngOnInit() {
  }

}
