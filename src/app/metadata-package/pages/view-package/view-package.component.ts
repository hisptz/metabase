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
  packageHasError: boolean = false;
  metadataHasError: boolean = false;
  packageErrorMessage: string;
  metadataErrorMessage: string;
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
      this.loading = true;
      this.loadingMetadata = true;
      this.selectedVersion = params['version'];
      this.metadataPackageService.find(params['id']).subscribe(metadataPackage => {
        this.loading = false;
        this.metadataPackage = metadataPackage;

        /**
         * Prepare attribute for breadcrumb
         * @type {[{name; url: ActivatedRouteSnapshot; active: boolean}]}
         */
        this.routeDetails = [
          {
            name: this.metadataPackage.name,
            url: this.route.snapshot,
            active: true
          }
        ];

        this.metadataService.getByPackage(metadataPackage.id,this.selectedVersion)
          .subscribe(metadata => {
            this.loadingMetadata = false;
            this.metadata = metadata;
            this.router.navigate(['metadata-package/' + this.selectedVersion + '/' + this.metadataPackage.id + '/metadata/' + this.metadata.metadataItems[0]])
          }, error => {
            this.loadingMetadata = false;
            this.metadataHasError = true;
            this.metadataErrorMessage = error.message;
          })
      }, packageError => {
        this.loading = false;
        this.packageHasError = true;
        this.packageErrorMessage = packageError.message;

      });
    })
  }

  getSelectedVersion(version) {
    this.selectedVersion = version;
  }

  viewMetadata(metadataName) {
    this.router.navigate(['metadata-package/' + this.route.snapshot.params['version'] + '/metadata/' + this.route.snapshot.params['id'] + '/' + metadataName]);
  }

}
