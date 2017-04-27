import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-indicator-type',
  templateUrl: './indicator-type.component.html',
  styleUrls: ['./indicator-type.component.css']
})
export class IndicatorTypeComponent implements OnInit, OnChanges {

  @Input() indicatorType: any;
  originalIndicatorType: any;
  constructor() { }

  ngOnChanges() {
    this.originalIndicatorType = this.indicatorType.originalVersion;
    console.log(this.indicatorType)
  }

  ngOnInit() {
    this.originalIndicatorType = this.indicatorType.originalVersion;

  }

}
