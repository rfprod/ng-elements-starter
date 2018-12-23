import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { BalanceModule } from './balance.module';
import { BalanceWidgetComponent } from './';

/**
 * @title Balance element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    BalanceModule
  ],
  exports: [ BalanceModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BalanceElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const balanceWidget = <any>createCustomElement(BalanceWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('balance-widget', balanceWidget);
  }

}
