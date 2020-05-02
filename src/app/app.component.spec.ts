import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { BalanceModule } from './elements/balance/balance.module';
import { CatalogueModule } from './elements/catalogue/catalogue.module';
import { OrdersModule } from './elements/orders/orders.module';
import { PassportModule } from './elements/passport/passport.module';
import { CustomMaterialModule } from './modules/material/custom-material.module';
import { AuthService } from './services/auth/auth.service';
import { BalanceService } from './services/balance/balance.service';
import { CatalogueService } from './services/catalogue/catalogue.service';
import { CustomHttpHandlersService } from './services/http-handlers/custom-http-handlers.service';
import { OrdersService } from './services/orders/orders.service';
import { UserService } from './services/user/user.service';
import { getWindow, WINDOW } from './utils';

describe('AppComponent', () => {
  let httpController: HttpTestingController;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        PassportModule,
        BalanceModule,
        CatalogueModule,
        OrdersModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: WINDOW, useFactory: getWindow },
        UserService,
        {
          provide: CustomHttpHandlersService,
          useFactory: (userService: UserService, win: Window) =>
            new CustomHttpHandlersService(userService, win),
          deps: [UserService, WINDOW],
        },
        {
          provide: AuthService,
          useFactory: (http: HttpClient, handlers: CustomHttpHandlersService, win: Window) =>
            new AuthService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
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
      ],
      declarations: [AppComponent, AppIndexComponent],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
      });
  }));

  afterEach(() => {
    httpController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "ng-elements-starter"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-elements-starter');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-elements-starter!');
  });
});
