import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppOrdersModule } from './orders.module';
import { AppOrdersWidgetElementRootComponent } from './orders-widget-element-root/orders-widget-element-root.component';

/**
 * Orders element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    AppUiStoreModule.forRoot(),
    AppOrdersModule,
  ],
  exports: [AppOrdersModule],
  declarations: [AppOrdersWidgetElementRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppOrdersElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const ordersWidget = createCustomElement(AppOrdersWidgetElementRootComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-orders-widget', ordersWidget);
  }
}
