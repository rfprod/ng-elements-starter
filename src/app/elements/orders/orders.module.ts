import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  OrdersWidgetComponent,
  OrdersConfigComponent,
  OrdersIndexComponent
} from './index';

import {
  CustomHttpHandlersService,
  UserService,
  OrdersService
} from '../../services/index';

/**
 * Orders module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    OrdersWidgetComponent,
    OrdersConfigComponent, OrdersIndexComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
    CustomHttpHandlersService, UserService, OrdersService
  ],
  exports: [
    OrdersWidgetComponent,
    OrdersConfigComponent, OrdersIndexComponent
  ],
  entryComponents: [
    OrdersWidgetComponent,
    OrdersConfigComponent, OrdersIndexComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrdersModule {}
