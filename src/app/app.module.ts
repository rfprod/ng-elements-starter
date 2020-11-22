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
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { AppBalanceModule } from './elements/balance/balance.module';
import { AppCatalogModule } from './elements/catalog/catalog.module';
import { AppOrdersModule } from './elements/orders/orders.module';
import { AppPassportModule } from './elements/passport/passport.module';
import { AppMaterialModule } from './modules/material/custom-material.module';
import { AppIconsService } from './services/icons/icons.service';
import { AppUiStoreModule } from './state/theme/ui.module';
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
    AppMaterialModule.forRoot(),
    AppBalanceModule,
    AppCatalogModule,
    AppOrdersModule,
    AppPassportModule,
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AppUiStoreModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: WINDOW, useFactory: getWindow },
    AppIconsService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
