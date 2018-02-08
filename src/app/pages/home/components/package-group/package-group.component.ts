import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PackageGroup } from '@app/core';

@Component({
  selector: 'app-package-group',
  templateUrl: './package-group.component.html',
  styleUrls: ['./package-group.component.css']
})
export class PackageGroupComponent implements OnInit {
  @Input() packageGroup: PackageGroup;
  @Output()
  setCurrentPackage: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  constructor() {}

  ngOnInit() {}

  onSetCurrentPackage(e, packageId: string | number) {
    e.stopPropagation();
    this.setCurrentPackage.emit(packageId);
  }
}
