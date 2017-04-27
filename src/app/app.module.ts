import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app.routing.module";
import {MetadataPackageService} from "./shared/providers/metadata-package.service";
import { StoreModule } from  '@ngrx/store';
import {metadataPackageReducer} from "./store/metadata-package";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.provideStore({metadataPackage: metadataPackageReducer})
  ],
  providers: [MetadataPackageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
