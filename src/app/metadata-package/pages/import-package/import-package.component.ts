import { Component, OnInit } from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute} from "@angular/router";
import {MetadataPackageService} from "../../../shared/providers/metadata-package.service";

@Component({
  selector: 'app-import-package',
  templateUrl: './import-package.component.html',
  styleUrls: ['./import-package.component.css']
})
export class ImportPackageComponent implements OnInit {

  progress: string = 'Loading Metadata Package';
  importSummary: any;
  summaryTitle: string;
  importCompleted: boolean = false;
  totalItems: number = 5;
  loadedItems: number = 0;
  isPreview: boolean;
  routeDetails: any[] = [];
  constructor(
    private metadataService: MetadataService,
    private metadataPackageService: MetadataPackageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.metadataPackageService.find(params['id']).subscribe(metadataPackage => {
        this.progress = 'Metadata package loaded';
        this.loadedItems++;
        let metadataId: string = params['id'] + '_' + params['version'];
        let queryParams = this.route.snapshot.queryParams;
        let preview = queryParams.hasOwnProperty('preview') ? true : false;
        this.isPreview = preview;
        this.progress = 'Fetching metadata array';
        this.loadedItems++;
        this.routeDetails = [
          {
            name: metadataPackage.name,
            url: '/metadata-package/' + params['version'] + '/' + params['id'] ,
            active: false
          },
          {
            name: preview ? 'Preview' : 'Import',
            active: true
          }
        ]
        this.metadataService.find(metadataId,this.metadataService.getMetadataUrl(metadataPackage.versions,params['version'])).subscribe(metadata => {
          this.progress = 'Metadata fetched';
          this.loadedItems++;
          this.progress = preview ? 'Previewing metadata' : 'Importing metadata';
          this.loadedItems++;
          this.metadataService.importMetadata(preview,metadata).subscribe(result => {
            this.progress = preview ? 'Metadata preview completed': 'Metadata Import completed';
            this.loadedItems++;
            //this.totalItems = 0;
            this.importCompleted = true;
            this.summaryTitle = preview ? 'Preview summary' : 'Import summary';
            this.importSummary = result;
            this.totalItems = 0;
          })

        })

      })
    })
  }

  calculateProgress(loaded,total) {
    return total == 0 ? 0 :((loaded/total)*100).toFixed(0)
  }

}
