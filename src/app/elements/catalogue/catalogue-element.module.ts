import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { CatalogueModule } from './catalogue.module';
import { CatalogueWidgetComponent } from './';

/**
 * Catalogue element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    CatalogueModule
  ],
  exports: [ CatalogueModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CatalogueElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const catalogueWidget = <any>createCustomElement(CatalogueWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('catalogue-widget', catalogueWidget);
  }

}
