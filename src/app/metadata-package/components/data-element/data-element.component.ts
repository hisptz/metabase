import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-data-element',
  templateUrl: './data-element.component.html',
  styleUrls: ['./data-element.component.css']
})
export class DataElementComponent implements OnInit {

  @Input() dataElement: any = null;
  constructor() { }

  ngOnInit() {

    console.log(this.dataElement)
  }

}
