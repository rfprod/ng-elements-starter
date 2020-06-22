import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppPassportWidgetElementRootComponent } from './passport-widget-element-root/passport-widget-element-root.component';
import { AppPassportModule } from './passport.module';

/**
 * Passport element module
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    AppUiStoreModule.forRoot(),
    AppPassportModule,
  ],
  exports: [AppPassportModule],
  declarations: [AppPassportWidgetElementRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppPassportElementModule {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const passportWidget = createCustomElement(AppPassportWidgetElementRootComponent, {
      injector: this.injector,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
    customElements.define('app-passport-widget', passportWidget);
  }
}
