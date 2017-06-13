import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationState} from "../../../store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {currentMetadataSelector} from "../../../store/selectors/current-metadata.selector";

@Component({
  selector: 'app-metadata-details',
  templateUrl: 'metadata-details.component.html',
  styleUrls: ['metadata-details.component.css']
})
export class MetadataDetailsComponent implements OnInit {

  metadataType: string;
  metadata$: Observable<any>;
  currentMetadata: any = null;
  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>
  ) {
   this.metadata$ = store.select(currentMetadataSelector)
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.metadataType = params['metadataId'];
      this.currentMetadata = null;
    })
  }

  viewMetadataDetails(metadataId) {
    this.currentMetadata = metadataId;
  }

}
