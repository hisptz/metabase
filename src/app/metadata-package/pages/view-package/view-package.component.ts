import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MetadataPackageService} from "../../../shared/providers/metadata-package.service";
import {MetadataSummaryComponent} from "../../components/metadata-summary/metadata-summary.component";
import {MetadataService} from "../../../shared/providers/metadata.service";

@Component({
  selector: 'app-view-package',
  templateUrl: './view-package.component.html',
  styleUrls: ['./view-package.component.css']
})
export class ViewPackageComponent implements OnInit{

  metadataPackage: any = {};
  loading: boolean = true;
  selectedVersion: number;
  routeDetails: any[] = [];
  metadata: any;
  loadingMetadata: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metadataPackageService: MetadataPackageService,
    private metadataService: MetadataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedVersion = params['version'];
      this.metadataPackageService.find(params['id']).subscribe(metadataPackage => {
        this.loading = false;
        this.metadataPackage = metadataPackage;
        this.routeDetails = [
          {
            name: this.metadataPackage.name,
            url: this.route.snapshot,
            active: true
          }
        ];

        this.metadataService.find(this.metadataPackage.id + '_' + this.selectedVersion,this.getMetadataUrl(this.metadataPackage.versions,this.selectedVersion))
          .subscribe(metadata => {
            this.loadingMetadata = false;
            this.metadata = this.metadataService.compileMetadata(metadata);
            this.router.navigate(['metadata-package/' + this.selectedVersion + '/' + this.metadataPackage.id + '/' + this.metadata.items[0]])
          })
      });
    })
  }

  getSelectedVersion(version) {
    this.selectedVersion = version;
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
