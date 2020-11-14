import { OverlayContainer } from '@angular/cdk/overlay';
import { APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppMaterialModule } from 'src/app/modules';
import {
  AppAuthService,
  AppBalanceService,
  AppCatalogService,
  AppHttpHandlersService,
  AppMarkdownService,
  AppOrdersService,
  AppUserService,
} from 'src/app/services';
import { AppIconsService } from 'src/app/services/icons/icons.service';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';
import { getWindow, WINDOW } from 'src/app/utils';

import { DummyComponent } from '../components/dummy.component';

/**
 * Mocks core module providers.
 */
export const mocksCoreModuleProviders: Provider[] = [
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: LocationStrategy, useClass: PathLocationStrategy },
  { provide: WINDOW, useFactory: getWindow },
  {
    provide: OverlayContainer,
    useValue: {
      getContainerElement: () => ({
        classList: {
          add: (): null => null,
          remove: (): null => null,
        },
      }),
    },
  },
  {
    provide: MatSnackBar,
    useValue: {
      open: (): null => null,
    },
  },
  {
    provide: AppUserService,
    useFactory: () => new AppUserService(),
  },
  {
    provide: AppHttpHandlersService,
    useFactory: (userService: AppUserService, snackBar: MatSnackBar, win: Window) =>
      new AppHttpHandlersService(userService, snackBar, win),
    deps: [AppUserService, MatSnackBar, WINDOW],
  },
  {
    provide: AppBalanceService,
    useFactory: (http: HttpClient, handlers: AppHttpHandlersService, win: Window) =>
      new AppBalanceService(http, handlers, win),
    deps: [HttpClient, AppHttpHandlersService, WINDOW],
  },
  {
    provide: AppCatalogService,
    useFactory: (http: HttpClient, handlers: AppHttpHandlersService, win: Window) =>
      new AppCatalogService(http, handlers, win),
    deps: [HttpClient, AppHttpHandlersService, WINDOW],
  },
  {
    provide: AppOrdersService,
    useFactory: (http: HttpClient, handlers: AppHttpHandlersService, win: Window) =>
      new AppOrdersService(http, handlers, win),
    deps: [HttpClient, AppHttpHandlersService, WINDOW],
  },
  {
    provide: AppAuthService,
    useFactory: (http: HttpClient, handlers: AppHttpHandlersService, win: Window) =>
      new AppAuthService(http, handlers, win),
    deps: [HttpClient, AppHttpHandlersService, WINDOW],
  },
  {
    provide: AppMarkdownService,
    useFactory: () => new AppMarkdownService(),
  },
  {
    provide: AppIconsService,
    useFactory: (registry: MatIconRegistry, sanitizer: DomSanitizer) =>
      new AppIconsService(registry, sanitizer),
    deps: [MatIconRegistry, DomSanitizer],
  },
  DatePipe,
];

/**
 * Mocks Core module.
 */
@NgModule({
  imports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule.forRoot(),
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AppUiStoreModule.forRoot(),
  ],
  declarations: [DummyComponent],
  exports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    NgxsModule,
    NgxsFormPluginModule,
    DummyComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MocksCoreModule {
  public static forRoot(): ModuleWithProviders<MocksCoreModule> {
    return {
      ngModule: MocksCoreModule,
      providers: [...mocksCoreModuleProviders],
    };
  }
}
