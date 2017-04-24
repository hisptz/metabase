import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-metadata-details',
  templateUrl: './metadata-details.component.html',
  styleUrls: ['./metadata-details.component.css']
})
export class MetadataDetailsComponent implements OnInit {

  @Input() metadataId: string;
  @Input() metadataUrl: string;
  metadata: Array<any> = [];
  loading: boolean = true;
  constructor(
    private metadataService: MetadataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.metadataService.find(this.metadataId,this.metadataUrl).subscribe(metadata => {
        this.loading = false;
        this.metadata = this.metadataService.compileMetadata(metadata);
      })
    })
  }

}
