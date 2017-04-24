import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-org-unit',
  templateUrl: './org-unit.component.html',
  styleUrls: ['./org-unit.component.css']
})
export class OrgUnitComponent implements OnInit {

  @Input() orgUnits: Array<any>;
  constructor() { }

  ngOnInit() {

  }

}
