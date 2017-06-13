import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-indicator-type',
  templateUrl: './indicator-type.component.html',
  styleUrls: ['./indicator-type.component.css']
})
export class IndicatorTypeComponent implements OnInit, OnChanges {

  @Input() indicatorType: any;
  currentIndicatorType: any;
  constructor() { }

  ngOnChanges() {
    this.currentIndicatorType = this.indicatorType.originalVersion;
  }

  ngOnInit() {

  }

}
