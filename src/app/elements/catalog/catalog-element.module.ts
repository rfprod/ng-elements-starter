import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppCatalogModule } from './catalog.module';
import { AppCatalogWidgetElementRootComponent } from './catalog-widget/catalog-widget-element.component';

/**
 * Catalog element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    AppUiStoreModule.forRoot(),
    AppCatalogModule,
  ],
  exports: [AppCatalogModule],
  declarations: [AppCatalogWidgetElementRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppCatalogElementModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const catalogWidget = createCustomElement(AppCatalogWidgetElementRootComponent, {
      injector: this.injector,
    });
    customElements.define('app-catalog-widget-element', catalogWidget);
  }
}
