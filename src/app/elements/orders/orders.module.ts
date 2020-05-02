import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { getWindow, WINDOW } from 'src/app/utils';

import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { HttpHandlersService, OrdersService, UserService } from '../../services/index';
import { OrdersConfigComponent, OrdersIndexComponent, OrdersWidgetComponent } from './index';

/**
 * Orders module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomMaterialModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule,
    NgxsFormPluginModule,
  ],
  declarations: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    HttpHandlersService,
    UserService,
    OrdersService,
  ],
  exports: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
  entryComponents: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersModule {}
