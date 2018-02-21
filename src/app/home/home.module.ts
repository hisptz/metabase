import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components]
})
export class HomeModule { }
