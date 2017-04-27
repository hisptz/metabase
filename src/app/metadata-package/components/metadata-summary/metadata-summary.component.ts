import {Component, OnInit, Input} from '@angular/core';
import {MetadataService} from "../../../shared/providers/metadata.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-metadata-summary',
  templateUrl: './metadata-summary.component.html',
  styleUrls: ['./metadata-summary.component.css']
})
export class MetadataSummaryComponent implements OnInit {

  @Input() metadata: any;
  @Input() metadataUrl: string;
  loading: boolean = true;
  constructor(
    private metadataService: MetadataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loading = true;
    })
  }

  viewMetadata(metadataName) {
    this.router.navigate(['metadata-package/' + this.route.snapshot.params['version'] + '/' + this.route.snapshot.params['id'] + '/' + metadataName]);
  }


}
