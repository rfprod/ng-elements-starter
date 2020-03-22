import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WINDOW, getWindow } from 'src/app/utils';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';
import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { UserService } from '../../../services/user/user.service';
import { OrdersConfigComponent } from '../orders-config/orders-config.component';
import { OrdersIndexComponent } from '../orders-index/orders-index.component';
import { OrdersWidgetComponent } from './orders-widget.component';

describe('OrdersWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: OrdersWidgetComponent;
  let fixture: ComponentFixture<OrdersWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
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
          provide: OrdersService,
          useFactory: (http, handlers, win) => new OrdersService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
      ],
      declarations: [OrdersWidgetComponent, OrdersConfigComponent, OrdersIndexComponent],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(OrdersWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        httpController
          .match((req: HttpRequest<any>): boolean => true)
          .forEach((req: TestRequest) => {
            req.flush({});
          });
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
