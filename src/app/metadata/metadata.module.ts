import { containers } from './containers/index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromContainers from './containers';
import { reducers, effects } from './store';

@NgModule({
  imports: [
    CommonModule,

    /**
     * Reducers
     */
    StoreModule.forFeature('metadata', reducers),

    /**
     * Effects
     */
    EffectsModule.forFeature(effects)
  ],
  declarations: [...fromContainers.containers],
  exports: [...fromContainers.containers]
})
export class MetadataModule {}
