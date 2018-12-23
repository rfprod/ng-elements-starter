import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { OrdersModule } from './orders.module';
import { OrdersWidgetComponent } from './';

/**
 * @title Orders element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    OrdersModule
  ],
  exports: [ OrdersModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrdersElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const ordersWidget = <any>createCustomElement(OrdersWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('orders-widget', ordersWidget);
  }

}
