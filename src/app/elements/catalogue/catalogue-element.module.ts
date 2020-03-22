import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogueWidgetComponent } from './';
import { CatalogueModule } from './catalogue.module';

/**
 * Catalogue element module
 */
@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CatalogueModule],
  exports: [CatalogueModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CatalogueElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const catalogueWidget = createCustomElement(CatalogueWidgetComponent, {
      injector: this.injector,
    }) as any;
    customElements.define('app-catalogue-widget', catalogueWidget);
  }
}
