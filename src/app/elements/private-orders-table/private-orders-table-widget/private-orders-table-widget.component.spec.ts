import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { PassportModule } from '../../passport/passport.module';
import { OrdersTableModule } from '../../orders-table/orders-table.module';

import { PrivateOrdersTableConfigComponent } from '../private-orders-table-config/private-orders-table-config.component';
import { PrivateOrdersTableIndexComponent } from '../private-orders-table-index/private-orders-table-index.component';
import { PrivateOrdersTableWidgetComponent } from './private-orders-table-widget.component';

import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';

describe('PrivateOrdersTableWidgetComponent', () => {

  let httpController: HttpTestingController;
  let component: PrivateOrdersTableWidgetComponent;
  let fixture: ComponentFixture<PrivateOrdersTableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule,
        CustomMaterialModule, FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        HttpClientTestingModule,
        PassportModule, OrdersTableModule
      ],
      providers: [
        { provide: 'Window', useValue: window },
        UserService,
        {
          provide: CustomHttpHandlersService,
          useFactory: (userService, win) => new CustomHttpHandlersService(userService, win),
          deps: [UserService, 'Window']
        },
        {
          provide: OrdersService,
          useFactory: (http, handlers, win) => new OrdersService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, 'Window']
        },
        {
          provide: AuthService,
          useFactory: (http, handlers, win) => new AuthService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, 'Window']
        }
      ],
      declarations: [
        PrivateOrdersTableConfigComponent,
        PrivateOrdersTableWidgetComponent,
        PrivateOrdersTableIndexComponent
      ]
    })
    .compileComponents().then(() => {
      httpController = TestBed.get(HttpTestingController);
      fixture = TestBed.createComponent(PrivateOrdersTableWidgetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      httpController.match((req: HttpRequest<any>): boolean => true).forEach((req: TestRequest) => req.flush({}));
    });
  }));

  afterEach(() => {
		httpController.match((req: HttpRequest<any>): boolean => true).forEach((req: TestRequest) => req.flush({}));
		httpController.verify();
		TestBed.resetTestingModule();
	});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
