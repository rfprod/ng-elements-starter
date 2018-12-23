import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  OrdersTableWidgetComponent,
  OrdersTableConfigComponent,
  OrdersTableIndexComponent
} from './index';

import {
  CustomHttpHandlersService,
  UserService,
  OrdersService
} from '../../services/index';

/**
 * @title Orders table module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    OrdersTableWidgetComponent,
    OrdersTableConfigComponent, OrdersTableIndexComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
    CustomHttpHandlersService, UserService, OrdersService
  ],
  exports: [
    OrdersTableWidgetComponent,
    OrdersTableConfigComponent, OrdersTableIndexComponent
  ],
  entryComponents: [
    OrdersTableWidgetComponent,
    OrdersTableConfigComponent, OrdersTableIndexComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrdersTableModule {}
