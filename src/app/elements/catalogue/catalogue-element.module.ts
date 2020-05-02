import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgElementsStarterState } from 'src/app/state/ng2elements.state';

import { CatalogueWidgetComponent } from './';
import { CatalogueModule } from './catalogue.module';

/**
 * Catalogue element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([NgElementsStarterState]),
    NgxsFormPluginModule.forRoot(),
    CatalogueModule,
  ],
  exports: [CatalogueModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CatalogueElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const catalogueWidget = createCustomElement(CatalogueWidgetComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-catalogue-widget', catalogueWidget);
  }
}
