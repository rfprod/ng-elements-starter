import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { OrdersTableIndexComponent } from './orders-table-index.component';

import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';
import { UserService } from '../../../services/user/user.service';
import { OrdersService } from '../../../services/orders/orders.service';

describe('OrdersIndexComponent', () => {

  let httpController: HttpTestingController;
  let fixture: ComponentFixture<OrdersTableIndexComponent>;
  let component: OrdersTableIndexComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule,
        CustomMaterialModule, FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        HttpClientTestingModule
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
        }
      ],
      declarations: [
        OrdersTableIndexComponent
      ]
    })
    .compileComponents().then(() => {
      httpController = TestBed.get(HttpTestingController) as HttpTestingController;
      fixture = TestBed.createComponent(OrdersTableIndexComponent);
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
