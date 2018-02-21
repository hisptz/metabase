import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataPackageRoutingModule } from './metadata-package-routing.module';
import * as fromContainers from './containers';
import { SharedModule } from '@app/shared';
import { MetadataModule } from '@app/metadata';

@NgModule({
  imports: [
    CommonModule,
    MetadataPackageRoutingModule,
    SharedModule,
    MetadataModule,
  ],
  declarations: [...fromContainers.containers]
})
export class MetadataPackageModule { }