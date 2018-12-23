import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { PrivateOrdersTableModule } from './private-orders-table.module';
import { PrivateOrdersTableWidgetComponent } from './';

/**
 * @title Private orders table element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    PrivateOrdersTableModule
  ],
  exports: [ PrivateOrdersTableModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrivateOrdersTableElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const privateOrdersTableWidget = <any>createCustomElement(PrivateOrdersTableWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('private-orders-table-widget', privateOrdersTableWidget);
  }

}
