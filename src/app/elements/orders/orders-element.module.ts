import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppOrdersModule } from './orders.module';
import { AppOrdersWidgetElementRootComponent } from './orders-widget/orders-widget-element.component';

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
export class AppOrdersElementModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const ordersWidget = createCustomElement(AppOrdersWidgetElementRootComponent, {
      injector: this.injector,
    });
    customElements.define('app-orders-widget-element', ordersWidget);
  }
}
