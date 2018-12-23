import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  CatalogueWidgetComponent,
  CatalogueConfigComponent,
  CatalogueIndexComponent
} from './index';

import {
  CustomHttpHandlersService,
  UserService,
  CatalogueService
} from '../../services/index';

/**
 * @title Catalogue module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CatalogueWidgetComponent,
    CatalogueConfigComponent, CatalogueIndexComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
    CustomHttpHandlersService, UserService, CatalogueService
  ],
  exports: [
    CatalogueWidgetComponent,
    CatalogueConfigComponent, CatalogueIndexComponent
  ],
  entryComponents: [
    CatalogueWidgetComponent,
    CatalogueConfigComponent, CatalogueIndexComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CatalogueModule {}
