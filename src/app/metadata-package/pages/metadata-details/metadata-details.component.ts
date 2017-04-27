import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute} from "@angular/router";
import {MetadataPackageService} from "../../../shared/providers/metadata-package.service";

@Component({
  selector: 'app-metadata-details',
  templateUrl: 'metadata-details.component.html',
  styleUrls: ['metadata-details.component.css']
})
export class MetadataDetailsComponent implements OnInit {

  @Input() metadataId: string;
  metadata: Array<any> = [];
  metadataType: string;
  loading: boolean = true;
  constructor(
    private metadataService: MetadataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.loading = true;
      this.metadataType = param['metadataId'];
      let params = this.route.snapshot.parent.params;
      this.metadataService.getByPackage(params['id'],params['version']).subscribe(metadata => {
        this.loading = false;
        this.metadata = metadata;
        console.log(metadata)
      })
    });
  }

}
