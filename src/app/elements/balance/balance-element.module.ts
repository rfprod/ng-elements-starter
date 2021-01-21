import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppBalanceModule } from './balance.module';
import { AppBalanceWidgetElementRootComponent } from './balance-widget/balance-widget-element.component';

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
export class AppBalanceElementModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const balanceWidget = createCustomElement(AppBalanceWidgetElementRootComponent, {
      injector: this.injector,
    });
    customElements.define('app-balance-widget-element', balanceWidget);
  }
}
