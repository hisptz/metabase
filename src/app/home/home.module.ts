import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FormsModule} from "@angular/forms";
import { RepositoriesSectionComponent } from './components/repositories-section/repositories-section.component';
import { PackageItemComponent } from './components/package-item/package-item.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, RepositoriesSectionComponent, PackageItemComponent]
})
export class HomeModule { }
