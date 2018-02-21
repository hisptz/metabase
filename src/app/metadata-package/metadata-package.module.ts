import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataPackageRoutingModule } from './metadata-package-routing.module';
import * as fromContainers from './containers';

@NgModule({
  imports: [
    CommonModule,
    MetadataPackageRoutingModule
  ],
  declarations: [...fromContainers.containers]
})
export class MetadataPackageModule { }
