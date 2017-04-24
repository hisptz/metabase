import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-indicator-type',
  templateUrl: './indicator-type.component.html',
  styleUrls: ['./indicator-type.component.css']
})
export class IndicatorTypeComponent implements OnInit {

  @Input() indicatorTypes: any;
  constructor() { }

  ngOnInit() {
    console.log(this.indicatorTypes)
  }

}
