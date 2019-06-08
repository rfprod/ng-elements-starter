import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import {
  APP_BASE_HREF,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModuleWithProviders } from './modules/material/custom-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';

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

import { NgxsModule } from '@ngxs/store';
import { Ng2elementsState } from 'src/app/state/ng2elements.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppIconsService } from './services/icons/icons.service';

/**
 * Main application module, includes all widgets
 */
@NgModule({
  declarations: [
    AppComponent, AppIndexComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModuleWithProviders,
    BalanceElementModule,
    CatalogueElementModule,
    OrdersElementModule,
    PassportElementModule,
    NgxsModule.forRoot([
      Ng2elementsState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'Window', useValue: window },
    MarkdownService,
    CustomHttpHandlersService,
    UserService,
    AuthService,
    BalanceService,
    CatalogueService,
    OrdersService,
    AppIconsService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
