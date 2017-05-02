import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MetadataPackageService} from "../../../shared/providers/metadata-package.service";

@Component({
  selector: 'app-metadata-details',
  templateUrl: 'metadata-details.component.html',
  styleUrls: ['metadata-details.component.css']
})
export class MetadataDetailsComponent implements OnInit {

  @Input() metadataId: string;
  metadata: any;
  metadataType: string;
  currentMetadata: any = null;
  loading: boolean = true;
  constructor(
    private metadataService: MetadataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.loading = true;
      this.currentMetadata = null;
      this.metadataType = param['metadataId'];
      let params = this.route.snapshot.parent.params;
      this.metadataService.getByPackage(params['id'],params['version']).subscribe(metadata => {
        this.loading = false;
        this.metadata = metadata;
        /**
         * check availability
         */
        this.metadata.metadataDetails[this.metadataType].forEach(metadataItem => {
          if(!metadataItem.hasOwnProperty('available')) {
            this.metadataService.checkFromSystem(this.metadataType, metadataItem).subscribe(result => {
              metadataItem = result;
              console.log(metadata.metadataDetails);
            })
          }
        });
      })
    });
  }

  viewMetadataDetails(metadataId) {
    this.currentMetadata = metadataId;
  }

}
