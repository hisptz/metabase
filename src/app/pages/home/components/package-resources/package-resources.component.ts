import { Component, Input, OnInit } from '@angular/core';
import { PackageResource } from '../../../../core/models/package-resource';

@Component({
  selector: 'app-package-resources',
  templateUrl: './package-resources.component.html',
  styleUrls: ['./package-resources.component.css']
})
export class PackageResourcesComponent implements OnInit {

  @Input() packageResources: PackageResource[];
  @Input() viewAsLink: boolean;
  constructor() {
    this.packageResources = [];
    this.viewAsLink = false;
  }

  ngOnInit() {
  }

}
