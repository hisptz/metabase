import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromPipes from '../shared/pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [...fromComponents.components, ...fromPipes.pipes],
  exports: [...fromComponents.components, ...fromPipes.pipes]
})
export class SharedModule {}
