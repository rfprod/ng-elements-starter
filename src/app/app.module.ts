import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { BalanceModule } from './elements/balance/balance.module';
import { CatalogueModule } from './elements/catalogue/catalogue.module';
import { OrdersModule } from './elements/orders/orders.module';
import { PassportModule } from './elements/passport/passport.module';
import { CustomMaterialModule } from './modules/material/custom-material.module';
import { AppIconsService } from './services/icons/icons.service';
import {
  AuthService,
  BalanceService,
  CatalogueService,
  HttpHandlersService,
  MarkdownService,
  OrdersService,
  UserService,
} from './services/index';
import { UiStoreModule } from './state/theme/ui.module';
import { WINDOW } from './utils';
import { getWindow } from './utils/providers';

/**
 * Application module, includes all widgets
 */
@NgModule({
  declarations: [AppComponent, AppIndexComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule.forRoot(),
    BalanceModule,
    CatalogueModule,
    OrdersModule,
    PassportModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    UiStoreModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: WINDOW, useFactory: getWindow },
    MarkdownService,
    HttpHandlersService,
    UserService,
    AuthService,
    BalanceService,
    CatalogueService,
    OrdersService,
    AppIconsService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
