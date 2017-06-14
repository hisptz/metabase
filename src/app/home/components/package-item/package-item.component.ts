import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent implements OnInit {

  @Input() metadataPackage: any;
  selectedVersion: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewPackage() {

  }

  navigate(pageHref, event,queryItem?) {
    if(!queryItem) {
      this.router.navigate([pageHref])
    } else {
      this.router.navigate([pageHref], {queryParams: queryItem});
    }
    event.stopPropagation();
  }

}
