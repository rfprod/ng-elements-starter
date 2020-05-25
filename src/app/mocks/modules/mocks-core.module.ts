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
import { CustomMaterialModule } from 'src/app/modules';
import {
  AuthService,
  BalanceService,
  CatalogService,
  HttpHandlersService,
  MarkdownService,
  OrdersService,
  UserService,
} from 'src/app/services';
import { AppIconsService } from 'src/app/services/icons/icons.service';
import { UiStoreModule } from 'src/app/state/theme/ui.module';
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
      getContainerElement: () => {
        return {
          classList: {
            add: (): void => null,
            remove: (): void => null,
          },
        };
      },
    },
  },
  {
    provide: MatSnackBar,
    useValue: {
      open: (): void => null,
    },
  },
  {
    provide: UserService,
    useFactory: () => new UserService(),
  },
  {
    provide: HttpHandlersService,
    useFactory: (userService: UserService, snackBar: MatSnackBar, win: Window) =>
      new HttpHandlersService(userService, snackBar, win),
    deps: [UserService, MatSnackBar, WINDOW],
  },
  {
    provide: BalanceService,
    useFactory: (http: HttpClient, handlers: HttpHandlersService, win: Window) =>
      new BalanceService(http, handlers, win),
    deps: [HttpClient, HttpHandlersService, WINDOW],
  },
  {
    provide: CatalogService,
    useFactory: (http: HttpClient, handlers: HttpHandlersService, win: Window) =>
      new CatalogService(http, handlers, win),
    deps: [HttpClient, HttpHandlersService, WINDOW],
  },
  {
    provide: OrdersService,
    useFactory: (http: HttpClient, handlers: HttpHandlersService, win: Window) =>
      new OrdersService(http, handlers, win),
    deps: [HttpClient, HttpHandlersService, WINDOW],
  },
  {
    provide: AuthService,
    useFactory: (http: HttpClient, handlers: HttpHandlersService, win: Window) =>
      new AuthService(http, handlers, win),
    deps: [HttpClient, HttpHandlersService, WINDOW],
  },
  {
    provide: MarkdownService,
    useFactory: () => new MarkdownService(),
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
    CustomMaterialModule.forRoot(),
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    UiStoreModule.forRoot(),
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
    CustomMaterialModule,
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
