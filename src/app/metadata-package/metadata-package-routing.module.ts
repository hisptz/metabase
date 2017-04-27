import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MetadataPackageComponent} from "./metadata-package.component";
import {ViewPackageComponent} from "./pages/view-package/view-package.component";
import {ImportPackageComponent} from "./pages/import-package/import-package.component";
import {MetadataDetailsComponent} from "./pages/metadata-details/metadata-details.component";

const routes: Routes = [
  {path: '', component: MetadataPackageComponent, children: [
    {path: '', component: ViewPackageComponent, children: [
      {path: 'metadata/:metadataId', component: MetadataDetailsComponent},
    ]},
    {path: 'import', component: ImportPackageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MetadataPackageRoutingModule { }
