import { Component, OnInit, Input } from '@angular/core';
import { PackageGroup } from '@app/core';

@Component({
  selector: 'app-package-group',
  templateUrl: './package-group.component.html',
  styleUrls: ['./package-group.component.css']
})
export class PackageGroupComponent implements OnInit {
  @Input() packageGroup: PackageGroup;
  constructor() {}

  ngOnInit() {}
}
