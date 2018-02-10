import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';
import * as fromComponents from './components';
import { PackageDetailsComponent } from './containers/package-details/package-details.component';
import { MetadataPackageDetailsComponent } from './containers/metadata-package-details/metadata-package-details.component';
import { MetadataModule } from '@app/metadata';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MetadataModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ...fromComponents.components,
    PackageDetailsComponent,
    MetadataPackageDetailsComponent
  ]
})
export class HomeModule {}
