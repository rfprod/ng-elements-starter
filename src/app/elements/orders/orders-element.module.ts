import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersWidgetComponent } from './';
import { OrdersModule } from './orders.module';

/**
 * Orders element module
 */
@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, OrdersModule],
  exports: [OrdersModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const ordersWidget = createCustomElement(OrdersWidgetComponent, {
      injector: this.injector,
    }) as any;
    customElements.define('app-orders-widget', ordersWidget);
  }
}
