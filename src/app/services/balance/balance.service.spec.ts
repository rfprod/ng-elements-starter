import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { WINDOW, getWindow } from 'src/app/utils';
import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';
import { UserService } from '../user/user.service';
import { BalanceService } from './balance.service';

describe('BalanceService', () => {
  let service: BalanceService;
  let httpController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: WINDOW, useFactory: getWindow },
        UserService,
        {
          provide: CustomHttpHandlersService,
          useFactory: (userService, win) => new CustomHttpHandlersService(userService, win),
          deps: [UserService, WINDOW],
        },
        {
          provide: BalanceService,
          useFactory: (http, handlers, win) => new BalanceService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
      ],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.get(HttpTestingController) as HttpTestingController;
        service = TestBed.get(BalanceService) as BalanceService;
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

  it('should exist', () => {
    expect(service).toBeTruthy();
  });
});
