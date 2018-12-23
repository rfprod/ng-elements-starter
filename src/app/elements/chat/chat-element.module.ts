import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { ChatModule } from './chat.module';
import { ChatWidgetComponent } from './';

/**
 * @title Chat element widget
 */
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    ChatModule
  ],
  exports: [ ChatModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ChatElementModule {

  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const chatWidget = <any>createCustomElement(ChatWidgetComponent, {
      injector: this.injector,
    });
    customElements.define('chat-widget', chatWidget);
  }

}
