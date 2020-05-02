import { OverlayContainer } from '@angular/cdk/overlay';
import { APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CustomMaterialModule } from 'src/app/modules';
import {
  AuthService,
  BalanceService,
  CatalogueService,
  CustomHttpHandlersService,
  MarkdownService,
  OrdersService,
  UserService,
} from 'src/app/services';
import { AppIconsService } from 'src/app/services/icons/icons.service';
import { NgElementsStarterState } from 'src/app/state/ng2elements.state';
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
    provide: UserService,
    useFactory: () => new UserService(),
  },
  {
    provide: CustomHttpHandlersService,
    useFactory: (userService: UserService, win: Window) =>
      new CustomHttpHandlersService(userService, win),
    deps: [UserService, WINDOW],
  },
  {
    provide: BalanceService,
    useFactory: (http: HttpClient, handlers: CustomHttpHandlersService, win: Window) =>
      new BalanceService(http, handlers, win),
    deps: [HttpClient, CustomHttpHandlersService, WINDOW],
  },
  {
    provide: CatalogueService,
    useFactory: (http: HttpClient, handlers: CustomHttpHandlersService, win: Window) =>
      new CatalogueService(http, handlers, win),
    deps: [HttpClient, CustomHttpHandlersService, WINDOW],
  },
  {
    provide: OrdersService,
    useFactory: (http: HttpClient, handlers: CustomHttpHandlersService, win: Window) =>
      new OrdersService(http, handlers, win),
    deps: [HttpClient, CustomHttpHandlersService, WINDOW],
  },
  {
    provide: AuthService,
    useFactory: (http: HttpClient, handlers: CustomHttpHandlersService, win: Window) =>
      new AuthService(http, handlers, win),
    deps: [HttpClient, CustomHttpHandlersService, WINDOW],
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
    NgxsModule.forRoot([NgElementsStarterState]),
    NgxsFormPluginModule.forRoot(),
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
