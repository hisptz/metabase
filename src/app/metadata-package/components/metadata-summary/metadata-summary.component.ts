import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute, Router} from "@angular/router";


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
    private route: ActivatedRoute,
    private router: Router
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

  viewMetadata(metadataName) {
    this.router.navigate(['metadata-package/' + this.route.snapshot.params['version'] + '/' + this.route.snapshot.params['id'] + '/' + metadataName]);
  }


}
