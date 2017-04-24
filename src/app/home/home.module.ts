import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { PackageItemComponent } from './components/package-item/package-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, PackageItemComponent]
})
export class HomeModule { }
