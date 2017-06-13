import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-org-unit',
  templateUrl: './org-unit.component.html',
  styleUrls: ['./org-unit.component.css']
})
export class OrgUnitComponent implements OnInit, OnChanges {

  @Input() orgUnit: any;
  currentOrgUnit: any = null;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.currentOrgUnit = this.orgUnit.originalVersion;
  }

}
