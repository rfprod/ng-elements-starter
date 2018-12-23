import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  TableWidgetComponent,
  TableConfigComponent
} from './index';

/**
 * @title Table module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders
  ],
  declarations: [
    TableWidgetComponent, TableConfigComponent
  ],
  exports: [
    TableWidgetComponent, TableConfigComponent
  ],
  entryComponents: [
    TableWidgetComponent, TableConfigComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TableModule {}
