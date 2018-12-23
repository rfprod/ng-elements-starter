import { TestBed, async } from '@angular/core/testing';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';
import { UserService } from '../user/user.service';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {

  let service: OrdersService;
  let httpController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
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
      ]
    }).compileComponents().then(() => {
      httpController = TestBed.get(HttpTestingController) as HttpTestingController;
      service = TestBed.get(OrdersService) as OrdersService;
    });
  }));

  afterEach(() => {
    httpController.match((req: HttpRequest<any>): boolean => true).forEach((req: TestRequest) => req.flush({}));
    httpController.verify();
    TestBed.resetTestingModule();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

});
