import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent implements OnInit {

  @Input() packageItemData: any;
  selectedVersion: number;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  viewPackage() {
    this.router.navigate(['metadata-package/' + this.selectedVersion + '/' + this.packageItemData.id])
  }

}
