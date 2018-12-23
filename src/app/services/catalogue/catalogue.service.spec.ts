import { TestBed, async } from '@angular/core/testing';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';
import { UserService } from '../user/user.service';

import { CatalogueService } from './catalogue.service';

describe('CatalogueService', () => {

  let service: CatalogueService;
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
          provide: CatalogueService,
          useFactory: (http, handlers, win) => new CatalogueService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, 'Window']
        }
      ]
    }).compileComponents().then(() => {
      httpController = TestBed.get(HttpTestingController) as HttpTestingController;
      service = TestBed.get(CatalogueService) as CatalogueService;
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
