import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgElementsStarterState } from 'src/app/state/ng2elements.state';

import { OrdersWidgetComponent } from './';
import { OrdersModule } from './orders.module';

/**
 * Orders element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([NgElementsStarterState]),
    NgxsFormPluginModule.forRoot(),
    OrdersModule,
  ],
  exports: [OrdersModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const ordersWidget = createCustomElement(OrdersWidgetComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-orders-widget', ordersWidget);
  }
}
