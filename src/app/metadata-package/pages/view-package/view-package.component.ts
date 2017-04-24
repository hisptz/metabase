import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MetadataPackageService} from "../../../shared/providers/metadata-package.service";
import {MetadataSummaryComponent} from "../../components/metadata-summary/metadata-summary.component";

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
  constructor(
    private route: ActivatedRoute,
    private metadataPackageService: MetadataPackageService
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
        ]
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
