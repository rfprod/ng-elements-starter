import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppBalanceModule } from './balance.module';
import { AppBalanceWidgetElementRootComponent } from './balance-widget-element-root/balance-widget-element-root.component';

/**
 * Balance element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    AppUiStoreModule.forRoot(),
    AppBalanceModule,
  ],
  exports: [AppBalanceModule],
  declarations: [AppBalanceWidgetElementRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppBalanceElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const balanceWidget = createCustomElement(AppBalanceWidgetElementRootComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-balance-widget', balanceWidget);
  }
}
