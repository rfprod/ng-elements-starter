import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WINDOW, getWindow } from 'src/app/utils';
import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { CustomHttpHandlersService, OrdersService, UserService } from '../../services/index';
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
  ],
  declarations: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    CustomHttpHandlersService,
    UserService,
    OrdersService,
  ],
  exports: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
  entryComponents: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersModule {}
