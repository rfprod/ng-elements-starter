import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { OrdersTableModule } from './orders-table.module';
import { OrdersTableWidgetComponent } from './';

/**
 * @title Orders table element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    OrdersTableModule
  ],
  exports: [ OrdersTableModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrdersTableElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const ordersTableWidget = <any>createCustomElement(OrdersTableWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('orders-table-widget', ordersTableWidget);
  }

}
