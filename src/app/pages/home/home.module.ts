import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './containers/home/home.component';
import * as fromComponents from './components';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, ...fromComponents.components]
})
export class HomeModule {}
