import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetadataPackageRoutingModule } from './metadata-package-routing.module';
import { MetadataPackageComponent } from './metadata-package.component';
import { ViewPackageComponent } from './pages/view-package/view-package.component';
import { MetadataDetailsComponent } from './pages/metadata-details/metadata-details.component';
import { ImportPackageComponent } from './pages/import-package/import-package.component';
import { PackageSummaryComponent } from './pages/view-package/components/package-summary/package-summary.component';
import {SharedModule} from "../shared/shared.module";
import { MetadataSummaryComponent } from './pages/view-package/components/metadata-summary/metadata-summary.component';
import {DataElementComponent} from "./pages/metadata-details/components/data-element/data-element.component";
import {IndicatorsComponent} from "./pages/metadata-details/components/indicators/indicators.component";
import {IndicatorTypeComponent} from "./pages/metadata-details/components/indicator-type/indicator-type.component";
import {OrgUnitComponent} from "./pages/metadata-details/components/org-unit/org-unit.component";
import {MetadataService} from "./providers/metadata.service";
import {IndicatorService} from "./providers/indicator.service";
import {IndicatorTypeService} from "./providers/indicator-type.service";
import {DataElementService} from './providers/data-element.service';
import {UserService} from './providers/user.service';
import {CategoryOptionComboService} from './providers/category-option-combo.service';
import {OrgUnitGroupService} from './providers/org-unit-group.service';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule} from '@angular/forms';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MetadataPackageRoutingModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [MetadataPackageComponent, ViewPackageComponent, MetadataDetailsComponent, ImportPackageComponent, PackageSummaryComponent, MetadataSummaryComponent, DataElementComponent,IndicatorsComponent, IndicatorTypeComponent, OrgUnitComponent, DataFilterPipe, BreadcrumbComponent],
  providers: [
    MetadataService,
    IndicatorService,
    IndicatorTypeService,
    DataElementService,
    UserService,
    CategoryOptionComboService,
    OrgUnitGroupService
  ]
})
export class MetadataPackageModule { }
