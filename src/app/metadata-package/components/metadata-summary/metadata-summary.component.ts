import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-metadata-summary',
  templateUrl: './metadata-summary.component.html',
  styleUrls: ['./metadata-summary.component.css']
})
export class MetadataSummaryComponent implements OnInit {

  @Input() metadataId: string;
  @Input() metadataUrl: string;
  metadata: any;
  loading: boolean = true;
  constructor(
    private metadataService: MetadataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.loading = true;
      this.metadataService.find(this.metadataId,this.metadataUrl).subscribe(meta => {
        this.loading = false;
        this.metadata = this.metadataService.compileMetadata(meta);
      })
    })
  }


}
