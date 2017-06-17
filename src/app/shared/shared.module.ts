import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientService} from "./providers/http-client.service";
import {RepositoriesService} from "./providers/repositories.service";
import { PackageVersionSelectComponent } from './components/package-version-select/package-version-select.component';
import {FormsModule} from "@angular/forms";
import {MetadataPackageService} from "./providers/metadata-package.service";
import {FilterPipe} from "./pipes/filter.pipe";
import {ReadableNamePipe} from "./pipes/readable-name.pipe";
import { NotificationComponent } from './components/notification/notification.component';
import { ImportButtonComponent } from './components/import-button/import-button.component';
import {RouterModule} from "@angular/router";
import {ProgressComponent} from './components/progress/progress.component';
import {MetadataService} from './providers/metadata.service';
import {IndicatorService} from './providers/indicator.service';
import {DataElementService} from './providers/data-element.service';
import {IndicatorTypeService} from './providers/indicator-type.service';
import {CategoryOptionComboService} from './providers/category-option-combo.service';
import {UserService} from './providers/user.service';
import {OrgUnitGroupService} from './providers/org-unit-group.service';
import {OrganisationunitService} from './providers/organisationunit.service';
import {UtilitiesService} from './providers/utilities.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [PackageVersionSelectComponent, ReadableNamePipe, FilterPipe, NotificationComponent, ImportButtonComponent, ProgressComponent],
  providers: [
    HttpClientService,
    RepositoriesService,
    MetadataPackageService,
    MetadataService,
    IndicatorService,
    IndicatorTypeService,
    DataElementService,
    UserService,
    CategoryOptionComboService,
    OrgUnitGroupService,
    OrganisationunitService,
    UtilitiesService
  ],
  exports: [PackageVersionSelectComponent,ReadableNamePipe, FilterPipe,NotificationComponent, ImportButtonComponent, ProgressComponent]
})
export class SharedModule { }
