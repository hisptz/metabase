import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {StoreModule, combineReducers} from "@ngrx/store";
import {INITIAL_APPLICATION_STATE} from "./store/application-state";
import {uiStateReducer} from "./store/reducers/ui-store-reducer";
import {storeDataReducer} from "./store/reducers/store-data-reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {storeFreeze} from "ngrx-store-freeze";
import {AppRoutingModule} from "./app.routing.module";
import {SharedModule} from "./shared/shared.module";
import {EffectsModule} from "@ngrx/effects";
import {RepositoriesEffectService} from "./store/effects/repositories-effect.service";
import {MetadataPackagesEffectService} from "./store/effects/metadata-packages-effect.service";
import { WhoTemplateComponent } from './who-template/who-template.component';
@NgModule({
  declarations: [
    AppComponent,
    WhoTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.provideStore({uiState: uiStateReducer,storeData: storeDataReducer},INITIAL_APPLICATION_STATE),
    EffectsModule.run(RepositoriesEffectService),
    EffectsModule.run(MetadataPackagesEffectService),
    // StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
