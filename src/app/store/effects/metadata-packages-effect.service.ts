import { Injectable } from '@angular/core';
import {
  ErrorOccurredAction, LOAD_METADATA_PACKAGES_ACTION, MetadataPackagesLoadedAction, LOAD_METADATA_ACTION,
  MetadataLoadedAction, LOAD_IMPORTED_METADATA_PACKAGES_ACTION, ImportedMetadataPackagesLoadedAction,
  ADD_IMPORTED_METADATA_PACKAGES_ACTION, QUERY_PARAMS_CHANGE_ACTION, UpdateMetadataPackageAction,
  UPDATE_METADATA_WITH_DEPENDENCY_ACTION, CHECK_METADATA_EXISTENCE_ACTION, MetadataExistenceCheckedAction,
  MetadataWithDependencyUpdatedAction, METADATA_EXISTENCE_CHECKED_ACTION, UpdateMetadataWithDependencyAction,
  METADATA_WITH_DEPENDENCY_UPDATED_ACTION, MetadataUpdatedAction, GetMetadataImportableVersionAction,
  GET_METADATA_IMPORTABLE_VERSION_ACTION, MetadataImportPreviewAction, METADATA_IMPORT_PREVIEW_ACTION,
  MetadataImportPreviewCompletedAction, METADATA_IMPORT_PREVIEW_COMPLETED_ACTION
} from "../actions";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {Effect, Actions} from "@ngrx/effects";
import {MetadataPackageService} from "../../shared/providers/metadata-package.service";
import {MetadataService} from '../../shared/providers/metadata.service';

@Injectable()
export class MetadataPackagesEffectService {

  constructor(
    private metadataPackageService: MetadataPackageService,
    private metadataService: MetadataService,
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

  @Effect() metadataExistence$: Observable<Action> = this.actions$
    .ofType(CHECK_METADATA_EXISTENCE_ACTION)
    .switchMap(action => this.metadataService.checkMetadataExistence(action.payload))
    .map(metadata => new MetadataExistenceCheckedAction(metadata))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() metadataWithExistenceChecked$: Observable<Action> = this.actions$
    .ofType(METADATA_EXISTENCE_CHECKED_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(metadata => new UpdateMetadataWithDependencyAction(metadata));

  @Effect() metadataUpdateWithDependencies$: Observable<Action> = this.actions$
    .ofType(UPDATE_METADATA_WITH_DEPENDENCY_ACTION)
    .switchMap(action => this.metadataService.getMetadataWithDependencies(action.payload))
    .map(metadata => new MetadataWithDependencyUpdatedAction(metadata))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));


  @Effect() updatedMetadataWithDependencies$: Observable<Action> = this.actions$
    .ofType(METADATA_WITH_DEPENDENCY_UPDATED_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(metadata => new GetMetadataImportableVersionAction(metadata));

  @Effect() metadataImportableVersion$: Observable<Action> = this.actions$
    .ofType(GET_METADATA_IMPORTABLE_VERSION_ACTION)
    .switchMap(action => this.metadataService.getMetadataImportableVersion(action.payload))
    .map(metadata => new MetadataImportPreviewAction(metadata));

  @Effect() metadataPreview$: Observable<Action> = this.actions$
    .ofType(METADATA_IMPORT_PREVIEW_ACTION)
    .switchMap(action => this.metadataService.metadataImportPreview(action.payload))
    .map(metadata => new MetadataImportPreviewCompletedAction(metadata))
    .catch((error) => Observable.of(new ErrorOccurredAction(error)));

  @Effect() metadataPreviewCompleted$: Observable<Action> = this.actions$
    .ofType(METADATA_IMPORT_PREVIEW_COMPLETED_ACTION)
    .switchMap(action => Observable.of(action.payload))
    .map(metadata => new MetadataUpdatedAction(metadata));



}
