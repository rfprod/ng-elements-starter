import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';

import { AppPassportModule } from './passport.module';
import { AppPassportWidgetElementRootComponent } from './passport-widget/passport-widget-element.component';

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
export class AppPassportElementModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap() {
    const passportWidget = createCustomElement(AppPassportWidgetElementRootComponent, {
      injector: this.injector,
    });
    customElements.define('app-passport-widget-element', passportWidget);
  }
}
