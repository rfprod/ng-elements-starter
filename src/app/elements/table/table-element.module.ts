import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { TableModule } from './table.module';
import { TableWidgetComponent } from './';

/**
 * @title Table element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    TableModule
  ],
  exports: [ TableModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TableElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const tableWidget = <any>createCustomElement(TableWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('table-widget', tableWidget);
  }

}
