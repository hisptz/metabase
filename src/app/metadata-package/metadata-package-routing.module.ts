import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.MetadataPackageComponent,
    children: [

    ]
  },
  {
    path: 'preview-and-import',
    component: fromContainers.MetadataPackageImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataPackageRoutingModule { }
