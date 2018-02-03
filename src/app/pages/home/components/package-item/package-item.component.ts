import { Component, OnInit, Input } from '@angular/core';
import { Package } from '@app/core';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent implements OnInit {
  @Input() packageItem: Package;
  constructor() {}

  ngOnInit() {}
}
