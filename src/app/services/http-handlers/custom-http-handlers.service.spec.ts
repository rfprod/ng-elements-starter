import { TestBed, async } from '@angular/core/testing';
import { Response, ResponseOptions, Headers } from '@angular/http';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

import { CustomHttpHandlersService } from './custom-http-handlers.service';

import { DummyComponent } from '../../mocks/components/dummy.component';

describe('CustomHttpHandlersService', () => {

  let service: CustomHttpHandlersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: 'Window', useValue: window },
        UserService,
        {
          provide: CustomHttpHandlersService,
          useFactory: (userService, win) => new CustomHttpHandlersService(userService, win),
          deps: [UserService, 'Window']
        }
      ],
      schemas: []
    }).compileComponents().then(() => {
      service = TestBed.get(CustomHttpHandlersService) as CustomHttpHandlersService;
    });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.isLocalhost).toEqual(jasmine.any(Function));
    expect(service.apiBaseUrl).toEqual(jasmine.any(Function));
    expect(service.defaultHttpTimeout).toEqual(jasmine.any(Number));
    expect(service.extractObject).toEqual(jasmine.any(Function));
    expect(service.extractArray).toEqual(jasmine.any(Function));
    expect(service.extractHttpResponse).toEqual(jasmine.any(Function));
    expect(service.handleError).toEqual(jasmine.any(Function));
    expect(service.pipeRequestWithObjectResponse).toEqual(jasmine.any(Function));
    expect(service.pipeRequestWithArrayResponse).toEqual(jasmine.any(Function));
  });

  it('extractObject should return an Object', () => {
    expect(service.extractObject(new Response(new ResponseOptions({ body: {}, status: 200 })))).toEqual(jasmine.any(Object));
  });

  it('extractObject should return an empty Object if not data is present', () => {
    expect(service.extractObject(null)).toEqual(jasmine.any(Object));
  });

  it('extractArray should return an Array', () => {
    expect(service.extractArray(new Response(new ResponseOptions({ body: { data: [ {x: 'x'}, {y: 'y'} ] }, status: 200, headers: new Headers({}) })))).toEqual(jasmine.any(Array));
  });

  it('extractArray should return an empty Array if no data is present', () => {
    expect(service.extractArray(null)).toEqual(jasmine.any(Array));
  });

  it('handleError should return an Observable', () => {
    expect(service.handleError({ errors: [{ detail: 'error' }]})).toEqual(jasmine.any(Observable));
  });

  it('handleError should return an Observable', () => {
    expect(service.handleError({ errors: [{ detail: 'error' }]})).toEqual(jasmine.any(Observable));
  });

  it('handleError should handle errors properly', async () => {
    // this is returned by real backend by the moment
    await service.handleError({ _body: JSON.stringify({ code: 'errorType', message: 'errorMessage', detail: { root_erratic_item: {erratic_item: ['error msg 1', 'error msg 2']}} })}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('errorType - errorMessage: erratic_item - error msg 1, error msg 2')
    );
    await service.handleError({ _body: JSON.stringify({ code: 'errorType', message: 'errorMessage', detail: { root_erratic_item: {erratic_item: ['error msg 1', 'error msg 2']}, erratic_item2: null} })}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('errorType - errorMessage: erratic_item - error msg 1, error msg 2')
    );
    await service.handleError({ status: '400', statusText: 'error status text', _body: JSON.stringify(null)}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('400 - error status text')
    );
    await service.handleError({ _body: JSON.stringify(null)}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('Server error')
    );

    // optional error response handling
    await service.handleError({ _body: JSON.stringify({ errors: [{ code: 'err_code', detail: 'error body' }]})}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('err_code - error body')
    );
    await service.handleError({ errors: [{ code: 'err_code', detail: 'error body' }]}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('err_code - error body')
    );
    await service.handleError({ errors: [], status: '400', statusText: 'error status text' }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('400 - error status text')
    );
    await service.handleError({ _body: JSON.stringify({ code: 'errorType', message: 'general message' }) }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('errorType - general message')
    );
    await service.handleError({ code: 'errorType', message: 'general message' }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('errorType - general message')
    );
    await service.handleError({ code: 'errorType', message: 'general message', detail: {inn: ['invalidValue']} }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('errorType - general message: inn - invalidValue')
    );
    await service.handleError({ code: 'errorType', message: 'general message', detail: {inn: ['invalidValue1', 'invalidValue2']} }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('errorType - general message: inn - invalidValue1, invalidValue2')
    );
    await service.handleError({ _body: JSON.stringify({}), status: '400', statusText: 'error status text' }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('400 - error status text')
    );
    await service.handleError({ status: '400', statusText: 'error status text' }).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('400 - error status text')
    );
    await service.handleError({}).subscribe(
      () => true,
      (error: string) => expect(error).toEqual('Server error')
    );
  });

});
