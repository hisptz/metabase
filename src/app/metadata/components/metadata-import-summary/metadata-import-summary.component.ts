import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-metadata-import-summary',
  templateUrl: './metadata-import-summary.component.html',
  styleUrls: ['./metadata-import-summary.component.css']
})
export class MetadataImportSummaryComponent implements OnInit {

  @Input() importSummary: any;
  @Output() onImportSummaryClose: EventEmitter<any> = new EventEmitter<any>();
  importListPage: number;

  constructor() {
    this.importListPage = 1;
  }

  ngOnInit() {
  }

  closeMetadataImportSummary(e) {
    e.stopPropagation();
    this.onImportSummaryClose.emit(null);
  }

}
