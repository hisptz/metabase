import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit, OnChanges {

  @Input() indicators: any;
  @Input() metadataId: any;
  indicatorData: Array<any> = [];
  currentIndicator: any = null;
  isFixBlockOpen: boolean = false;
  fixBlockItem: string;
  constructor(
  ) { }

  ngOnChanges() {
    this.currentIndicator = this.indicators.originalVersion
  }

  ngOnInit() {

  }

  view(indicator) {
    this.currentIndicator = indicator;
  }

  close() {
    this.currentIndicator = null;
  }

  openFixBlock(item) {
    this.isFixBlockOpen = true;
    this.fixBlockItem = item;
  }

}
