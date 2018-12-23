import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { PassportModule } from './passport.module';
import { PassportWidgetComponent } from './';

/**
 * @title Passport element module
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    PassportModule
  ],
  exports: [ PassportModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PassportElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const passportWidget = <any>createCustomElement(PassportWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('passport-widget', passportWidget);
  }

}
