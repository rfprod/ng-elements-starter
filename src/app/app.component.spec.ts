import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
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
import { WINDOW, getWindow } from './utils';

describe('AppComponent', () => {
  let httpController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
          useFactory: (userService, win) => new CustomHttpHandlersService(userService, win),
          deps: [UserService, WINDOW],
        },
        {
          provide: AuthService,
          useFactory: (http, handlers, win) => new AuthService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
        {
          provide: BalanceService,
          useFactory: (http, handlers, win) => new BalanceService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
        {
          provide: CatalogueService,
          useFactory: (http, handlers, win) => new CatalogueService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
        {
          provide: OrdersService,
          useFactory: (http, handlers, win) => new OrdersService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
      ],
      declarations: [AppComponent, AppIndexComponent],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.get(HttpTestingController) as HttpTestingController;
      });
  }));

  afterEach(() => {
    httpController
      .match((req: HttpRequest<any>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "ng-elements-starter"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-elements-starter');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-elements-starter!');
  });
});
