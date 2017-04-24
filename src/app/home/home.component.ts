import { Component, OnInit } from '@angular/core';
import {MetadataPackageService} from "../shared/providers/metadata-package.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean = true;
  packages: Array<any>;
  constructor(private packageService: MetadataPackageService) { }

  ngOnInit() {
    this.packageService.all()
      .subscribe(packages => {
        this.packages = packages;
        this.loading = false;
      });
    // this.packageService.loadAll();
  }


}
