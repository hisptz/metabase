import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-current-metadata-item',
  templateUrl: './current-metadata-item.component.html',
  styleUrls: ['./current-metadata-item.component.css']
})
export class CurrentMetadataItemComponent implements OnInit {

  @Input() currentMetadataItem: any;
  @Output() onCloseCurrentMetadataItem: EventEmitter<any> = new EventEmitter<any>();

  currentMetadataListPage: number;
  constructor() {
    this.currentMetadataListPage = 1;
  }

  ngOnInit() {

  }

  closeCurrentMetadataItem(e) {
    e.stopPropagation();
    this.onCloseCurrentMetadataItem.emit(null);
  }

}
