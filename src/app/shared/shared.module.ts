import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dhis2MenuComponent } from './components/dhis2-menu/dhis2-menu.component';
import {Constants} from "./constants";
import { MenuComponent } from './components/menu/menu.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ReadableNamePipe } from './pipes/readable-name.pipe';
import {MetadataPackageService} from "./providers/metadata-package.service";
import {Store} from "./providers/store";
import { PackageVersionSelectComponent } from './components/package-version-select/package-version-select.component';
import {FormsModule} from "@angular/forms";
import { ImportButtonComponent } from './components/import-button/import-button.component';
import {MetadataImportService} from "./providers/metadata-import.service";
import {MetadataService} from "./providers/metadata.service";
import {MomentModule} from "angular2-moment";
import {Ng2PaginationModule} from "ng2-pagination";
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MomentModule,
    Ng2PaginationModule
  ],
  declarations: [Dhis2MenuComponent, MenuComponent, FilterPipe, ReadableNamePipe, PackageVersionSelectComponent, ImportButtonComponent, BreadcrumbComponent],
  providers: [Constants, MetadataPackageService, Store, MetadataImportService, MetadataService],
  exports: [Ng2PaginationModule,MomentModule, Dhis2MenuComponent, MenuComponent, FilterPipe, PackageVersionSelectComponent, ImportButtonComponent, ReadableNamePipe, BreadcrumbComponent]
})
export class SharedModule { }
