import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import '../../node_modules/hammerjs/hammer.js';
import { CustomMaterialModuleWithProviders } from './modules/material/custom-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';

import { ChatElementModule } from './elements/chat/chat-element.module';
import { PassportElementModule } from './elements/passport/passport-element.module';
import { BalanceElementModule } from './elements/balance/balance-element.module';
import { CatalogueElementModule } from './elements/catalogue/catalogue-element.module';
import { OrdersElementModule } from './elements/orders/orders-element.module';

import {
  MarkdownService,
  CustomHttpHandlersService,
  UserService,
  AuthService,
  BalanceService,
  CatalogueService,
  OrdersService
} from './services/index';

/**
 * @title Main application module, includes all widgets
 */
@NgModule({
  declarations: [
    AppComponent, AppIndexComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    AppRoutingModule,
    ChatElementModule,
    PassportElementModule, BalanceElementModule, CatalogueElementModule,
    OrdersElementModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/ng-elements-all/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'Window', useValue: window },
    MarkdownService,
    CustomHttpHandlersService,
    UserService,
    AuthService,
    BalanceService,
    CatalogueService,
    OrdersService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
