import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { getWindow, WINDOW } from 'src/app/utils';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';
import { UserService } from '../user/user.service';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpController: HttpTestingController;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
          provide: OrdersService,
          useFactory: (http: HttpClient, handlers: CustomHttpHandlersService, win: Window) =>
            new OrdersService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
      ],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(OrdersService);
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

  it('should exist', () => {
    expect(service).toBeTruthy();
  });
});
