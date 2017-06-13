import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-metadata-summary',
  templateUrl: './metadata-summary.component.html',
  styleUrls: ['./metadata-summary.component.css']
})
export class MetadataSummaryComponent implements OnInit {

  @Input() metadata: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  viewMetadata(metadataName) {
    this.router.navigate(['metadata-package/' + this.route.snapshot.params['version'] + '/' + this.route.snapshot.params['id'] + '/metadata/' + metadataName]);
  }

}
