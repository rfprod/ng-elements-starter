import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppCatalogWidgetElementRootComponent } from './catalog-widget-element-root/catalog-widget-element-root.component';
import { AppCatalogModule } from './catalog.module';

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
export class AppCatalogElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const catalogWidget = createCustomElement(AppCatalogWidgetElementRootComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-catalog-widget', catalogWidget);
  }
}
