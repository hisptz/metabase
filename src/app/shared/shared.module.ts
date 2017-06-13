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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [PackageVersionSelectComponent, ReadableNamePipe, FilterPipe, NotificationComponent, ImportButtonComponent, ProgressComponent],
  providers: [HttpClientService, RepositoriesService,MetadataPackageService],
  exports: [PackageVersionSelectComponent,ReadableNamePipe, FilterPipe,NotificationComponent, ImportButtonComponent, ProgressComponent]
})
export class SharedModule { }
