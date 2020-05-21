import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { UiStoreModule } from 'src/app/state/theme/ui.module';

import { PassportWidgetComponent } from './';
import { PassportModule } from './passport.module';

/**
 * Passport element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    UiStoreModule.forRoot(),
    PassportModule,
  ],
  exports: [PassportModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PassportElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const passportWidget = createCustomElement(PassportWidgetComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-passport-widget', passportWidget);
  }
}
