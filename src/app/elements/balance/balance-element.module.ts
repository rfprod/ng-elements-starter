import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgElementsStarterState } from 'src/app/state/ng2elements.state';

import { BalanceWidgetComponent } from './';
import { BalanceModule } from './balance.module';

/**
 * Balance element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([NgElementsStarterState]),
    NgxsFormPluginModule.forRoot(),
    BalanceModule,
  ],
  exports: [BalanceModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BalanceElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const balanceWidget = createCustomElement(BalanceWidgetComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-balance-widget', balanceWidget);
  }
}
