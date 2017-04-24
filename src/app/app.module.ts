import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app.routing.module";
import {MetadataPackageService} from "./shared/providers/metadata-package.service";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [MetadataPackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
