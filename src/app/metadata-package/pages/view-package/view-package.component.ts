import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../../store/application-state";
import {CurrentMetadataPackageChangeAction, LoadMetadataAction} from "../../../store/actions";
import {Observable} from "rxjs";
import {currentMetadataPackageSelector} from "../../../store/selectors/current-metadata-package.selector";
import {currentMetadataSelector} from "../../../store/selectors/current-metadata.selector";
import {currentMetadataUrlSelector} from "../../../store/selectors/current-metadata-url.selector";
import {loadedMetadataSelector} from "../../../store/selectors/loaded-metadata.selector";
import * as _ from 'lodash';

@Component({
  selector: 'app-view-package',
  templateUrl: 'view-package.component.html',
  styleUrls: ['view-package.component.css']
})
export class ViewPackageComponent implements OnInit {

  metadataPackage$: Observable<any>;
  metadata$: Observable<any>;
  selectedVersion: number;
  routeDetails: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ApplicationState>
  ) {
    this.metadataPackage$ = store.select(currentMetadataPackageSelector);
    this.metadata$ = store.select(currentMetadataSelector);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedVersion = params['version'];
      this.store.dispatch(new CurrentMetadataPackageChangeAction({id: params['id'], version: params['version']}));

      this.metadataPackage$.subscribe((metadataPackage: any) => {
        if(metadataPackage) {

          /**
           * Prepare attribute for breadcrumb
           * @type {[{name; url: ActivatedRouteSnapshot; active: boolean}]}
           */
          this.routeDetails = [
            {
              name: metadataPackage.name,
              url: this.route.snapshot,
              active: true
            }
          ];

          const currentMetadataPackageVersion: any = _.find(metadataPackage.versions, ['version', this.selectedVersion]);
          if(currentMetadataPackageVersion) {
            if(!currentMetadataPackageVersion.hasOwnProperty('metadata') && currentMetadataPackageVersion.hasOwnProperty('href')) {
              const metadataDetails: any = {
                packageId: metadataPackage.id,
                packageVersion: this.selectedVersion,
                metadataUrl: currentMetadataPackageVersion.href
              };
              this.store.dispatch(new LoadMetadataAction(metadataDetails));
            }
          }
        }
      });

      this.metadata$.subscribe((metadata: any) => {
        if(metadata.metadataItems && metadata.metadataItems.length > 0) {
          if(!params['metadataId']) {
            this.router.navigate(['metadata-package/' + params['version'] + '/' + params['id'] + '/metadata/' + metadata.metadataItems[0]]);
          }
        }
      })
    });
  }

}
