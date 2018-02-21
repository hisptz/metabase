import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-package-search',
  templateUrl: './metadata-package-search.component.html',
  styleUrls: ['./metadata-package-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataPackageSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
