import { Injectable } from '@angular/core';
import {
  ErrorOccurredAction, LOAD_METADATA_PACKAGES_ACTION, MetadataPackagesLoadedAction, LOAD_METADATA_ACTION,
  MetadataLoadedAction, LOAD_IMPORTED_METADATA_PACKAGES_ACTION, ImportedMetadataPackagesLoadedAction,
  ADD_IMPORTED_METADATA_PACKAGES_ACTION, QUERY_PARAMS_CHANGE_ACTION, UpdateMetadataPackageAction
} from "../actions";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {Effect, Actions} from "@ngrx/effects";
import {MetadataPackageService} from "../../shared/providers/metadata-package.service";

@Injectable()
export class MetadataPackagesEffectService {

  constructor(
    private metadataPackageService: MetadataPackageService,
    private actions$: Actions
  ) { }

  @Effect() metadataPackages$: Observable<Action> = this.actions$
    .ofType(LOAD_METADATA_PACKAGES_ACTION)
    .switchMap(action => this.metadataPackageService.loadAll(action.payload))
    .map(metadataPackages => new MetadataPackagesLoadedAction(metadataPackages))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() metadata$: Observable<Action> = this.actions$
    .ofType(LOAD_METADATA_ACTION)
    .switchMap(action => this.metadataPackageService.loadMetadata(action.payload))
    .map(metadata => new MetadataLoadedAction(metadata))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() importedMetadataPackages$: Observable<Action> = this.actions$
    .ofType(LOAD_IMPORTED_METADATA_PACKAGES_ACTION)
    .switchMap(action => this.metadataPackageService.loadImportedMetadataPackages())
    .map(importedMetadataPackages => new ImportedMetadataPackagesLoadedAction(importedMetadataPackages))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() addImportedMetadataPackages$: Observable<Action> = this.actions$
    .ofType(ADD_IMPORTED_METADATA_PACKAGES_ACTION)
    .switchMap(action => this.metadataPackageService.addImportedMetadataPackage(action.payload))
    .map(importedMetadataPackages => new ImportedMetadataPackagesLoadedAction(importedMetadataPackages))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() queryParameterChangeAction$: Observable<Action> = this.actions$
    .ofType(QUERY_PARAMS_CHANGE_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(queryParams => new UpdateMetadataPackageAction(queryParams));


}
