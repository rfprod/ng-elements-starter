import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import { PrivateOrdersTableConfigComponent } from './private-orders-table-config/private-orders-table-config.component';
import { PrivateOrdersTableIndexComponent } from './private-orders-table-index/private-orders-table-index.component';
import { PrivateOrdersTableWidgetComponent } from './private-orders-table-widget/private-orders-table-widget.component';

import { PassportElementModule } from '../passport/passport-element.module';
import { OrdersTableElementModule } from '../orders-table/orders-table-element.module';

import {
  MarkdownService,
  CustomHttpHandlersService,
  UserService,
  AuthService,
  OrdersService
} from '../../services/index';

/**
 * @title Private orders table module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    PassportElementModule, OrdersTableElementModule
  ],
  declarations: [
    PrivateOrdersTableConfigComponent, PrivateOrdersTableIndexComponent, PrivateOrdersTableWidgetComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/ng-elements-private-orders-table/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'Window', useValue: window },
    MarkdownService,
    CustomHttpHandlersService,
    UserService,
    AuthService,
    OrdersService
  ],
  exports: [
    PassportElementModule,
    PrivateOrdersTableConfigComponent, PrivateOrdersTableIndexComponent, PrivateOrdersTableWidgetComponent
  ],
  entryComponents: [
    PrivateOrdersTableConfigComponent, PrivateOrdersTableIndexComponent, PrivateOrdersTableWidgetComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrivateOrdersTableModule { }
