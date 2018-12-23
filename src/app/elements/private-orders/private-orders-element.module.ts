import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { PrivateOrdersModule } from './private-orders.module';
import { PrivateOrdersWidgetComponent } from './';

/**
 * @title Private orders element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    PrivateOrdersModule
  ],
  exports: [ PrivateOrdersModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrivateOrdersElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const privateOrdersWidget = <any>createCustomElement(PrivateOrdersWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('private-orders-widget', privateOrdersWidget);
  }

}
