import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BalanceWidgetComponent } from './';
import { BalanceModule } from './balance.module';

/**
 * Balance element module
 */
@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, BalanceModule],
  exports: [BalanceModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BalanceElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const balanceWidget = createCustomElement(BalanceWidgetComponent, {
      injector: this.injector,
    }) as any;
    customElements.define('app-balance-widget', balanceWidget);
  }
}
