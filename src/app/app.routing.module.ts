import { NgModule }     from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule'},
  {path: 'metadata-package/:version/:id', loadChildren: 'app/metadata-package/metadata-package.module#MetadataPackageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true, preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
