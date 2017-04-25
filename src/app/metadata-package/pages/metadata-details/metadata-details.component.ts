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
  loading: boolean = true;
  constructor(
    private metadataService: MetadataService,
    private metadataPackageService: MetadataPackageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.loading = true;
      let params = this.route.snapshot.parent.params;
      this.metadataPackageService.find(params['id']).subscribe(metadataPackage => {
        this.metadataService.find(metadataPackage.id + '_' + params['version'],this.getMetadataUrl(metadataPackage.versions,params['version'])).subscribe(metadata => {
          this.loading = false;
          this.metadata = this.metadataService.compileMetadata(metadata);
        })
      })
    });
  }

  getMetadataUrl(versions: Array<any>, selectedVersion: number) {
    let url: string = "";
    for(let ver of versions) {
      if(ver.version == selectedVersion) {
        url = ver.href;
        break;
      }
    }
    return url;
  }

}
