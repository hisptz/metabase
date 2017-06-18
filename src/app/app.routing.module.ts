import { NgModule }     from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WhoTemplateComponent} from './who-template/who-template.component';

export const routes: Routes = [
  { path: '', component: WhoTemplateComponent},
  {path: 'metadata-package/:version/:id', loadChildren: 'app/metadata-package/metadata-package.module#MetadataPackageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true, preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
