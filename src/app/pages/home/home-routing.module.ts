import { MetadataPackageDetailsComponent } from './containers/metadata-package-details/metadata-package-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { PackageDetailsComponent } from './containers/package-details/package-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'package-details/:id',
        component: PackageDetailsComponent
      },
      {
        path: 'metadata-package-details/:id/:version',
        component: MetadataPackageDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
