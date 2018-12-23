import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import { PrivateOrdersConfigComponent } from './private-orders-config/private-orders-config.component';
import { PrivateOrdersIndexComponent } from './private-orders-index/private-orders-index.component';
import { PrivateOrdersWidgetComponent } from './private-orders-widget/private-orders-widget.component';

import { PassportElementModule } from '../passport/passport-element.module';
import { OrdersElementModule } from '../orders/orders-element.module';

import {
  CustomHttpHandlersService,
  UserService,
  AuthService,
  OrdersService
} from '../../services/index';

/**
 * @title Private orders module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    PassportElementModule, OrdersElementModule
  ],
  declarations: [
    PrivateOrdersIndexComponent, PrivateOrdersConfigComponent, PrivateOrdersWidgetComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/ng-elements-private-orders/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'Window', useValue: window },
    CustomHttpHandlersService,
    UserService,
    AuthService,
    OrdersService
  ],
  exports: [
    PassportElementModule,
    PrivateOrdersConfigComponent, PrivateOrdersIndexComponent, PrivateOrdersWidgetComponent
  ],
  entryComponents: [
    PrivateOrdersConfigComponent, PrivateOrdersIndexComponent, PrivateOrdersWidgetComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrivateOrdersModule { }
