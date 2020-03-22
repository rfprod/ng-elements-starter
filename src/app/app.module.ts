import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgElementsStarterState } from 'src/app/state/ng2elements.state';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { BalanceElementModule } from './elements/balance/balance-element.module';
import { CatalogueElementModule } from './elements/catalogue/catalogue-element.module';
import { OrdersElementModule } from './elements/orders/orders-element.module';
import { PassportElementModule } from './elements/passport/passport-element.module';
import { CustomMaterialModule } from './modules/material/custom-material.module';
import { AppIconsService } from './services/icons/icons.service';
import {
  AuthService,
  BalanceService,
  CatalogueService,
  CustomHttpHandlersService,
  MarkdownService,
  OrdersService,
  UserService,
} from './services/index';
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
    BalanceElementModule,
    CatalogueElementModule,
    OrdersElementModule,
    PassportElementModule,
    NgxsModule.forRoot([NgElementsStarterState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: WINDOW, useFactory: getWindow },
    MarkdownService,
    CustomHttpHandlersService,
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
