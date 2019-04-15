import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  BalanceWidgetComponent,
  BalanceConfigComponent,
  BalanceIndexComponent
} from './index';

import {
  CustomHttpHandlersService,
  UserService,
  BalanceService
} from '../../services/index';

/**
 * Balance module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    BalanceWidgetComponent,
    BalanceConfigComponent, BalanceIndexComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
    CustomHttpHandlersService, UserService, BalanceService
  ],
  exports: [
    BalanceWidgetComponent,
    BalanceConfigComponent, BalanceIndexComponent
  ],
  entryComponents: [
    BalanceWidgetComponent,
    BalanceConfigComponent, BalanceIndexComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BalanceModule {}
